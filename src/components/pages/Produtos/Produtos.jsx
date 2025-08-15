// import { useContext, useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import NavBar from "../../layout/NavBar";
// import { CartContext } from "../../context/CartContext";
// import CardProdutos from "../../layout/CardProdutos";


// const Produtos = () => {
//     const [products, setProduct] = useState([]);

//     const { increaseToCart } = useContext(CartContext);

//     useEffect(() => {

//         const token = localStorage.getItem("token");

//         fetch("http://localhost:8080/products?page=0&size=100", {
//             method: "GET",
//             headers: {
//                 "Authorization": `Bearer ${token}`,
//                 "Content-Type": "application/json"
//             },
//         })
//             .then((response) => {
//                 if (!response.ok) throw new Error("Erro na requisição");
//                 return response.json();
//             })
//             .then((data) => setProduct(data.content))
//             .catch((error) => console.error("Erro:", error));
//     }, []);

//     return (

//     )
// }



import { useContext, useEffect, useState } from "react";
import NavBar from "../../layout/NavBar";
import { CartContext } from "../../context/CartContext";
import CardProdutos from "../../layout/CardProdutos";
import Pagination from "../../layout/Pagination";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const Produtos = () => {
    const [products, setProduct] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const { role } = useContext(AuthContext)

    const { increaseToCart } = useContext(CartContext);

    const fetchProducts = (pageNumber) => {
        const token = localStorage.getItem("token");

        fetch(`http://localhost:8080/products?page=${pageNumber}&size=12`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (!response.ok) throw new Error("Erro na requisição");
                return response.json();
            })
            .then((data) => {
                setProduct(data.content);
                setTotalPages(data.totalPages);
            })
            .catch((error) => console.error("Erro:", error));
    };

    useEffect(() => {
        fetchProducts(page);
    }, [page]);

    const nextPage = () => {
        if (page < totalPages - 1) setPage(page + 1);
    };

    const prevPage = () => {
        if (page > 0) setPage(page - 1);
    };

    return role === "ADMIN" ? (
        <>
            <NavBar />

            <main>


                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Categoria</th>
                            <th>Marca</th>
                            <th>Saldo</th>
                            <th>Preço</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => {
                            const formattedAmount = new Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                            }).format(product.price);

                            const categoryMap = {
                                SHOES: "Sapatos",
                                CLOTHES: "Roupas",
                            };

                            return (
                                <tr key={product.id}>
                                    <td>{product.productName}</td>
                                    <td>{categoryMap[product.productCategory] || product.productCategory}</td>
                                    <td>{product.brand}</td>
                                    <td>{product.balance}</td>
                                    <td>{formattedAmount}</td>
                                    <td>
                                        <div>
                                            <button ><Link to={`/detalhesProduto/${product.id}`}>Detalhes</Link> </button>


                                            <button><Link to={`/editarProduto/${product.id}`}>Editar</Link></button>

                                            <button> <Link to={`/excluirProduto/${product.id}`}>Excluir</Link> </button>

                                            <button id="stockIn"><Link to={`/entradaEstoque/${product.id}`}>Entrada no estoque</Link> </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        }
                        )}

                    </tbody>
                </table>
            </main >
        </>








    ) : (
        <>
            <NavBar />

            <main className="products">
                {products.map((product) => {
                    const formattedAmount = new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                    }).format(product.price);

                    return (
                        <div key={product.id}>
                            <CardProdutos
                                productName={product.productName}
                                productDescription={product.productDescription}
                                brand={product.brand}
                                balance={product.balance}
                                price={formattedAmount}
                                addToCart={() => increaseToCart(product)}
                            />
                        </div>
                    );
                })}

            </main>
            <div className="pagination">
                <Pagination
                    page={page}
                    totalPages={totalPages}
                    onNext={nextPage}
                    onPrev={prevPage}
                />
            </div>
        </>
    )

};

export default Produtos;
