"use client";
import type { Feedback } from "@/types";
import { useEffect, useState } from "react";

export default function FeedbackPage() {
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
    const [isEditing, setIsEditing] = useState<number | null>(null);
    const [newFeedback, setNewFeedback] = useState<Feedback>({
        codigo: 0,
        comentario: "",
        nota: 0,
        dataFeedback: new Date().toISOString().split("T")[0], // Formato YYYY-MM-DD
    });

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await fetch("http://localhost:8080/consultar/feedback");
                const data = await response.json();
                setFeedbacks(data);
            } catch (error) {
                console.error("Erro ao buscar feedbacks:", error);
            }
        };

        fetchFeedbacks();
    }, []);

    const handleAdd = async () => {
        try {
            const response = await fetch("http://localhost:8080/consultar/feedback", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newFeedback),
            });
            if (response.ok) {
                await response.json(); 
                setNewFeedback({ codigo: 0, comentario: "", nota: 0, dataFeedback: new Date().toISOString().split("T")[0] });
                window.location.reload(); 
            } else {
                console.error("Erro ao adicionar feedback");
            }
        } catch (error) {
            console.error("Erro ao adicionar feedback:", error);
        }
    };

    const handleEdit = (codigo: number) => {
        setIsEditing(codigo);
    };

    const handleSave = async (codigo: number) => {
        const feedbackEditado = feedbacks.find(f => f.codigo === codigo);
        if (!feedbackEditado) return;

        try {
            // Apenas atualiza o comentário
            const response = await fetch(`http://localhost:8080/consultar/feedback/${codigo}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(feedbackEditado),
            });
            if (response.ok) {
                setFeedbacks(prev => prev.map(f => (f.codigo === codigo ? feedbackEditado : f)));
                setIsEditing(null);
            } else {
                console.error("Erro ao editar feedback");
            }
        } catch (error) {
            console.error("Erro ao editar feedback:", error);
        }
    };

    const handleDelete = async (codigo: number) => {
        try {
            const response = await fetch(`http://localhost:8080/consultar/feedback/${codigo}`, {
                method: "DELETE",
            });
            if (response.ok) {
                setFeedbacks(prev => prev.filter(f => f.codigo !== codigo));
                if (isEditing === codigo) {
                    setIsEditing(null);
                }
            } else {
                console.error("Erro ao excluir feedback");
            }
        } catch (error) {
            console.error("Erro ao excluir feedback:", error);
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h1 className="bg-gradient-to-l from-green-500 via-green-500 to-green-500 text-transparent bg-clip-text text-[40px] text-center mb-8">Feedbacks</h1>
            <table className="min-w-full bg-gray-100 border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4 border border-gray-300">Código</th>
                        <th className="py-2 px-4 border border-gray-300">Comentário</th>
                        <th className="py-2 px-4 border border-gray-300">Nota</th>
                        <th className="py-2 px-4 border border-gray-300">Data</th>
                        <th className="py-2 px-4 border border-gray-300">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {feedbacks.map(feedback => (
                        <tr key={feedback.codigo} className="feedback-row">
                            <td className="py-2 px-4 border border-gray-300">{feedback.codigo}</td>
                            <td className="py-2 px-4 border border-gray-300">
                                {isEditing === feedback.codigo ? (
                                    <input
                                        type="text"
                                        value={feedback.comentario}
                                        onChange={e =>
                                            setFeedbacks(
                                                feedbacks.map(f =>
                                                    f.codigo === feedback.codigo
                                                        ? { ...f, comentario: e.target.value }
                                                        : f
                                                )
                                            )
                                        }
                                        className="py-2 px-4 border border-gray-300 rounded-lg"
                                    />
                                ) : (
                                    feedback.comentario
                                )}
                            </td>
                            <td className="py-2 px-4 border border-gray-300">{feedback.nota}</td>
                            <td className="py-2 px-4 border border-gray-300">{feedback.dataFeedback}</td>
                            <td className="py-2 px-4 border border-gray-300">
                                {isEditing === feedback.codigo ? (
                                    <button onClick={() => handleSave(feedback.codigo)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg">
                                        Salvar
                                    </button>
                                ) : (
                                    <button onClick={() => handleEdit(feedback.codigo)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-lg">
                                        Editar
                                    </button>
                                )}
                                <button onClick={() => handleDelete(feedback.codigo)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg">
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2 className="feedback-add-title">Adicionar Novo Feedback</h2>
            <div className="feedback-add-form">
                <input
                    type="text"
                    placeholder="Comentário"
                    value={newFeedback.comentario}
                    onChange={e => setNewFeedback({ ...newFeedback, comentario: e.target.value })}
                    className="py-2 px-4 border border-gray-300 rounded-lg"
                />
                <input
                    type="number"
                    placeholder="Nota"
                    value={newFeedback.nota}
                    onChange={e => setNewFeedback({ ...newFeedback, nota: Number(e.target.value) })}
                    className="py-2 px-4 border border-gray-300 rounded-lg"
                />
                <input
                    type="date"
                    value={newFeedback.dataFeedback}
                    onChange={e => setNewFeedback({ ...newFeedback, dataFeedback: e.target.value })}
                    className="py-2 px-4 border border-gray-300 rounded-lg"
                />
                <button onClick={handleAdd} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg">
                    Adicionar
                </button>
            </div>
        </div>
    );
}