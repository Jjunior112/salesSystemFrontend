import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../../layout/NavBar";

const DetalhesCliente = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [cliente, setCliente] = useState(null);

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
                setCliente(data);
            })
            .catch((err) => {
                console.error("Erro ao se comunicar com servidor", err);
                setError(true);
            });
    }, [id]);


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
                    <h1>Detalhes do Cliente</h1>

                    <label>Nome</label>
                    <input type="text" value={cliente.firstName + " " + cliente.lastName} readOnly />

                    <label>Telefone</label>
                    <input type="text" value={cliente.phone} readOnly />

                    <label>Rua</label>
                    <input type="text" value={cliente.address.street + ", " + cliente.address.number} readOnly />


                    <label>Bairro</label>
                    <input type="text" value={cliente.address.neighborhood} readOnly />

                    <label>CEP</label>
                    <input type="text" value={cliente.address.zipCode} readOnly />

                    <label>Localidade</label>
                    <input type="text" value={cliente.address.city + ", " + cliente.address.state} readOnly />

                    <label>Cadastro</label>
                    <input
                        type="text"
                        value={cliente.isActive ? "Ativo" : "Inativo"}
                        readOnly
                    />

                    <button onClick={() => navigate("/clientes")}>Voltar</button>
                </section>
            </main>
        </>
    );
};

export default DetalhesCliente;
