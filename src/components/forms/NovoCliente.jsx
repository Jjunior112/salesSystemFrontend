import React, { useState } from 'react'
import NavBar from '../layout/NavBar'
import { useNavigate } from 'react-router-dom'

const NovoCliente = () => {
  const [step, setStep] = useState(1);

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("")
  const [document, setDocument] = useState("")

  const [street, setStreet] = useState("")
  const [neighborhood, setNeighborhood] = useState("")
  const [zipCode, setZipCode] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [complement, setComplement] = useState("")
  const [number, setNumber] = useState("")

  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleNext = () => {
    setError(false);
    setStep((prev) => Math.min(prev + 1, 2));
  };

  const handleBack = () => {
    setError(false);
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:8080/clients", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          phone,
          document,
          address: {
            street,
            neighborhood,
            zipCode,
            city,
            state,
            complement,
            number,
          },
        }),
      });

      if (response.ok) {
        await response.json();
        navigate("/clientes");
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
            <h1>Novo Cliente</h1>

            {step === 1 && (
              <>
                <label htmlFor="firstName">Nome</label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />

                <label htmlFor="lastName">Sobrenome</label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />

                <label htmlFor="phone">Telefone</label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />

                <label htmlFor="document">Documento</label>
                <input
                  type="text"
                  id="document"
                  value={document}
                  onChange={(e) => setDocument(e.target.value)}
                  required
                />

                <div style={{ marginTop: "1em" }}>
                  <button type="button" onClick={handleNext}>Próximo</button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <label htmlFor="street">Rua</label>
                <input
                  type="text"
                  id="street"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  required
                />

                <label htmlFor="neighborhood">Bairro</label>
                <input
                  type="text"
                  id="neighborhood"
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  required
                />

                <label htmlFor="zipCode">CEP</label>
                <input
                  type="text"
                  id="zipCode"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  required
                />

                <label htmlFor="city">Cidade</label>
                <input
                  type="text"
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />

                <label htmlFor="state">Estado</label>
                <input
                  type="text"
                  id="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                />

                <label htmlFor="complement">Complemento</label>
                <input
                  type="text"
                  id="complement"
                  value={complement}
                  onChange={(e) => setComplement(e.target.value)}
                />

                <label htmlFor="number">Número</label>
                <input
                  type="text"
                  id="number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  required
                />

                <div style={{ marginTop: "1em" }}>
                  <button type="button" onClick={handleBack} style={{ marginRight: "1em" }}>Anterior</button>
                  <button type="submit">Cadastrar</button>
                </div>
              </>
            )}

            {error && <p className="error" style={{ marginTop: "1em" }}>Erro ao cadastrar cliente</p>}
          </form>
        </section>
      </main>
    </>
  )
}

export default NovoCliente
