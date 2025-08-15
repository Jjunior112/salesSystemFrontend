import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../layout/NavBar";

const DeletarUsuario = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");


        fetch(`http://localhost:8080/user/${id}`, {
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
                setUser(data);
            })
            .catch((err) => {
                console.error("Erro ao se comunicar com servidor", err);
                setError(true);
            });
    }, [id]);

    const DeletarUsuario = async () => {
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

            navigate("/usuarios");
        } catch (err) {
            console.error("Erro ao excluir vendedor", err);
            setError(true);
        }
    };



    if (error) {
        return <div>Erro ao carregar usuario.</div>;
    }

    if (!user) {
        return <div>Carregando...</div>;
    }

    return (
        <>

            <NavBar />

            <main className="clientDetails">
                <section>
                    <h1>Detalhes do Usuário</h1>

                    <label>Email</label>
                    <input type="text" value={user.email} readOnly />

                    <label>Tipo</label>
                    <input type="text" value={user.role} readOnly />

                    <label>Cadastro</label>
                    <input
                        type="text"
                        value={user.isActive ? "Ativo" : "Inativo"}
                        readOnly
                    />

                    <button onClick={DeletarUsuario}>Excluir</button>
                </section>
            </main>
        </>
    );
};

export default DeletarUsuario;
