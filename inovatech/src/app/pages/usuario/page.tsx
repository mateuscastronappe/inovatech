"use client";
import type { Usuario } from "@/types";
import { useEffect, useState } from "react";

export default function UsuarioPage() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [isEditing, setIsEditing] = useState<number | null>(null);
    const [newUsuario, setNewUsuario] = useState<Usuario>({
        codigo: 0,
        nome: "",
        cpf: "",
        email: "",
    });

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await fetch("http://localhost:8080/consultar/usuario");
                const data = await response.json();
                setUsuarios(data);
            } catch (error) {
                console.error("Erro ao buscar usuários:", error);
            }
        };

        fetchUsuarios();
    }, []);

    const handleAdd = async () => {
        try {
            const response = await fetch("http://localhost:8080/consultar/usuario", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newUsuario),
            });
            if (response.ok) {
                await response.json();
                setNewUsuario({ codigo: 0, nome: "", cpf: "", email: "" });
                window.location.reload();
            } else {
                console.error("Erro ao adicionar usuário");
            }
        } catch (error) {
            console.error("Erro ao adicionar usuário:", error);
        }
    };

    const handleEdit = (codigo: number) => {
        setIsEditing(codigo);
    };

    const handleSave = async (codigo: number) => {
        const usuarioEditado = usuarios.find(u => u.codigo === codigo);
        if (!usuarioEditado) return;

        try {
            const response = await fetch(`http://localhost:8080/consultar/usuario/${codigo}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(usuarioEditado),
            });
            if (response.ok) {
                setUsuarios(prev => prev.map(u => (u.codigo === codigo ? usuarioEditado : u)));
                setIsEditing(null);
            } else {
                console.error("Erro ao editar usuário");
            }
        } catch (error) {
            console.error("Erro ao editar usuário:", error);
        }
    };

    const handleDelete = async (codigo: number) => {
        try {
            const response = await fetch(`http://localhost:8080/consultar/usuario/${codigo}`, {
                method: "DELETE",
            });
            if (response.ok) {
                setUsuarios(prev => prev.filter(u => u.codigo !== codigo));
                if (isEditing === codigo) {
                    setIsEditing(null);
                }
            } else {
                console.error("Erro ao excluir usuário");
            }
        } catch (error) {
            console.error("Erro ao excluir usuário:", error);
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h1 className="bg-gradient-to-l from-green-500 via-green-500 to-green-500 text-transparent bg-clip-text text-[40px] text-center mb-8">Usuários</h1>
            <table className="min-w-full bg-gray-100 border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4 border border-gray-300">Código</th>
                        <th className="py-2 px-4 border border-gray-300">Nome</th>
                        <th className="py-2 px-4 border border-gray-300">CPF</th>
                        <th className="py-2 px-4 border border-gray-300">Email</th>
                        <th className="py-2 px-4 border border-gray-300">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map(usuario => (
                        <tr key={usuario.codigo} className="usuario-row">
                            <td className="py-2 px-4 border border-gray-300">{usuario.codigo}</td>
                            <td className="py-2 px-4 border border-gray-300">
                                {isEditing === usuario.codigo ? (
                                    <input
                                        type="text"
                                        value={usuario.nome}
                                        onChange={e =>
                                            setUsuarios(
                                                usuarios.map(u =>
                                                    u.codigo === usuario.codigo
                                                        ? { ...u, nome: e.target.value }
                                                        : u
                                                )
                                            )
                                        }
                                        className="py-2 px-4 border border-gray-300 rounded-lg"
                                    />
                                ) : (
                                    usuario.nome
                                )}
                            </td>
                            <td className="py-2 px-4 border border-gray-300">
                                {isEditing === usuario.codigo ? (
                                    <input
                                        type="text"
                                        value={usuario.cpf}
                                        onChange={e =>
                                            setUsuarios(
                                                usuarios.map(u =>
                                                    u.codigo === usuario.codigo
                                                        ? { ...u, cpf: e.target.value }
                                                        : u
                                                )
                                            )
                                        }
                                        className="py-2 px-4 border border-gray-300 rounded-lg"
                                    />
                                ) : (
                                    usuario.cpf
                                )}
                            </td>
                            <td className="py-2 px-4 border border-gray-300">
                                {isEditing === usuario.codigo ? (
                                    <input
                                        type="email"
                                        value={usuario.email}
                                        onChange={e =>
                                            setUsuarios(
                                                usuarios.map(u =>
                                                    u.codigo === usuario.codigo
                                                        ? { ...u, email: e.target.value }
                                                        : u
                                                )
                                            )
                                        }
                                        className="py-2 px-4 border border-gray-300 rounded-lg"
                                    />
                                ) : (
                                    usuario.email
                                )}
                            </td>
                            <td className="py-2 px-4 border border-gray-300">
                                {isEditing === usuario.codigo ? (
                                    <button onClick={() => handleSave(usuario.codigo)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg">
                                        Salvar
                                    </button>
                                ) : (
                                    <button onClick={() => handleEdit(usuario.codigo)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-lg">
                                        Editar
                                    </button>
                                )}
                                <button onClick={() => handleDelete(usuario.codigo)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg">
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2 className="usuario-add-title">Adicionar Novo Usuário</h2>
            <div className="usuario-add-form">
                <input
                    type="text"
                    placeholder="Nome"
                    value={newUsuario.nome}
                    onChange={e => setNewUsuario({ ...newUsuario, nome: e.target.value })}
                    className="py-2 px-4 border border-gray-300 rounded-lg"
                />
                <input
                    type="text"
                    placeholder="CPF"
                    value={newUsuario.cpf}
                    onChange={e => setNewUsuario({ ...newUsuario, cpf: e.target.value })}
                    className="py-2 px-4 border border-gray-300 rounded-lg"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={newUsuario.email}
                    onChange={e => setNewUsuario({ ...newUsuario, email: e.target.value })}
                    className="py-2 px-4 border border-gray-300 rounded-lg"
                />
                <button onClick={handleAdd} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg">
                    Adicionar
                </button>
            </div>
        </div>
    );
}