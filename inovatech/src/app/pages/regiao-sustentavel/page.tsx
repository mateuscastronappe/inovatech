"use client";
import type { RegiaoSustentavel } from "@/types";
import { useEffect, useState } from "react";

export default function RegiaoSustentavelPage() {
    const [regioes, setRegioes] = useState<RegiaoSustentavel[]>([]);
    const [isEditing, setIsEditing] = useState<number | null>(null);
    const [newRegiao, setNewRegiao] = useState<RegiaoSustentavel>({
        codigo: 0,
        nomeRegiao: "",
        populacao: 0,
        energiaRenovavel: 0,
    });

    useEffect(() => {
        const fetchRegioes = async () => {
            try {
                const response = await fetch("http://localhost:8080/consultar/regiaoSustentavel");
                const data = await response.json();
                setRegioes(data);
            } catch (error) {
                console.error("Erro ao buscar regiões sustentáveis:", error);
            }
        };

        fetchRegioes();
    }, []);

    const handleAdd = async () => {
        try {
            const response = await fetch("http://localhost:8080/consultar/regiaoSustentavel", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newRegiao),
            });
            if (response.ok) {
                await response.json();
                setNewRegiao({ codigo: 0, nomeRegiao: "", populacao: 0, energiaRenovavel: 0 });
                window.location.reload();
            } else {
                console.error("Erro ao adicionar região sustentável");
            }
        } catch (error) {
            console.error("Erro ao adicionar região sustentável:", error);
        }
    };

    const handleEdit = (codigo: number) => {
        setIsEditing(codigo);
    };

    const handleSave = async (codigo: number) => {
        const regiaoEditada = regioes.find(r => r.codigo === codigo);
        if (!regiaoEditada) return;

        try {
            const response = await fetch(`http://localhost:8080/consultar/regiaoSustentavel/${codigo}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(regiaoEditada),
            });
            if (response.ok) {
                setRegioes(prev => prev.map(r => (r.codigo === codigo ? regiaoEditada : r)));
                setIsEditing(null);
            } else {
                console.error("Erro ao editar região sustentável");
            }
        } catch (error) {
            console.error("Erro ao editar região sustentável:", error);
        }
    };

    const handleDelete = async (codigo: number) => {
        try {
            const response = await fetch(`http://localhost:8080/consultar/regiaoSustentavel/${codigo}`, {
                method: "DELETE",
            });
            if (response.ok) {
                setRegioes(prev => prev.filter(r => r.codigo !== codigo));
                if (isEditing === codigo) {
                    setIsEditing(null);
                }
            } else {
                console.error("Erro ao excluir região sustentável");
            }
        } catch (error) {
            console.error("Erro ao excluir região sustentável:", error);
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h1 className="bg-gradient-to-l from-green-500 via-green-500 to-green-500 text-transparent bg-clip-text text-[40px] text-center mb-8">Regiões Sustentáveis</h1>
            <table className="min-w-full bg-gray-100 border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4 border border-gray-300">Código</th>
                        <th className="py-2 px-4 border border-gray-300">Nome da Região</th>
                        <th className="py-2 px-4 border border-gray-300">População</th>
                        <th className="py-2 px-4 border border-gray-300">Energia Renovável</th>
                        <th className="py-2 px-4 border border-gray-300">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {regioes.map(regiao => (
                        <tr key={regiao.codigo} className="regiao-row">
                            <td className="py-2 px-4 border border-gray-300">{regiao.codigo}</td>
                            <td className="py-2 px-4 border border-gray-300">
                                {isEditing === regiao.codigo ? (
                                    <input
                                        type="text"
                                        value={regiao.nomeRegiao}
                                        onChange={e =>
                                            setRegioes(
                                                regioes.map(r =>
                                                    r.codigo === regiao.codigo
                                                        ? { ...r, nomeRegiao: e.target.value }
                                                        : r
                                                )
                                            )
                                        }
                                        className="py-2 px-4 border border-gray-300 rounded-lg"
                                    />
                                ) : (
                                    regiao.nomeRegiao
                                )}
                            </td>
                            <td className="py-2 px-4 border border-gray-300">
                                {isEditing === regiao.codigo ? (
                                    <input
                                        type="number"
                                        value={regiao.populacao}
                                        onChange={e =>
                                            setRegioes(
                                                regioes.map(r =>
                                                    r.codigo === regiao.codigo
                                                        ? { ...r, populacao: Number(e.target.value) }
                                                        : r
                                                )
                                            )
                                        }
                                        className="py-2 px-4 border border-gray-300 rounded-lg"
                                    />
                                ) : (
                                    regiao.populacao
                                )}
                            </td>
                            <td className="py-2 px-4 border border-gray-300">
                                {isEditing === regiao.codigo ? (
                                    <input
                                        type="number"
                                        value={regiao.energiaRenovavel}
                                        onChange={e =>
                                            setRegioes(
                                                regioes.map(r =>
                                                    r.codigo === regiao.codigo
                                                        ? { ...r, energiaRenovavel: Number(e.target.value) }
                                                        : r
                                                )
                                            )
                                        }
                                        className="py-2 px-4 border border-gray-300 rounded-lg"
                                    />
                                ) : (
                                    regiao.energiaRenovavel
                                )}
                            </td>
                            <td className="py-2 px-4 border border-gray-300">
                                {isEditing === regiao.codigo ? (
                                    <button onClick={() => handleSave(regiao.codigo)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg">
                                        Salvar
                                    </button>
                                ) : (
                                    <button onClick={() => handleEdit(regiao.codigo)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-lg">
                                        Editar
                                    </button>
                                )}
                                <button onClick={() => handleDelete(regiao.codigo)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg">
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2 className="regiao-add-title">Adicionar Nova Região Sustentável</h2>
            <div className="regiao-add-form">
                <input
                    type="text"
                    placeholder="Nome da Região"
                    value={newRegiao.nomeRegiao}
                    onChange={e => setNewRegiao({ ...newRegiao, nomeRegiao: e.target.value })}
                    className="py-2 px-4 border border-gray-300 rounded-lg"
                />
                <input
                    type="number"
                    placeholder="População"
                    value={newRegiao.populacao}
                    onChange={e => setNewRegiao({ ...newRegiao, populacao: Number(e.target.value) })}
                    className="py-2 px-4 border border-gray-300 rounded-lg"
                />
                <input
                    type="number"
                    placeholder="Energia Renovável"
                    value={newRegiao.energiaRenovavel}
                    onChange={e => setNewRegiao({ ...newRegiao, energiaRenovavel: Number(e.target.value) })}
                    className="py-2 px-4 border border-gray-300 rounded-lg"
                />
                <button onClick={handleAdd} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg">
                    Adicionar
                </button>
            </div>
        </div>
    );
}