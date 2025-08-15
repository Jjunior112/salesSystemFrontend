import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../layout/NavBar";

const EditarCliente = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [cliente, setCliente] = useState(null);

    const [phone, setPhone] = useState();
    const [street, setStreet] = useState();
    const [neighborhood, setNeighborhood] = useState();
    const [number, setNumber] = useState();
    const [zipCode, setZipCode] = useState();
    const [city, setCity] = useState();
    const [state, setState] = useState();
    const [complement, setComplement] = useState();




    useEffect(() => {
        const token = localStorage.getItem("token");

        fetch(`http://localhost:8080/clients/${id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (!response.ok) {
                    setError(true);
                    throw new Error("Erro na resposta do servidor");
                }
                return response.json();
            })
            .then((data) => {
                setCliente(data)
                setPhone(data.phone)
                setStreet(data.address.street)
                setNeighborhood(data.address.neighborhood)
                setNumber(data.address.number)
                setZipCode(data.address.zipCode)
                setCity(data.address.city)
                setState(data.address.state)
                setComplement(data.address.complement)
            })
            .catch((err) => {
                console.error("Erro ao se comunicar com servidor", err);
                setError(true);
            });
    }, [id]);

    const sendInfo = () => {

        const token = localStorage.getItem("token");

        fetch(`http://localhost:8080/clients/${id}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                phone: phone,
                address: {
                    street,
                    neighborhood,
                    zipCode,
                    city,
                    state,
                    complement,
                    number,
                }
            })
        }
        )
            .then(response => {
                if (response.ok) {
                
                    navigate("/clientes");
                } else {
                    console.error("Erro ao atualizar cliente");
                }
            })
            .catch(error => console.error("Erro na requisição:", error));
    };


    if (error) {
        return <div>Erro ao carregar cliente.</div>;
    }

    if (!cliente) {
        return <div>Carregando...</div>;
    }

    return (
        <>

            <NavBar />

            <main className="clientDetails">
                <section>
                    <h1>Editar informações do Cliente</h1>

                    <label>Nome</label>
                    <input type="text" value={cliente.firstName + " " + cliente.lastName} readOnly />

                    <label>Telefone</label>
                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />

                    <label>Rua</label>
                    <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} />

                    <label>Numero</label>
                    <input type="text" value={number} onChange={(e) => setNumber(e.target.value)} />


                    <label>Bairro</label>
                    <input type="text" value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} />

                    <label>CEP</label>
                    <input type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />

                    <label>Cidade</label>
                    <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />

                    <label>Estado</label>
                    <input type="text" value={state} onChange={(e) => setState(e.target.value)} />

                    <label>Complemento</label>
                    <input type="text" value={complement} onChange={(e) => setComplement(e.target.value)} />

                    <label>Cadastro</label>
                    <input
                        type="text"
                        value={cliente.isActive ? "Ativo" : "Inativo"}
                        readOnly
                    />

                    <button onClick={sendInfo}>Enviar</button>
                </section>
            </main>
        </>
    );
};

export default EditarCliente;
