"use client";
import type { EnergiaGerada } from "@/types";
import { useEffect, useState } from "react";

export default function EnergiaGerada() {
    const [energiasGeradas, setEnergiasGeradas] = useState<EnergiaGerada[]>([]);
    const [isEditing, setIsEditing] = useState<number | null>(null);
    const [newEnergiaGerada, setNewEnergiaGerada] = useState<EnergiaGerada>({
        codigo: 0,
        quantidade: 0,
        tipoFonte: "",
        dataGeracao: new Date().toISOString().split("T")[0],
    });

    useEffect(() => {
        const fetchEnergiasGeradas = async () => {
            try {
                const response = await fetch("http://localhost:8080/consultar/energiaGerada");
                const data = await response.json();
                setEnergiasGeradas(data);
            } catch (error) {
                console.error("Erro ao buscar energias geradas:", error);
            }
        };

        fetchEnergiasGeradas();
    }, []);

    const handleAdd = async () => {
        try {
            const response = await fetch("http://localhost:8080/consultar/energiaGerada", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newEnergiaGerada),
            });
            if (response.ok) {
                const addedData = await response.json();
                setEnergiasGeradas((prev) => [...prev, addedData]);
                setNewEnergiaGerada({ codigo: 0, quantidade: 0, tipoFonte: "", dataGeracao: new Date().toISOString().split("T")[0] });
            } else {
                console.error("Erro ao adicionar energia gerada");
            }
        } catch (error) {
            console.error("Erro ao adicionar energia gerada:", error);
        }
    };

    const handleEdit = (codigo: number) => {
        setIsEditing(codigo);
    };

    const handleSave = async (codigo: number) => {
        const energiaEditada = energiasGeradas.find((e) => e.codigo === codigo);
        if (!energiaEditada) return;

        try {
            const response = await fetch(`http://localhost:8080/consultar/energiaGerada/${codigo}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(energiaEditada),
            });
            if (response.ok) {
                setEnergiasGeradas((prev) => prev.map((e) => (e.codigo === codigo ? energiaEditada : e)));
                setIsEditing(null);
            } else {
                console.error("Erro ao editar energia gerada");
            }
        } catch (error) {
            console.error("Erro ao editar energia gerada:", error);
        }
    };

    const handleDelete = async (codigo: number) => {
        try {
            const response = await fetch(`http://localhost:8080/consultar/energiaGerada/${codigo}`, {
                method: "DELETE",
            });
            if (response.ok) {
                setEnergiasGeradas((prev) => prev.filter((e) => e.codigo !== codigo));
                if (isEditing === codigo) {
                    setIsEditing(null);
                }
            } else {
                console.error("Erro ao excluir energia gerada");
            }
        } catch (error) {
            console.error("Erro ao excluir energia gerada:", error);
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h1 className="bg-gradient-to-l from-green-500 via-green-500 to-green-500 text-transparent bg-clip-text text-[40px] text-center mb-8">
                Energias Geradas
            </h1>
            <table className="min-w-full bg-gray-100 border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4 border border-gray-300">Código</th>
                        <th className="py-2 px-4 border border-gray-300">Quantidade</th>
                        <th className="py-2 px-4 border border-gray-300">Tipo Fonte</th>
                        <th className="py-2 px-4 border border-gray-300">Data Geração</th>
                        <th className="py-2 px-4 border border-gray-300">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {energiasGeradas.map((energia) => (
                        <tr key={energia.codigo}>
                            <td className="py-2 px-4 border border-gray-300">{energia.codigo}</td>
                            <td className="py-2 px-4 border border-gray-300">
                                {isEditing === energia.codigo ? (
                                    <input
                                        type="number"
                                        value={energia.quantidade}
                                        onChange={(e) =>
                                            setEnergiasGeradas((prev) =>
                                                prev.map((item) =>
                                                    item.codigo === energia.codigo
                                                        ? { ...item, quantidade: Number(e.target.value) }
                                                        : item
                                                )
                                            )
                                        }
                                        className="py-2 px-4 border border-gray-300 rounded-lg"
                                    />
                                ) : (
                                    energia.quantidade
                                )}
                            </td>
                            <td className="py-2 px-4 border border-gray-300">
                                {isEditing === energia.codigo ? (
                                    <input
                                        type="text"
                                        value={energia.tipoFonte}
                                        onChange={(e) =>
                                            setEnergiasGeradas((prev) =>
                                                prev.map((item) =>
                                                    item.codigo === energia.codigo ? { ...item, tipoFonte: e.target.value } : item
                                                )
                                            )
                                        }
                                        className="py-2 px-4 border border-gray-300 rounded-lg"
                                    />
                                ) : (
                                    energia.tipoFonte
                                )}
                            </td>
                            <td className="py-2 px-4 border border-gray-300">
                                {isEditing === energia.codigo ? (
                                    <input
                                        type="date"
                                        value={energia.dataGeracao}
                                        onChange={(e) =>
                                            setEnergiasGeradas((prev) =>
                                                prev.map((item) =>
                                                    item.codigo === energia.codigo ? { ...item, dataGeracao: e.target.value } : item
                                                )
                                            )
                                        }
                                        className="py-2 px-4 border border-gray-300 rounded-lg"
                                    />
                                ) : (
                                    energia.dataGeracao
                                )}
                            </td>
                            <td className="py-2 px-4 border border-gray-300">
                                {isEditing === energia.codigo ? (
                                    <button onClick={() => handleSave(energia.codigo)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg">
                                        Salvar
                                    </button>
                                ) : (
                                    <button onClick={() => handleEdit(energia.codigo)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-lg">
                                        Editar
                                    </button>
                                )}
                                <button onClick={() => handleDelete(energia.codigo)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg">
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2 className="text-lg font-bold mt-8 mb-4">Adicionar Nova Energia Gerada</h2>
            <div className="flex gap-4">
    <input
        type="number"
        placeholder="Quantidade"
        value={newEnergiaGerada.quantidade}
        onChange={(e) => setNewEnergiaGerada({ ...newEnergiaGerada, quantidade: Number(e.target.value) })}
        className="py-2 px-4 border border-gray-300 rounded-lg"
    />
    <input
        type="text"
        placeholder="Tipo Fonte"
        value={newEnergiaGerada.tipoFonte}
        onChange={(e) => setNewEnergiaGerada({ ...newEnergiaGerada, tipoFonte: e.target.value })}
        className="py-2 px-4 border border-gray-300 rounded-lg"
    />
    <input
        type="date"
        value={newEnergiaGerada.dataGeracao}
        onChange={(e) => setNewEnergiaGerada({ ...newEnergiaGerada, dataGeracao: e.target.value })}
        className="py-2 px-4 border border-gray-300 rounded-lg"
    />
    <button
        onClick={async () => {
            await handleAdd();
            window.location.reload(); 
        }}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
    >
        Adicionar
    </button>
</div>
        </div>
    );
}
