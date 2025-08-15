import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../../layout/NavBar";
import Pagination from "../../layout/Pagination";
import Error403 from "../../layout/Error403";

const Vendedores = () => {
    const [sellers, setSeller] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState(false)

    const fetchSellers = (pageNumber) => {
        const token = localStorage.getItem("token");

        fetch(`http://localhost:8080/user?page=${pageNumber}&size=10&role=VENDEDOR`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (!response.ok) {
                    setError(true)
                    throw new Error("Erro na requisição");
                }
                return response.json();
            })
            .then((data) => {
                setSeller(data.content);
                setTotalPages(data.totalPages);
            })
            .catch((error) => console.error("Erro:", error));
    };

    useEffect(() => {
        fetchSellers(page);
    }, [page]);

    const nextPage = () => {
        if (page < totalPages - 1) setPage(page + 1);
    };

    const prevPage = () => {
        if (page > 0) setPage(page - 1);
    };

    return error ? (<Error403 />) : (
        <>
            <NavBar />
            <main>
                <table>
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Tipo</th>
                            <th>Cadastro</th>
                            <th>
                                <button>
                                    <Link to="/novoVendedor">Cadastrar vendedor</Link>
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sellers.map((seller) => (
                            <tr key={seller.id}>
                                <td>{seller.email}</td>
                                <td>{seller.role}</td>
                                <td>{seller.isActive ? "Ativo" : "Inativo"}</td>
                                <td>
                                    <div>
                                        <button>
                                            <Link to={`/detalhesVendedor/${seller.id}`}>Detalhes</Link>
                                        </button>
                                        <button>
                                            <Link to={`/editarVendedor/${seller.id}`}>Editar</Link>
                                        </button>
                                        <button>
                                            <Link to={`/excluirVendedor/${seller.id}`}>Excluir</Link>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
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
    )
};

export default Vendedores;