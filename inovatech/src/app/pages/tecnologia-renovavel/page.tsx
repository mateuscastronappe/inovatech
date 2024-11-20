"use client";
import type { TecnologiaRenovavel } from "@/types";
import { useEffect, useState } from "react";

export default function TecnologiaRenovavelPage() {
    const [tecnologias, setTecnologias] = useState<TecnologiaRenovavel[]>([]);
    const [isEditing, setIsEditing] = useState<number | null>(null);
    const [newTecnologia, setNewTecnologia] = useState<TecnologiaRenovavel>({
        codigo: 0,
        nome: "",
        tipoFonte: "",
        eficiencia: 0,
        custoProducao: 0,
    });

    useEffect(() => {
        const fetchTecnologias = async () => {
            try {
                const response = await fetch("http://localhost:8080/consultar/tecnologiaRenovavel");
                const data = await response.json();
                setTecnologias(data);
            } catch (error) {
                console.error("Erro ao buscar tecnologias renováveis:", error);
            }
        };

        fetchTecnologias();
    }, []);

    const handleAdd = async () => {
        try {
            const response = await fetch("http://localhost:8080/consultar/tecnologiaRenovavel", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTecnologia),
            });
            if (response.ok) {
                await response.json();
                setNewTecnologia({ codigo: 0, nome: "", tipoFonte: "", eficiencia: 0, custoProducao: 0 });
                window.location.reload();
            } else {
                console.error("Erro ao adicionar tecnologia renovável");
            }
        } catch (error) {
            console.error("Erro ao adicionar tecnologia renovável:", error);
        }
    };

    const handleEdit = (codigo: number) => {
        setIsEditing(codigo);
    };

    const handleSave = async (codigo: number) => {
        const tecnologiaEditada = tecnologias.find(t => t.codigo === codigo);
        if (!tecnologiaEditada) return;

        try {
            const response = await fetch(`http://localhost:8080/consultar/tecnologiaRenovavel/${codigo}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(tecnologiaEditada),
            });
            if (response.ok) {
                setTecnologias(prev => prev.map(t => (t.codigo === codigo ? tecnologiaEditada : t)));
                setIsEditing(null);
            } else {
                console.error("Erro ao editar tecnologia renovável");
            }
        } catch (error) {
            console.error("Erro ao editar tecnologia renovável:", error);
        }
    };

    const handleDelete = async (codigo: number) => {
        try {
            const response = await fetch(`http://localhost:8080/consultar/tecnologiaRenovavel/${codigo}`, {
                method: "DELETE",
            });
            if (response.ok) {
                setTecnologias(prev => prev.filter(t => t.codigo !== codigo));
                if (isEditing === codigo) {
                    setIsEditing(null);
                }
            } else {
                console.error("Erro ao excluir tecnologia renovável");
            }
        } catch (error) {
            console.error("Erro ao excluir tecnologia renovável:", error);
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h1 className="bg-gradient-to-l from-green-500 via-green-500 to-green-500 text-transparent bg-clip-text text-[40px] text-center mb-8">Tecnologias Renováveis</h1>
            <table className="min-w-full bg-gray-100 border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4 border border-gray-300">Código</th>
                        <th className="py-2 px-4 border border-gray-300">Nome</th>
                        <th className="py-2 px-4 border border-gray-300">Tipo de Fonte</th>
                        <th className="py-2 px-4 border border-gray-300">Eficiência</th>
                        <th className="py-2 px-4 border border-gray-300">Custo de Produção</th>
                        <th className="py-2 px-4 border border-gray-300">Ações </th>
                    </tr>
                </thead>
                <tbody>
                    {tecnologias.map(tecnologia => (
                        <tr key={tecnologia.codigo} className="tecnologia-row">
                            <td className="py-2 px-4 border border-gray-300">{tecnologia.codigo}</td>
                            <td className="py-2 px-4 border border-gray-300">
                                {isEditing === tecnologia.codigo ? (
                                    <input
                                        type="text"
                                        value={tecnologia.nome}
                                        onChange={e =>
                                            setTecnologias(
                                                tecnologias.map(t =>
                                                    t.codigo === tecnologia.codigo
                                                        ? { ...t, nome: e.target.value }
                                                        : t
                                                )
                                            )
                                        }
                                        className="py-2 px-4 border border-gray-300 rounded-lg"
                                    />
                                ) : (
                                    tecnologia.nome
                                )}
                            </td>
                            <td className="py-2 px-4 border border-gray-300">
                                {isEditing === tecnologia.codigo ? (
                                    <input
                                        type="text"
                                        value={tecnologia.tipoFonte}
                                        onChange={e =>
                                            setTecnologias(
                                                tecnologias.map(t =>
                                                    t.codigo === tecnologia.codigo
                                                        ? { ...t, tipoFonte: e.target.value }
                                                        : t
                                                )
                                            )
                                        }
                                        className="py-2 px-4 border border-gray-300 rounded-lg"
                                    />
                                ) : (
                                    tecnologia.tipoFonte
                                )}
                            </td>
                            <td className="py-2 px-4 border border-gray-300">
                                {isEditing === tecnologia.codigo ? (
                                    <input
                                        type="number"
                                        value={tecnologia.eficiencia}
                                        onChange={e =>
                                            setTecnologias(
                                                tecnologias.map(t =>
                                                    t.codigo === tecnologia.codigo
                                                        ? { ...t, eficiencia: Number(e.target.value) }
                                                        : t
                                                )
                                            )
                                        }
                                        className="py-2 px-4 border border-gray-300 rounded-lg"
                                    />
                                ) : (
                                    tecnologia.eficiencia
                                )}
                            </td>
                            <td className="py-2 px-4 border border-gray-300">
                                {isEditing === tecnologia.codigo ? (
                                    <input
                                        type="number"
                                        value={tecnologia.custoProducao}
                                        onChange={e =>
                                            setTecnologias(
                                                tecnologias.map(t =>
                                                    t.codigo === tecnologia.codigo
                                                        ? { ...t, custoProducao: Number(e.target.value) }
                                                        : t
                                                )
                                            )
                                        }
                                        className="py-2 px-4 border border-gray-300 rounded-lg"
                                    />
                                ) : (
                                    tecnologia.custoProducao
                                )}
                            </td>
                            <td className="py-2 px-4 border border-gray-300">
                                {isEditing === tecnologia.codigo ? (
                                    <button onClick={() => handleSave(tecnologia.codigo)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg">
                                        Salvar
                                    </button>
                                ) : (
                                    <button onClick={() => handleEdit(tecnologia.codigo)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-lg">
                                        Editar
                                    </button>
                                )}
                                <button onClick={() => handleDelete(tecnologia.codigo)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg">
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2 className="tecnologia-add-title">Adicionar Nova Tecnologia Renovável</h2>
            <div className="tecnologia-add-form">
                <input
                    type="text"
                    placeholder="Nome"
                    value={newTecnologia.nome}
                    onChange={e => setNewTecnologia({ ...newTecnologia, nome: e.target.value })}
                    className="py-2 px-4 border border-gray-300 rounded-lg"
                />
                <input
                    type="text"
                    placeholder="Tipo de Fonte"
                    value={newTecnologia.tipoFonte}
                    onChange={e => setNewTecnologia({ ...newTecnologia, tipoFonte: e.target.value })}
                    className="py-2 px-4 border border-gray-300 rounded-lg"
                />
                <input
                    type="number"
                    placeholder="Eficiência"
                    value={newTecnologia.eficiencia}
                    onChange={e => setNewTecnologia({ ...newTecnologia, eficiencia: Number(e.target.value) })}
                    className="py-2 px-4 border border-gray-300 rounded-lg"
                />
                <input
                    type="number"
                    placeholder="Custo de Produção"
                    value={newTecnologia.custoProducao}
                    onChange={e => setNewTecnologia({ ...newTecnologia, custoProducao: Number(e.target.value) })}
                    className="py-2 px-4 border border-gray-300 rounded-lg"
                />
                <button onClick={handleAdd} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg">
                    Adicionar
                </button>
            </div>
        </div>
    );
}