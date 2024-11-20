"use client";
import type { RedeInteligente } from "@/types";
import { useEffect, useState } from "react";

export default function RedeInteligentePage() {
    const [redesInteligentes, setRedesInteligentes] = useState<RedeInteligente[]>([]);
    const [isEditing, setIsEditing] = useState<number | null>(null);
    const [newRede, setNewRede] = useState<RedeInteligente>({
        codigo: 0,
        nome: "",
        eficienciaDistribuicao: 0,
        perdaEnergia: 0,
    });

    useEffect(() => {
        const fetchRedesInteligentes = async () => {
            try {
                const response = await fetch("http://localhost:8080/consultar/redeInteligente");
                const data = await response.json();
                setRedesInteligentes(data);
            } catch (error) {
                console.error("Erro ao buscar redes inteligentes:", error);
            }
        };

        fetchRedesInteligentes();
    }, []);

    const handleAdd = async () => {
        try {
            const response = await fetch("http://localhost:8080/consultar/redeInteligente", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newRede),
            });
            if (response.ok) {
                await response.json();
                setNewRede({ codigo: 0, nome: "", eficienciaDistribuicao: 0, perdaEnergia: 0 });
                window.location.reload();
            } else {
                console.error("Erro ao adicionar rede inteligente");
            }
        } catch (error) {
            console.error("Erro ao adicionar rede inteligente:", error);
        }
    };

    const handleEdit = (codigo: number) => {
        setIsEditing(codigo);
    };

    const handleSave = async (codigo: number) => {
        const redeEditada = redesInteligentes.find(r => r.codigo === codigo);
        if (!redeEditada) return;

        try {
            const response = await fetch(`http://localhost:8080/consultar/redeInteligente/${codigo}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(redeEditada),
            });
            if (response.ok) {
                setRedesInteligentes(prev => prev.map(r => (r.codigo === codigo ? redeEditada : r)));
                setIsEditing(null);
            } else {
                console.error("Erro ao editar rede inteligente");
            }
        } catch (error) {
            console.error("Erro ao editar rede inteligente:", error);
        }
    };

    const handleDelete = async (codigo: number) => {
        try {
            const response = await fetch(`http://localhost:8080/consultar/redeInteligente/${codigo}`, {
                method: "DELETE",
            });
            if (response.ok) {
                setRedesInteligentes(prev => prev.filter(r => r.codigo !== codigo));
                if (isEditing === codigo) {
                    setIsEditing(null);
                }
            } else {
                console.error("Erro ao excluir rede inteligente");
            }
        } catch (error) {
            console.error("Erro ao excluir rede inteligente:", error);
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h1 className="bg-gradient-to-l from-green-500 via-green-500 to-green-500 text-transparent bg-clip-text text-[40px] text-center mb-8">Redes Inteligentes</h1>
            <table className="min-w-full bg-gray-100 border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4 border border-gray-300">Código</th>
                        <th className="py-2 px-4 border border-gray-300">Nome</th>
                        <th className="py-2 px-4 border border-gray-300">Eficiência de Distribuição</th>
                        <th className="py-2 px-4 border border-gray-300">Perda de Energia</th>
                        <th className="py-2 px-4 border border-gray-300">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {redesInteligentes.map(rede => (
                        <tr key={rede.codigo} className="rede-row">
                            <td className="py-2 px-4 border border-gray-300">{rede.codigo}</td>
                            <td className="py-2 px-4 border border-gray-300">
                                {isEditing === rede.codigo ? (
                                    <input
                                        type="text"
                                        value={rede.nome}
                                        onChange={e =>
                                            setRedesInteligentes(
                                                redesInteligentes.map(r =>
                                                    r.codigo === rede.codigo
                                                        ? { ...r, nome: e.target.value }
                                                        : r
                                                )
                                            )
                                        }
                                        className="py-2 px-4 border border-gray-300 rounded-lg"
                                    />
                                ) : (
                                    rede.nome
                                )}
                            </td>
                            <td className="py-2 px-4 border border-gray-300">
                                {isEditing === rede.codigo ? (
                                    <input
                                        type="number"
                                        value={rede.eficienciaDistribuicao}
                                        onChange={e =>
                                            setRedesInteligentes(
                                                redesInteligentes.map(r =>
                                                    r.codigo === rede.codigo
                                                        ? { ...r, eficienciaDistribuicao: Number(e.target.value) }
                                                        : r
                                                )
                                            )
                                        }
                                        className="py-2 px-4 border border-gray-300 rounded-lg"
                                    />
                                ) : (
                                    rede.eficienciaDistribuicao
                                )}
                            </td>
                            <td className="py-2 px-4 border border-gray-300">
                                {isEditing === rede.codigo ? (
                                    <input
                                        type="number"
                                        value={rede.perdaEnergia}
                                        onChange={e =>
                                            setRedesInteligentes(
                                                redesInteligentes.map(r =>
                                                    r.codigo === rede.codigo
                                                        ? { ...r, perdaEnergia: Number(e.target.value) }
                                                        : r
                                                )
                                            )
                                        }
                                        className="py-2 px-4 border border-gray-300 rounded-lg"
                                    />
                                ) : (
                                    rede.perdaEnergia
                                )}
                            </td>
                            <td className="py-2 px-4 border border-gray-300">
                                {isEditing === rede.codigo ? (
                                    <button onClick={() => handleSave(rede.codigo)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg">
                                        Salvar
                                    </button>
                                ) : (
                                    <button onClick={() => handleEdit(rede.codigo)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-lg">
                                        Editar
                                    </button>
                                )}
                                <button onClick={() => handleDelete(rede.codigo)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg">
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2 className="rede-add-title">Adicionar Nova Rede Inteligente</h2>
            <div className="rede-add-form">
                <input
                    type="text"
                    placeholder="Nome"
                    value={newRede.nome}
                    onChange={e => setNewRede({ ...newRede, nome: e.target.value })}
                    className="py-2 px-4 border border-gray-300 rounded-lg"
                />
                <input
                    type="number"
                    placeholder="Eficiência de Distribuição"
                    value={newRede.eficienciaDistribuicao}
                    onChange={e => setNewRede({ ...newRede, eficienciaDistribuicao: Number(e.target.value) })}
                    className="py-2 px-4 border border-gray-300 rounded-lg"
                />
                <input
                    type="number"
                    placeholder="Perda de Energia"
                    value={newRede.perdaEnergia}
                    onChange={e => setNewRede({ ...newRede, perdaEnergia: Number(e.target.value) })}
                    className="py-2 px-4 border border-gray-300 rounded-lg"
                />
                <button onClick={handleAdd} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg">
                    Adicionar
                </button>
            </div>
        </div>
    );
}