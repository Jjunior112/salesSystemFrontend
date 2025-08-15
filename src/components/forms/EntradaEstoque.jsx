import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../layout/NavBar";

const EntradaEstoque = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [product, setProduct] = useState(null);
    const [balance, setBalance] = useState()




    useEffect(() => {
        const token = localStorage.getItem("token");

        fetch(`http://localhost:8080/products/${id}`, {
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
                setProduct(data)
            })
            .catch((err) => {
                console.error("Erro ao se comunicar com servidor", err);
                setError(true);
            });
    }, [id]);

    const sendInfo = () => {

        const token = localStorage.getItem("token");

        fetch(`http://localhost:8080/products/${id}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({

                balance: Number(balance)

            })
        }
        )
            .then(response => {
                if (response.ok) {
                    navigate("/produtos");
                } else {
                    console.error("Erro ao atualizar vendedor");
                }
            })
            .catch(error => console.error("Erro na requisição:", error));
    };


    if (error) {
        return <div>Erro ao carregar vendedor.</div>;
    }

    if (!product) {
        return <div>Carregando...</div>;
    }

    return (
        <>

            <NavBar />

            <main className="clientDetails">
                <section>
                    <h1>Entrada de estoque</h1>

                    <label>Nome do produto</label>
                    <input type="text" value={product.productName} readOnly />

                    <label>Marca</label>
                    <input type="text" value={product.brand} readOnly />

                    <label>Categoria</label>
                    <input type="text" value={product.productCategory} readOnly />

                    <label>Preço</label>
                    <input type="text" value={product.price} readOnly />

                    <label>Estoque</label>
                    <input type="text" value={product.balance} readOnly />

                    <label>Entrada</label>
                    <input type="number" value={balance} onChange={(e) => setBalance(e.target.value)} />


                    <button onClick={sendInfo}>Enviar</button>
                </section>
            </main>
        </>
    );
};

export default EntradaEstoque;
