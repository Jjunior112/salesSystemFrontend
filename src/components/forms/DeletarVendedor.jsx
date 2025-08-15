import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../layout/NavBar";
import Error403 from "../layout/Error403";

const DeletarVendedor = () => {
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

    const DeletarVendedor = async () => {
        try {

            const token = localStorage.getItem("token");

            const response = await fetch(`http://localhost:8080/user/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            });

            if (!response.ok) {
                setError(true);
                throw new Error("Erro na resposta do servidor");
            }

            navigate("/vendedores");
        } catch (err) {
            console.error("Erro ao excluir vendedor", err);
            setError(true);
        }
    };



    if (error) {
        return <Error403 />
    }

    if (!seller) {
        return <div>Carregando...</div>;
    }

    return (
        <>

            <NavBar />

            <main className="clientDetails">
                <section>
                    <h1>Detalhes do Vendedor</h1>

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

                    <button onClick={DeletarVendedor}>Excluir</button>
                </section>
            </main>
        </>
    );
};

export default DeletarVendedor;
