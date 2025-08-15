import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../../layout/NavBar";

const DetalhesProduto = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [product, setProduct] = useState(null);

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
                setProduct(data);
            })
            .catch((err) => {
                console.error("Erro ao se comunicar com servidor", err);
                setError(true);
            });
    }, [id]);


    if (error) {
        return <div>Erro ao carregar produto.</div>;
    }

    if (!product) {
        return <div>Carregando...</div>;
    }

    return (
        <>

            <NavBar />

            <main className="clientDetails">
                <section>
                    <h1>Detalhes do Produto</h1>

                    <label>Nome do produto</label>
                    <input type="text" value={product.productName} readOnly />

                    <label>Marca</label>
                    <input type="text" value={product.brand} readOnly />

                    <label>Descrição</label>
                    <input type="text" value={product.productDescription} readOnly />

                    <label>Categoria</label>
                    <input type="text" value={product.productCategory} readOnly />

                    <label>Preço</label>
                    <input type="text" value={product.price} readOnly />

                    <label>Estoque</label>
                    <input type="text" value={product.balance} readOnly />

                    <button onClick={() => navigate("/produtos")}>Voltar</button>
                </section>
            </main>
        </>
    );
};

export default DetalhesProduto;
