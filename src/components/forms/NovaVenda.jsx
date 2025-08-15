import React, { useContext, useEffect, useState } from 'react'
import NavBar from '../layout/NavBar'
import { CartContext } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'

const NovaVenda = () => {

    const [sellers, setSellers] = useState([]);
    const [seller, setSeller] = useState([]);
    const [clients, setClients] = useState([]);
    const [client, setClient] = useState([]);
    const { cart } = useContext(CartContext);

    const navigate = useNavigate();


    const handleSale = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        try {
            const response = await fetch("http://localhost:8080/sales", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({

                    sellerId: seller,
                    buyerId: client,
                    cart: cart.map(item => ({
                        productId: item.id,
                        quantity: item.quantity
                    }))

                })

            })
            if (response.ok) {
                navigate("/vendas")

            }
        } catch (error) {

            console.error(error)

        }
    }


    useEffect(() => {
        const token = localStorage.getItem("token");

        fetch("http://localhost:8080/user/sellers?page=0&size=10", {
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
                setSellers(data.content);
            })
            .catch((err) => {
                console.error("Erro ao se comunicar com servidor", err);
                setError(true);
            });

        fetch("http://localhost:8080/clients?page=0&size=10", {
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
                setClients(data.content);
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
                    <form onSubmit={handleSale} >
                        <h1>Nova venda</h1>

                        <label htmlFor="seller">Vendedor</label>

                        <select

                            name="seller"
                            id="seller"
                            value={seller}
                            onChange={(e) => setSeller(e.target.value)}

                            required
                        >
                            <option value=" ">Selecione o vendedor</option>
                            {sellers.map((seller) => (
                                <option key={seller.id} value={seller.id}>
                                    {seller.firstName} {seller.lastName}
                                </option>
                            ))}

                        </select>

                        <label htmlFor="productName">Cliente</label>
                        <select

                            name="seller"
                            id="seller"
                            value={client}
                            onChange={(e) => setClient(e.target.value)}

                            required
                        >
                            <option value=" ">Selecione o vendedor</option>
                            {clients.map((client) => (
                                <option key={client.id} value={client.id}>
                                    {client.firstName} {client.lastName}
                                </option>
                            ))}

                        </select>

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
                                        <td>{item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                        <td>{item.quantity}</td>
                                        <td>{(item.price * item.quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>

                                    </tr>
                                ))}
                            </tbody>


                        </table>


                        <button type="submit">Finalizar</button>
                    </form>



                </section>
            </main >

        </>
    )
}

export default NovaVenda