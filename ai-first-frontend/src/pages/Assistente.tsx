import Header from "../components/Header";
import { useState } from "react";

interface Arquivo {
    id: number;
    nome: string;
}

export default function MeuAssistente() {
    const [nomeAssistente, setNomeAssistente] = useState("");
    const [prompt, setPrompt] = useState("");
    const [arquivos, setArquivos] = useState<Arquivo[]>([
        { id: 1, nome: "Manual_de_Produtos.pdf" },
        { id: 2, nome: "Regras_de_Negócio.txt" },
    ]);

    const handleUpload = () => {
        // lógica de upload
        alert("Upload iniciado (simulação)");
    };

    const handleDelete = (id: number) => {
        setArquivos(arquivos.filter((arq) => arq.id !== id));
    };

    return (
        <div style={{ background: "#0f172a", color: "#fff", minHeight: "100vh" }}>
            <Header />
            <div style={{ padding: "2rem" }}>
                <h2>Meu Assistente</h2>

                <div style={{ marginTop: "2rem", display: "flex", gap: "2rem", flexWrap: "wrap" }}>
                    <div style={{ flex: 1, minWidth: "300px" }}>
                        <label>Nome do Assistente</label>
                        <input
                            type="text"
                            value={nomeAssistente}
                            onChange={(e) => setNomeAssistente(e.target.value)}
                            placeholder="Digite o nome do assistente"
                            style={styles.input}
                        />

                        <label style={{ marginTop: "1rem", display: "block" }}>Arquivos para a Base de Conhecimento</label>
                        <button onClick={handleUpload} style={styles.uploadBtn}>Upload</button>

                        <ul style={{ marginTop: "0.5rem" }}>
                            {arquivos.map((arq) => (
                                <li key={arq.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.5rem 0" }}>
                                    <span>{arq.nome}</span>
                                    <button onClick={() => handleDelete(arq.id)} style={styles.deleteBtn}>Excluir</button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div style={{ flex: 2, minWidth: "400px" }}>
                        <label>Prompt do Assistente</label>
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Descreva o comportamento desejado para seu assistente de IA..."
                            style={styles.textarea}
                            rows={12}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    input: {
        width: "100%",
        padding: "0.5rem",
        borderRadius: "8px",
        border: "1px solid #94a3b8",
        background: "#1e293b",
        color: "#fff",
        marginTop: "0.25rem",
    },
    uploadBtn: {
        backgroundColor: "#38bdf8",
        color: "#0f172a",
        border: "none",
        padding: "0.5rem 1rem",
        borderRadius: "8px",
        fontWeight: "bold",
        marginTop: "0.5rem",
        cursor: "pointer",
    },
    deleteBtn: {
        backgroundColor: "#ef4444",
        color: "#fff",
        border: "none",
        padding: "0.25rem 0.75rem",
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "0.85rem",
    },
    textarea: {
        width: "100%",
        padding: "0.75rem",
        borderRadius: "8px",
        border: "1px solid #94a3b8",
        background: "#1e293b",
        color: "#fff",
        marginTop: "0.25rem",
        fontFamily: "inherit",
        fontSize: "1rem",
    },
};