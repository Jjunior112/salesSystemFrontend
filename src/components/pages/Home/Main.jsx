import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


const Main = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch("http://localhost:8080/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,

                }),

            });
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("token", data.token);
                localStorage.setItem("role", data.role)

                navigate("/produtos", { replace: true }); // Evita voltar pro login no back
            }
            else {
                setError(true)

            }
        } catch (error) {
            console.error("erro ao se comunicar com servidor ", error);
        }

    }


    return (

        <>
            <nav className='navSecondary'>
                <li> <Link to="/"><img src="loja.png" alt="marca da loja" /></Link> </li>
            </nav>

            <main className='login' >

                <section>
                    <form onSubmit={handleLogin} >
                        <h1>Entrar</h1>

                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                        <label htmlFor="password">Senha</label>
                        <input type="password" name="password" id="password" placeholder="Digite sua senha" value={password} onChange={(e) => setPassword(e.target.value)} required />

                        <button type="submit">Entrar</button>
                    </form>
                    {
                        error && (
                            <p className='error'>Usuário e/ou senha inválido!</p>
                        )
                    }


                </section>

            </main >
        </>
    )
}

export default Main