"use client";
import type { Monitoramento } from "@/types";
import { useEffect, useState } from "react";

export default function MonitoramentoPage() {
    const [monitoramentos, setMonitoramentos] = useState<Monitoramento[]>([]);
    const [isEditing, setIsEditing] = useState<number | null>(null);
    const [newMonitoramento, setNewMonitoramento] = useState<Monitoramento>({
        codigo: 0,
        nomeDaFonte: "",
        status: "",
        energiaGerada: 0,
        observacao: "",
    });

    useEffect(() => {
        const fetchMonitoramentos = async () => {
            try {
                const response = await fetch("http://localhost:8080/consultar/monitoramento");
                const data = await response.json();
                setMonitoramentos(data);
            } catch (error) {
                console.error("Erro ao buscar monitoramentos:", error);
            }
        };

        fetchMonitoramentos();
    }, []);

    const handleAdd = async () => {
        try {
            const response = await fetch("http://localhost:8080/consultar/monitoramento", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newMonitoramento),
            });
            if (response.ok) {
                await response.json();
                setNewMonitoramento({ codigo: 0, nomeDaFonte: "", status: "", energiaGerada: 0, observacao: "" });
                window.location.reload();
            } else {
                console.error("Erro ao adicionar monitoramento");
            }
        } catch (error) {
            console.error("Erro ao adicionar monitoramento:", error);
        }
    };

    const handleEdit = (codigo: number) => {
        setIsEditing(codigo);
    };

    const handleSave = async (codigo: number) => {
        const monitoramentoEditado = monitoramentos.find(m => m.codigo === codigo);
        if (!monitoramentoEditado) return;

        try {
            const response = await fetch(`http://localhost:8080/consultar/monitoramento/${codigo}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(monitoramentoEditado),
            });
            if (response.ok) {
                setMonitoramentos(prev => prev.map(m => (m.codigo === codigo ? monitoramentoEditado : m)));
                setIsEditing(null);
            } else {
                console.error("Erro ao editar monitoramento");
            }
        } catch (error) {
            console.error("Erro ao editar monitoramento:", error);
        }
    };

    const handleDelete = async (codigo: number) => {
        try {
            const response = await fetch(`http://localhost:8080/consultar/monitoramento/${codigo}`, {
                method: "DELETE",
            });
            if (response.ok) {
                setMonitoramentos(prev => prev.filter(m => m.codigo !== codigo));
                if (isEditing === codigo) {
                    setIsEditing(null);
                }
            } else {
                console.error("Erro ao excluir monitoramento");
            }
        } catch (error) {
            console.error("Erro ao excluir monitoramento:", error);
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h1 className="bg-gradient-to-l from-green-500 via-green-500 to-green-500 text-transparent bg-clip-text text-[40px] text-center mb-8">Monitoramentos</h1>
            <table className="min-w-full bg-gray-100 border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4 border border-gray-300">Código</th>
                        <th className="py-2 px-4 border border-gray-300">Nome da Fonte</th>
                        <th className="py-2 px-4 border border-gray-300">Status</th>
                        <th className="py-2 px-4 border border-gray-300">Energia Gerada</th>
                        <th className="py-2 px-4 border border-gray-300">Observação</th>
                        <th className="py-2 px-4 border border-gray-300">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {monitoramentos.map(monitoramento => (
                        <tr key={monitoramento.codigo} className="monitoramento-row">
                            <td className="py-2 px-4 border border-gray-300">{monitoramento.codigo}</td>
                            <td className="py-2 px-4 border border-gray-300">
                                {isEditing === monitoramento.codigo ? (
                                    <input
                                        type="text"
                                        value={monitoramento.nomeDaFonte}
                                        onChange={e =>
                                            setMonitoramentos(
                                                monitoramentos.map(m =>
                                                    m.codigo === monitoramento.codigo
                                                        ? { ...m, nomeDaFonte: e.target.value }
                                                        : m
                                                )
                                            )
                                        }
                                        className="py-2 px-4 border border-gray-300 rounded-lg"
                                    />
                                ) : (
                                    monitoramento.nomeDaFonte
                                )}
                            </td>
                            <td className="py-2 px-4 border border-gray-300">
                                {isEditing === monitoramento.codigo ? (
                                    <input
                                        type="text"
                                        value={monitoramento.status}
                                        onChange={e =>
                                            setMonitoramentos(
                                                monitoramentos.map(m =>
                                                    m.codigo === monitoramento.codigo
                                                        ? { ...m, status: e.target.value }
                                                        : m
                                                )
                                            )
                                        }
                                        className="py-2 px-4 border border-gray-300 rounded-lg"
                                    />
                                ) : (
                                    monitoramento.status
                                )}
                            </td>
                            <td className="py-2 px-4 border border-gray-300">
                                {isEditing === monitoramento.codigo ? (
                                    <input
                                        type="number"
                                        value={monitoramento.energiaGerada}
                                        onChange={e =>
                                            setMonitoramentos(
                                                monitoramentos.map(m =>
                                                    m.codigo === monitoramento.codigo
                                                        ? { ...m, energiaGerada: Number(e.target.value) }
                                                        : m
                                                )
                                            )
                                        }
                                        className="py-2 px-4 border border-gray-300 rounded-lg"
                                    />
                                ) : (
                                    monitoramento.energiaGerada
                                )}
                            </td>
                            <td className="py-2 px-4 border border-gray-300">
                                {isEditing === monitoramento.codigo ? (
                                    <input
                                        type="text"
                                        value={monitoramento.observacao}
                                        onChange={e =>
                                            setMonitoramentos(
                                                monitoramentos.map(m =>
                                                    m.codigo === monitoramento.codigo
                                                        ? { ...m, observacao: e.target.value }
                                                        : m
                                                )
                                            )
                                        }
                                        className="py-2 px-4 border border-gray-300 rounded-lg"
                                    />
                                ) : (
                                    monitoramento.observacao
                                )}
                            </td>
                            <td className="py-2 px-4 border border-gray-300">
                                {isEditing === monitoramento.codigo ? (
                                    <button onClick={() => handleSave(monitoramento.codigo)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg">
                                        Salvar
                                    </button>
                                ) : (
                                    <button onClick={() => handleEdit(monitoramento.codigo)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-lg">
                                        Editar
                                    </button>
                                )}
                                <button onClick={() => handleDelete(monitoramento.codigo)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg">
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2 className="monitoramento-add-title">Adicionar Novo Monitoramento</h2>
            <div className="monitoramento-add-form">
                <input
                    type="text"
                    placeholder="Nome da Fonte"
                    value={newMonitoramento.nomeDaFonte}
                    onChange={e => setNewMonitoramento({ ...newMonitoramento, nomeDaFonte: e.target.value })}
                    className="py-2 px-4 border border-gray-300 rounded-lg"
                />
                <input
                    type="text"
                    placeholder="Status"
                    value={newMonitoramento.status}
                    onChange={e => setNewMonitoramento({ ...newMonitoramento, status: e.target.value })}
                    className="py-2 px-4 border border-gray-300 rounded-lg"
                />
                <input
                    type="number"
                    placeholder="Energia Gerada"
                    value={newMonitoramento.energiaGerada}
                    onChange={e => setNewMonitoramento({ ...newMonitoramento, energiaGerada: Number(e.target.value) })}
                    className="py-2 px-4 border border-gray-300 rounded-lg"
                />
                <input
                    type="text"
                    placeholder="Observação"
                    value={newMonitoramento.observacao}
                    onChange={e => setNewMonitoramento({ ...newMonitoramento, observacao: e.target.value })}
                    className="py-2 px-4 border border-gray-300 rounded-lg"
                />
                <button onClick={handleAdd} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg">
                    Adicionar
                </button>
            </div>
        </div>
    );
}