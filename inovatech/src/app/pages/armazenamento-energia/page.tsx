"use client";
import type { ArmazenamentoEnergia } from "@/types";
import { useEffect, useState } from "react";

export default function ArmazenamentoEnergia() {
    const [armazenamentos, setArmazenamentos] = useState<ArmazenamentoEnergia[]>([]);
    const [isEditing, setIsEditing] = useState<number | null>(null);
    const [newArmazenamento, setNewArmazenamento] = useState<ArmazenamentoEnergia>({
        codigo: 0,
        tipo: "",
        capacidade: 0,
        custo: 0,
    });

    useEffect(() => {
        const fetchArmazenamentos = async () => {
            try {
                const response = await fetch("http://localhost:8080/consultar/armazenamentoEnergia");
                const data = await response.json();
                setArmazenamentos(data);
            } catch (error) {
                console.error("Erro ao buscar armazenamentos:", error);
            }
        };

        fetchArmazenamentos();
    }, []);

    const handleAdd = async () => {
        try {
            const response = await fetch("http://localhost:8080/consultar/armazenamentoEnergia", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newArmazenamento),
            });
            if (response.ok) {
                await response.json(); 
                setNewArmazenamento({ codigo: 0, tipo: "", capacidade: 0, custo: 0 });
                window.location.reload(); 
            } else {
                console.error("Erro ao adicionar armazenamento");
            }
        } catch (error) {
            console.error("Erro ao adicionar armazenamento:", error);
        }
    };

    const handleEdit = (codigo: number) => {
        setIsEditing(codigo);
    };

    const handleSave = async (codigo: number) => {
        const armazenamentoEditado = armazenamentos.find(a => a.codigo === codigo);
        if (!armazenamentoEditado) return;

        try {
            const response = await fetch(`http://localhost:8080/consultar/armazenamentoEnergia/${codigo}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(armazenamentoEditado),
            });
            if (response.ok) {
                setArmazenamentos(prev => prev.map(a => (a.codigo === codigo ? armazenamentoEditado : a)));
                setIsEditing(null);
            } else {
                console.error("Erro ao editar armazenamento");
            }
        } catch (error) {
            console.error("Erro ao editar armazenamento:", error);
        }
    };

    const handleDelete = async (codigo: number) => {
        try {
            const response = await fetch(`http://localhost:8080/consultar/armazenamentoEnergia/${codigo}`, {
                method: "DELETE",
            });
            if (response.ok) {
                setArmazenamentos(prev => prev.filter(a => a.codigo !== codigo));
                if (isEditing === codigo) {
                    setIsEditing(null);
                }
            } else {
                console.error("Erro ao excluir armazenamento");
            }
        } catch (error) {
            console.error("Erro ao excluir armazenamento:", error);
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h1 className="bg-gradient-to-l from-green-500 via-green-500 to-green-500 text-transparent bg-clip-text text-[40px] text-center mb-8">Armazenamentos de Energia</h1>
            <table className="min-w-full bg-gray-100 border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4 border border-gray-300">Código</th>
                        <th className="py-2 px-4 border border-gray-300">Tipo</th>
                        <th className="py-2 px-4 border border-gray-300">Capacidade</th>
                        <th className="py-2 px-4 border border-gray-300">Custo</th>
                        <th className="py-2 px-4 border border-gray-300">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {armazenamentos.map(armazenamento => (
                        <tr key={armazenamento.codigo} className="armazenamento-row">
                            <td className="py-2 px-4 border border-gray-300">{armazenamento.codigo}</td>
                            <td className="py-2 px-4 border border-gray-300">
                                {isEditing === armazenamento.codigo ? (
                                    <input
                                        type="text"
                                        value={armazenamento.tipo}
                                        onChange={e =>
                                            setArmazenamentos(
                                                armazenamentos.map(a =>
                                                    a.codigo === armazenamento.codigo
                                                        ? { ...a, tipo: e.target.value }
                                                        : a
                                                )
                                            )
                                        }
                                        className="py-2 px-4 border border-gray-300 rounded-lg"
                                    />
                                ) : (
                                    armazenamento.tipo
                                )}
                            </td>
                            <td className="py-2 px-4 border border-gray-300">
                                {isEditing === armazenamento.codigo ? (
                                    <input
                                        type="number"
                                        value={armazenamento.capacidade}
                                        onChange={e =>
                                            setArmazenamentos(
                                                armazenamentos.map(a =>
                                                    a.codigo === armazenamento.codigo
                                                        ? { ...a, capacidade: Number(e.target.value) }
                                                        : a
                                                )
                                            )
                                        }
                                        className="py-2 px-4 border border-gray-300 rounded-lg"
                                    />
                                ) : (
                                    armazenamento.capacidade
                                )}
                            </td>
                            <td className="py-2 px-4 border border-gray-300">
                                {isEditing === armazenamento.codigo ? (
                                    <input
                                        type="number"
                                        value={armazenamento.custo}
                                        onChange={e =>
                                            setArmazenamentos(
                                                armazenamentos.map(a =>
                                                    a.codigo === armazenamento.codigo
                                                        ? { ...a, custo: Number(e.target.value) }
                                                        : a
                                                )
                                            )
                                        }
                                        className="py-2 px-4 border border-gray-300 rounded-lg"
                                    />
                                ) : (
                                    armazenamento.custo
                                )}
                            </td>
                            <td className="py-2 px-4 border border-gray-300">
                                {isEditing === armazenamento.codigo ? (
                                    <button onClick={() => handleSave(armazenamento.codigo)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg">
                                        Salvar
                                    </button>
                                ) : (
                                    <button onClick={() => handleEdit(armazenamento.codigo)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-lg">
                                        Editar
                                    </button>
                                )}
                                <button onClick={() => handleDelete(armazenamento.codigo)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg">
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2 className="armazenamento-add-title">Adicionar Novo Armazenamento</h2>
            <div className="armazenamento-add-form">
                <input
                    type="text"
                    placeholder="Tipo"
                    value={newArmazenamento.tipo}
                    onChange={e => setNewArmazenamento({ ...newArmazenamento, tipo: e.target.value })}
                    className="py-2 px-4 border border-gray-300 rounded-lg"
                />
                <input
                    type="number"
                    placeholder="Capacidade"
                    value={newArmazenamento.capacidade}
                    onChange={e => setNewArmazenamento({ ...newArmazenamento, capacidade: Number(e.target.value) })}
                    className="py-2 px-4 border border-gray-300 rounded-lg"
                />
                <input
                    type="number"
                    placeholder="Custo"
                    value={newArmazenamento.custo}
                    onChange={e => setNewArmazenamento({ ...newArmazenamento, custo: Number(e.target.value) })}
                    className="py-2 px-4 border border-gray-300 rounded-lg"
                />
                <button onClick={handleAdd} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg">
                    Adicionar
                </button>
            </div>
        </div>
    );
}