"use client";
import type { ProjetoSustentavel } from "@/types";
import { useEffect, useState } from "react";

export default function ProjetoSustentavelPage() {
    const [projetos, setProjetos] = useState<ProjetoSustentavel[]>([]);
    const [isEditing, setIsEditing] = useState<number | null>(null);
    const [newProjeto, setNewProjeto] = useState<ProjetoSustentavel>({
        codigo: 0,
        descricao: "",
        custo: 0,
        status: "",
    });

    useEffect(() => {
        const fetchProjetos = async () => {
            try {
                const response = await fetch("http://localhost:8080/consultar/projetoSustentavel");
                const data = await response.json();
                setProjetos(data);
            } catch (error) {
                console.error("Erro ao buscar projetos:", error);
            }
        };

        fetchProjetos();
    }, []);

    const handleAdd = async () => {
        try {
            const response = await fetch("http://localhost:8080/consultar/projetoSustentavel", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newProjeto),
            });
            if (response.ok) {
                await response.json();
                setNewProjeto({ codigo: 0, descricao: "", custo: 0, status: "" });
                window.location.reload();
            } else {
                console.error("Erro ao adicionar projeto");
            }
        } catch (error) {
            console.error("Erro ao adicionar projeto:", error);
        }
    };

    const handleEdit = (codigo: number) => {
        setIsEditing(codigo);
    };

    const handleSave = async (codigo: number) => {
        const projetoEditado = projetos.find(p => p.codigo === codigo);
        if (!projetoEditado) return;

        try {
            const response = await fetch(`http://localhost:8080/consultar/projetoSustentavel/${codigo}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(projetoEditado),
            });
            if (response.ok) {
                setProjetos(prev => prev.map(p => (p.codigo === codigo ? projetoEditado : p)));
                setIsEditing(null);
            } else {
                console.error("Erro ao editar projeto");
            }
        } catch (error) {
            console.error("Erro ao editar projeto:", error);
        }
    };

    const handleDelete = async (codigo: number) => {
        try {
            const response = await fetch(`http://localhost:8080/consultar/projetoSustentavel/${codigo}`, {
                method: "DELETE",
            });
            if (response.ok) {
                setProjetos(prev => prev.filter(p => p.codigo !== codigo));
                if (isEditing === codigo) {
                    setIsEditing(null);
                }
            } else {
                console.error("Erro ao excluir projeto");
            }
        } catch (error) {
            console.error("Erro ao excluir projeto:", error);
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h1 className="bg-gradient-to-l from-green-500 via-green-500 to-green-500 text-transparent bg-clip-text text-[40px] text-center mb-8">Projetos Sustentáveis</h1>
            <table className="min-w-full bg-gray-100 border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4 border border-gray-300">Código</th>
                        <th className="py-2 px-4 border border-gray-300">Descrição</th>
                        <th className="py-2 px-4 border border-gray-300">Custo</th>
                        <th className="py-2 px-4 border border-gray-300">Status</th>
                        <th className="py-2 px-4 border border-gray-300">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {projetos.map(projeto => (
                        <tr key={projeto.codigo} className ="projeto-row">
                            <td className="py-2 px-4 border border-gray-300">{projeto.codigo}</td>
                            <td className="py-2 px-4 border border-gray-300">
                                {isEditing === projeto.codigo ? (
                                    <input
                                        type="text"
                                        value={projeto.descricao}
                                        onChange={e =>
                                            setProjetos(
                                                projetos.map(p =>
                                                    p.codigo === projeto.codigo
                                                        ? { ...p, descricao: e.target.value }
                                                        : p
                                                )
                                            )
                                        }
                                        className="py-2 px-4 border border-gray-300 rounded-lg"
                                    />
                                ) : (
                                    projeto.descricao
                                )}
                            </td>
                            <td className="py-2 px-4 border border-gray-300">
                                {isEditing === projeto.codigo ? (
                                    <input
                                        type="number"
                                        value={projeto.custo}
                                        onChange={e =>
                                            setProjetos(
                                                projetos.map(p =>
                                                    p.codigo === projeto.codigo
                                                        ? { ...p, custo: Number(e.target.value) }
                                                        : p
                                                )
                                            )
                                        }
                                        className="py-2 px-4 border border-gray-300 rounded-lg"
                                    />
                                ) : (
                                    projeto.custo
                                )}
                            </td>
                            <td className="py-2 px-4 border border-gray-300">
                                {isEditing === projeto.codigo ? (
                                    <input
                                        type="text"
                                        value={projeto.status}
                                        onChange={e =>
                                            setProjetos(
                                                projetos.map(p =>
                                                    p.codigo === projeto.codigo
                                                        ? { ...p, status: e.target.value }
                                                        : p
                                                )
                                            )
                                        }
                                        className="py-2 px-4 border border-gray-300 rounded-lg"
                                    />
                                ) : (
                                    projeto.status
                                )}
                            </td>
                            <td className="py-2 px-4 border border-gray-300">
                                {isEditing === projeto.codigo ? (
                                    <button onClick={() => handleSave(projeto.codigo)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg">
                                        Salvar
                                    </button>
                                ) : (
                                    <button onClick={() => handleEdit(projeto.codigo)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-lg">
                                        Editar
                                    </button>
                                )}
                                <button onClick={() => handleDelete(projeto.codigo)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg">
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2 className="projeto-add-title">Adicionar Novo Projeto Sustentável</h2>
            <div className="projeto-add-form">
                <input
                    type="text"
                    placeholder="Descrição"
                    value={newProjeto.descricao}
                    onChange={e => setNewProjeto({ ...newProjeto, descricao: e.target.value })}
                    className="py-2 px-4 border border-gray-300 rounded-lg"
                />
                <input
                    type="number"
                    placeholder="Custo"
                    value={newProjeto.custo}
                    onChange={e => setNewProjeto({ ...newProjeto, custo: Number(e.target.value) })}
                    className="py-2 px-4 border border-gray-300 rounded-lg"
                />
                <input
                    type="text"
                    placeholder="Status"
                    value={newProjeto.status}
                    onChange={e => setNewProjeto({ ...newProjeto, status: e.target.value })}
                    className="py-2 px-4 border border-gray-300 rounded-lg"
                />
                <button onClick={handleAdd} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg">
                    Adicionar
                </button>
            </div>
        </div>
    );
}