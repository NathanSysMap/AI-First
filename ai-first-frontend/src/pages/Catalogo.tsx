import Header from "../components/Header";
import { useState } from "react";

interface Produto {
    id: string;
    nome: string;
    descricao?: string;
    preco: string;
    unidade?: string;
    categoria?: string;
    subcategoria?: string;
    imagem_url?: string;
    estoque_disponivel?: number;
    ativo: boolean;
    tipo_produto: string;
    tags?: string[];
}

export default function Catalogo() {
    const [filtro, setFiltro] = useState("");

    const produtos: Produto[] = [
        {
            id: "1",
            nome: "Camiseta Básica",
            descricao: "100% algodão, tamanho M",
            preco: "R$ 50,00",
            unidade: "un",
            categoria: "Camisetas",
            subcategoria: "Regata",
            imagem_url: "https://via.placeholder.com/50",
            estoque_disponivel: 20,
            ativo: true,
            tipo_produto: "Produto",
            tags: ["algodão", "casual"],
        },
        {
            id: "2",
            nome: "Curso de Marketing",
            descricao: "Curso completo online",
            preco: "R$ 200,00",
            unidade: "—",
            categoria: "Cursos",
            subcategoria: "Marketing",
            estoque_disponivel: 0,
            ativo: true,
            tipo_produto: "Curso",
            tags: ["online", "certificado"],
        },
    ];

    const produtosFiltrados = produtos.filter(p =>
        p.nome.toLowerCase().includes(filtro.toLowerCase()) ||
        p.categoria?.toLowerCase().includes(filtro.toLowerCase())
    );

    return (
        <div style={{ background: "#0f172a", color: "#fff", minHeight: "100vh" }}>
            <Header />
            <div style={{ padding: "2rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                    <h2>Catálogo de Produtos</h2>
                    <div style={{ display: "flex", gap: "1rem" }}>
                        <input
                            type="text"
                            placeholder="Filtrar..."
                            value={filtro}
                            onChange={(e) => setFiltro(e.target.value)}
                            style={{ padding: "0.5rem", borderRadius: "8px", border: "1px solid #94a3b8" }}
                        />
                        <button style={styles.excelBtn}>Exportar para Excel</button>
                        <button style={styles.excelBtn}>Importar de Excel</button>
                    </div>
                </div>

                <div style={{ overflowX: "auto", overflowY: "auto", maxHeight: "500px" }}>
                    <table style={styles.table}>
                        <thead style={{ backgroundColor: "#c5c9c6" }}>
                            <tr style={styles.tbRow}>
                                <th style={styles.tbCol}>ID</th>
                                <th style={styles.tbCol}>Nome</th>
                                <th style={styles.tbCol}>Descrição</th>
                                <th style={styles.tbCol}>Preço</th>
                                <th style={styles.tbCol}>Unidade Medida</th>
                                <th style={styles.tbCol}>Categoria</th>
                                <th style={styles.tbCol}>Subcategoria</th>
                                <th style={styles.tbCol}>Imagem</th>
                                <th style={styles.tbCol}>Estoque</th>
                                <th style={styles.tbCol}>Ativo</th>
                                <th style={styles.tbCol}>Tipo</th>
                                <th style={styles.tbCol}>Tags</th>
                            </tr>
                        </thead>
                        <tbody>
                            {produtosFiltrados.map((p, i) => (
                                <tr style={styles.tbRow} key={i}>
                                    <td style={styles.tbCol}>{p.id}</td>
                                    <td style={styles.tbCol}>{p.nome}</td>
                                    <td style={styles.tbCol}>{p.descricao || "-"}</td>
                                    <td style={styles.tbCol}>{p.preco}</td>
                                    <td style={styles.tbCol}>{p.unidade || "-"}</td>
                                    <td style={styles.tbCol}>{p.categoria || "-"}</td>
                                    <td style={styles.tbCol}>{p.subcategoria || "-"}</td>
                                    <td style={styles.tbCol}>{p.imagem_url ? <img src={p.imagem_url} alt={p.nome} style={{ width: "40px" }} /> : "-"}</td>
                                    <td style={styles.tbCol}>{p.estoque_disponivel ?? "-"}</td>
                                    <td style={styles.tbCol}>{p.ativo ? "Sim" : "Não"}</td>
                                    <td style={styles.tbCol}>{p.tipo_produto}</td>
                                    <td style={styles.tbCol}>{p.tags?.join(", ") || "-"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

const styles: { [key: string]: React.CSSProperties } = {
    table: {
        width: "100%",
        background: "#fff",
        color: "#000",
        borderCollapse: "collapse",
        borderRadius: "10px",
        overflow: "hidden",
    },
    excelBtn: {
        backgroundColor: "#38bdf8",
        color: "#0f172a",
        border: "none",
        padding: "0.5rem 1rem",
        borderRadius: "8px",
        fontWeight: "bold",
        cursor: "pointer",
    },
    tbCol: {
        margin: "0",
        padding: "3px",
        borderRight: "1px solid #0d182c"
    },
    tbRow: {
        borderBottom: "1px solid #0d182c",
        textAlign: "center"
    }
};