"use client";
import type { Fonte } from "@/types";
import { useEffect, useState } from "react";

export default function Fonte() {
    const [fontes, setFontes] = useState<Fonte[]>([]);
    const [isEditing, setIsEditing] = useState<number | null>(null);
    const [newFonte, setNewFonte] = useState<Fonte>({
        codigo: 0,
        tipo: "",
        capacidade: 0,
        localizacao: "",
        descricao: "",
    });

    useEffect(() => {
        const fetchFontes = async () => {
            try {
                const response = await fetch("http://localhost:8080/consultar/fonte");
                const data = await response.json();
                setFontes(data);
            } catch (error) {
                console.error("Erro ao buscar fontes:", error);
            }
        };

        fetchFontes();
    }, []);

    const handleAdd = async () => {
        try {
            const response = await fetch("http://localhost:8080/consultar/fonte", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newFonte),
            });
            if (response.ok) {
                const addedFonte = await response.json();
                setFontes(prev => [...prev, addedFonte]);
                setNewFonte({ codigo: 0, tipo: "", capacidade: 0, localizacao: "", descricao: "" });
                window.location.reload();
            } else {
                console.error("Erro ao adicionar fonte");
            }
        } catch (error) {
            console.error("Erro ao adicionar fonte:", error);
        }
    };

    const handleEdit = (codigo: number) => {
        setIsEditing(codigo);
    };

    const handleSave = async (codigo: number) => {
        const fonteEditada = fontes.find(f => f.codigo === codigo);
        if (!fonteEditada) return;

        try {
            const response = await fetch(`http://localhost:8080/consultar/fonte/${codigo}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(fonteEditada),
            });
            if (response.ok) {
                setFontes(prev => prev.map(f => (f.codigo === codigo ? fonteEditada : f)));
                setIsEditing(null);
            } else {
                console.error("Erro ao editar fonte");
            }
        } catch (error) {
            console.error("Erro ao editar fonte:", error);
        }
    };

    const handleDelete = async (codigo: number) => {
        try {
            const response = await fetch(`http://localhost:8080/consultar/fonte/${codigo}`, {
                method: "DELETE",
            });
            if (response.ok) {
                setFontes(prev => prev.filter(f => f.codigo !== codigo));
                if (isEditing === codigo) {
                    setIsEditing(null);
                }
            } else {
                console.error("Erro ao excluir fonte");
            }
        } catch (error) {
            console.error("Erro ao excluir fonte:", error);
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h1 className="bg-gradient-to-l from-green-500 via-green-500 to-green-500 text-transparent bg-clip-text text-[40px] text-center mb-8">Fontes de Energia</h1>
            <table className="min-w-full bg-gray-100 border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4 border border-gray-300">Código</th>
                        <th className="py-2 px-4 border border-gray-300">Tipo</th>
                        <th className="py-2 px-4 border border-gray-300">Capacidade</th>
                        <th className="py-2 px-4 border border-gray-300">Localização</th>
                        <th className="py-2 px-4 border border-gray-300">Descrição</th>
                        <th className="py-2 px-4 border border-gray-300">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {fontes.map(fonte => (
                        <tr key={fonte.codigo} className="fonte-row">
                            <td className="py-2 px-4 border border-gray-300">{fonte.codigo}</td>
                            < td className="py-2 px-4 border border-gray-300">
                                {isEditing === fonte.codigo ? (
                                    <input
                                        type="text"
                                        value={fonte.tipo}
                                        onChange={e =>
                                            setFontes(
                                                fontes.map(f =>
                                                    f.codigo === fonte.codigo
                                                        ? { ...f, tipo: e.target.value }
                                                        : f
                                                )
                                            )
                                        }
                                        className="py-2 px-4 border border-gray-300 rounded-lg"
                                    />
                                ) : (
                                    fonte.tipo
                                )}
                            </td>
                            <td className="py-2 px-4 border border-gray-300">
                                {isEditing === fonte.codigo ? (
                                    <input
                                        type="number"
                                        value={fonte.capacidade}
                                        onChange={e =>
                                            setFontes(
                                                fontes.map(f =>
                                                    f.codigo === fonte.codigo
                                                        ? { ...f, capacidade: Number(e.target.value) }
                                                        : f
                                                )
                                            )
                                        }
                                        className="py-2 px-4 border border-gray-300 rounded-lg"
                                    />
                                ) : (
                                    fonte.capacidade
                                )}
                            </td>
                            <td className="py-2 px-4 border border-gray-300">
                                {isEditing === fonte.codigo ? (
                                    <input
                                        type="text"
                                        value={fonte.localizacao}
                                        onChange={e =>
                                            setFontes(
                                                fontes.map(f =>
                                                    f.codigo === fonte.codigo
                                                        ? { ...f, localizacao: e.target.value }
                                                        : f
                                                )
                                            )
                                        }
                                        className="py-2 px-4 border border-gray-300 rounded-lg"
                                    />
                                ) : (
                                    fonte.localizacao
                                )}
                            </td>
                            <td className="py-2 px-4 border border-gray-300">
                                {isEditing === fonte.codigo ? (
                                    <input
                                        type="text"
                                        value={fonte.descricao}
                                        onChange={e =>
                                            setFontes(
                                                fontes.map(f =>
                                                    f.codigo === fonte.codigo
                                                        ? { ...f, descricao: e.target.value }
                                                        : f
                                                )
                                            )
                                        }
                                        className="py-2 px-4 border border-gray-300 rounded-lg"
                                    />
                                ) : (
                                    fonte.descricao
                                )}
                            </td>
                            <td className="py-2 px-4 border border-gray-300">
                                {isEditing === fonte.codigo ? (
                                    <button onClick={() => handleSave(fonte.codigo)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg">
                                        Salvar
                                    </button>
                                ) : (
                                    <button onClick={() => handleEdit(fonte.codigo)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-lg">
                                        Editar
                                    </button>
                                )}
                                <button onClick={() => handleDelete(fonte.codigo)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg">
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2 className="fonte-add-title">Adicionar Nova Fonte</h2>
            <div className="fonte-add-form">
                <input
                    type="text"
                    placeholder="Tipo"
                    value={newFonte.tipo}
                    onChange={e => setNewFonte({ ...newFonte, tipo: e.target.value })}
                    className="py-2 px-4 border border-gray-300 rounded-lg"
                />
                <input
                    type="number"
                    placeholder="Capacidade"
                    value={newFonte.capacidade}
                    onChange={e => setNewFonte({ ...newFonte, capacidade: Number(e.target.value) })}
                    className="py-2 px-4 border border-gray-300 rounded-lg"
                />
                <input
                    type="text"
                    placeholder="Localização"
                    value={newFonte.localizacao}
                    onChange={e => setNewFonte({ ...newFonte, localizacao: e.target.value })}
                    className="py-2 px-4 border border-gray-300 rounded-lg"
                />
                <input
                    type="text"
                    placeholder="Descrição"
                    value={newFonte.descricao}
                    onChange={e => setNewFonte({ ...newFonte, descricao: e.target.value })}
                    className="py-2 px-4 border border-gray-300 rounded-lg"
                />
                <button onClick={handleAdd} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg">
                    Adicionar
                </button>
            </div>
        </div>
    );
}