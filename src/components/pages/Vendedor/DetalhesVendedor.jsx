import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../../layout/NavBar";

const DetalhesVendedor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [seller, setSeller] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        fetch(`http://localhost:8080/user/sellers/${id}`, {
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
                setSeller(data);
            })
            .catch((err) => {
                console.error("Erro ao se comunicar com servidor", err);
                setError(true);
            });
    }, [id]);


    if (error) {
        return <div>Erro ao carregar cliente.</div>;
    }

    if (!seller) {
        return <div>Carregando...</div>;
    }

    return (
        <>

            <NavBar />

            <main className="clientDetails">
                <section>
                    <h1>Detalhes do Cliente</h1>

                    <label>Nome</label>
                    <input type="text" value={seller.firstName + " " + seller.lastName} readOnly />

                    <label>Rua</label>
                    <input type="text" value={seller.address.street + ", " + seller.address.number} readOnly />

                    <label>Bairro</label>
                    <input type="text" value={seller.address.neighborhood} readOnly />

                    <label>CEP</label>
                    <input type="text" value={seller.address.zipCode} readOnly />

                    <label>Localidade</label>
                    <input type="text" value={seller.address.city + ", " + seller.address.state} readOnly />

                    <label>Cadastro</label>
                    <input
                        type="text"
                        value={seller.isActive ? "Inativo" : "Ativo"}
                        readOnly
                    />

                    <button onClick={() => navigate("/vendedores")}>Voltar</button>
                </section>
            </main>
        </>
    );
};

export default DetalhesVendedor;
