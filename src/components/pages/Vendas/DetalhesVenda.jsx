import React, { useContext, useEffect, useState } from 'react'
import NavBar from '../../layout/NavBar'
import { Link, useNavigate, useParams } from 'react-router-dom'

const DetalhesVenda = () => {


    const { id } = useParams();
    const [sale, setSale] = useState([]);
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        fetch(`http://localhost:8080/sales/${id}`, {
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
                setSale(data);
                setCart(data.cartItems)
            })
            .catch((err) => {
                console.error("Erro ao se comunicar com servidor", err);
                setError(true);
            });

    }, []);


    return (
        <>
            <NavBar />

            <main className='registerForm'>
                <section>
                    <form >
                        <h1>Detalhes da Venda</h1>

                        <label>Vendedor</label>
                        <input type="text" value={sale.sellerFirstName + " " + sale.sellerLastName} readOnly />

                        <label>Cliente</label>
                        <input type="text" value={sale.buyerFirstName + " " + sale.buyerLastName} readOnly />

                        <label htmlFor="cart">Carrinho</label>

                        <table>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Preço</th>
                                    <th>Quantidade</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.productName}</td>
                                        <td>{item.productPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                        <td>{item.quantity}</td>
                                        <td>{(item.subtotal).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>

                                    </tr>
                                ))}
                            </tbody>


                        </table>


                        <button onClick={() => navigate("/vendas")}>Voltar</button>
                    </form>



                </section>
            </main >

        </>
    )
}

export default DetalhesVenda