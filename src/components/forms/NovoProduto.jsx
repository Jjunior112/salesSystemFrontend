import React, { useState } from 'react'
import NavBar from '../layout/NavBar'
import { useNavigate } from 'react-router-dom'

const NovoProduto = () => {

    const [productName, setProductName] = useState("")
    const [productCategory, setProductCategory] = useState("")
    const [productDescription, setProductDescription] = useState("")
    const [brand, setBrand] = useState("")
    const [balance, setBalance] = useState("")
    const [price, setPrice] = useState("")
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleProduct = async (e) => {
        e.preventDefault()

        try {

            const token = localStorage.getItem("token")

            const response = await fetch("http://localhost:8080/products", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    productName,
                    productDescription,
                    productCategory,
                    brand,
                    balance: Number(balance),
                    price: Number(price)
                }),

            });
            if (response.ok) {
                await response.json();

                navigate("/produtos")

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
            <NavBar />

            <main className='registerForm'>
                <section>
                    <form onSubmit={handleProduct} >
                        <h1>Novo produto</h1>

                        <label htmlFor="productName">Nome do produto</label>
                        <input type="text" name="productName" id="productName" placeholder="Digite o nome do produto" value={productName} onChange={(e) => setProductName(e.target.value)} required />

                        <label htmlFor="productCategory">Categoria</label>
                        <select
                            name="productCategory"
                            id="productCategory"
                            value={productCategory}
                            onChange={(e) => setProductCategory(e.target.value)}
                            required
                        >
                            <option value="">Selecione a categoria do produto</option>
                            <option value="SHOES">Sapatos</option>
                            <option value="CLOTHES">Roupas</option>
                        </select>

                        <label htmlFor="brand">Marca</label>
                        <input type="text" name="brand" id="brand" placeholder="Digite a marca do produto" value={brand} onChange={(e) => setBrand(e.target.value)} required />

                        <label htmlFor="productDescription">Descrição</label>
                        <input type="text" name="productDescription" id="productDescription" placeholder="Digite a marca do produto" value={productDescription} onChange={(e) => setProductDescription(e.target.value)} required />



                        <label htmlFor="balance">Saldo</label>
                        <input type="number" name="balance" id="balance" placeholder="Digite o saldo do produto" value={balance} onChange={(e) => setBalance(e.target.value)} required />

                        <label htmlFor="price">Preço</label>
                        <input type="number" name="price" id="price" placeholder="Digite o preço do produto" value={price} onChange={(e) => setPrice(e.target.value)} required />



                        <button type="submit">Cadastrar</button>
                    </form>
                    {
                        error && (
                            <p className='error'>Erro</p>
                        )
                    }


                </section>
            </main>

        </>
    )
}

export default NovoProduto