import React, { useState } from 'react'
import NavBar from '../layout/NavBar'
import { useNavigate } from 'react-router-dom'

const NovoAdmin = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const [error, setError] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:8080/user/adminRegister", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password
        }),
      });

      if (response.ok) {
        await response.json();
        navigate("/usuarios");
      } else {
        setError(true);
      }
    } catch (err) {
      console.error("Erro ao se comunicar com servidor ", err);
      setError(true);
    }
  };

  return (
    <>
      <NavBar />
      <main className='registerForm'>
        <section>
          <form onSubmit={handleSubmit}>
            <h1>Novo Admin</h1>

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div style={{ marginTop: "1em" }}>
              <button type="submit">Cadastrar</button>
            </div>


            {error && <p className="error" style={{ marginTop: "1em" }}>Erro ao cadastrar usuário</p>}
          </form>
        </section>
      </main >
    </>
  )
}

export default NovoAdmin
