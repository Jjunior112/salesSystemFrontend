import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../layout/NavBar";

const EditarUsuario = () => {
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
                setUser(data)
            })
            .catch((err) => {
                console.error("Erro ao se comunicar com servidor", err);
                setError(true);
            });
    }, [id]);

    const sendInfo = () => {

        const token = localStorage.getItem("token");

        fetch(`http://localhost:8080/user/reactive/${id}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        }
        )
            .then(response => {
                if (response.ok) {
                    navigate("/usuarios");
                } else {
                    console.error("Erro ao atualizar usuario");
                }
            })
            .catch(error => console.error("Erro na requisição:", error));
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
                    <h1>Editar informações do Usuário</h1>

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

                    <button onClick={sendInfo}>Reativar</button>
                </section>
            </main>
        </>
    );
};

export default EditarUsuario;
