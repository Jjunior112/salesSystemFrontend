import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../../layout/NavBar";
import Pagination from "../../layout/Pagination";

const Clientes = () => {
    const [clients, setClient] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const fetchClients = (pageNumber) => {
        const token = localStorage.getItem("token");

        fetch(`http://localhost:8080/clients?page=${pageNumber}&size=10`, {
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
                setClient(data.content);
                setTotalPages(data.totalPages);
            })
            .catch((error) => console.error("Erro:", error));
    };

    useEffect(() => {
        fetchClients(page);
    }, [page]);

    const nextPage = () => {
        if (page < totalPages - 1) setPage(page + 1);
    };

    const prevPage = () => {
        if (page > 0) setPage(page - 1);
    };

    return (
        <>
            <NavBar />
            <main>
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Telefone</th>
                            <th>Endereço</th>
                            <th>Cadastro</th>
                            <th>
                                <button>
                                    <Link to="/novoCliente">Cadastrar cliente</Link>
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map((client) => (
                            <tr key={client.id}>
                                <td>{client.firstName + " " + client.lastName}</td>
                                <td>{client.phone}</td>
                                <td>
                                    {client.address.street}, {client.address.number},{" "}
                                    {client.address.neighborhood}, {client.address.city}
                                </td>
                                <td>{client.isActive ? "Ativo" : "Inativo"}</td>
                                <td>
                                    <div>
                                        <button>
                                            <Link to={`/detalhesCliente/${client.id}`}>Detalhes</Link>
                                        </button>
                                        <button>
                                            <Link to={`/editarCliente/${client.id}`}>Editar</Link>
                                        </button>
                                        <button>
                                            <Link to={`/excluirCliente/${client.id}`}>Excluir</Link>
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
    );
};

export default Clientes;
