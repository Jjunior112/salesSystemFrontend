import { useEffect, useState } from "react";
import NavBar from "../../layout/NavBar";
import Pagination from "../../layout/Pagination";
import { Link } from "react-router-dom";

const Vendas = () => {
    const [sales, setSale] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const fetchSales = (pageNumber) => {
        const token = localStorage.getItem("token");

        fetch(`http://localhost:8080/sales?page=${pageNumber}&size=20`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
            .then((response) => {
                if (!response.ok) throw new Error("Erro na requisição");
                return response.json();
            })
            .then((data) => {
                setSale(data.content);
                setTotalPages(data.totalPages);
            })
            .catch((error) => console.error("Erro:", error));
    };

    useEffect(() => {
        fetchSales(page);
    }, [page]);

    const nextPage = () => {
        if (page < totalPages - 1) setPage(page + 1);
    };

    const prevPage = () => {
        if (page > 0) setPage(page - 1);
    };

    const total = sales.reduce((acc, item) => acc + item.totalAmount, 0);

    return (
        <>
            <NavBar />
            <main>
                <table>
                    <thead>
                        <tr>
                            <th>Numero venda</th>
                            <th>Cliente</th>
                            <th>Vendedor</th>
                            <th>Data</th>
                            <th>Total</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.map((sale) => {
                            const formattedDate = new Date(sale.timestamp).toLocaleString("pt-BR", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                            });

                            const formattedAmount = new Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                            }).format(sale.totalAmount);

                            return (
                                <tr key={sale.saleId}>
                                    <td>{sale.saleId}</td>
                                    <td>{sale.buyerFirstName + " " + sale.buyerLastName}</td>
                                    <td>{sale.sellerFirstName + " " + sale.sellerLastName}</td>
                                    <td>{formattedDate}</td>
                                    <td>{formattedAmount}</td>
                                    <td><button><Link to={`/detalhesVenda/${sale.saleId}`}>Detalhes</Link></button></td>
                                </tr>
                            );
                        })}
                    </tbody>
                    <tfoot className="cartTotal">
                        <tr>
                            <td>Total</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>{total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</td>
                            <td>-</td>
                        </tr>
                    </tfoot>
                </table>


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
    );
};

export default Vendas;
