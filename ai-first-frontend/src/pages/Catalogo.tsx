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
      subcategoria: "Masculina",
      imagem_url: "data:image/jpeg;base64,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",
      estoque_disponivel: 20,
      ativo: true,
      tipo_produto: "Produto",
      tags: ["algodão", "casual"],
    },
    {
      id: "2",
      nome: "Calça Jeans Slim",
      descricao: "Modelagem moderna com elastano",
      preco: "R$ 120,00",
      unidade: "un",
      categoria: "Calças",
      subcategoria: "Masculina",
      imagem_url: "data:image/jpeg;base64,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",
      estoque_disponivel: 15,
      ativo: true,
      tipo_produto: "Produto",
      tags: ["jeans", "elastano"],
    },
    {
      id: "3",
      nome: "Jaqueta Corta-Vento",
      descricao: "Impermeável e leve para esportes",
      preco: "R$ 180,00",
      unidade: "un",
      categoria: "Jaquetas",
      subcategoria: "Esportiva",
      imagem_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtgmTkWAqu2gAwcWWC-Qpt03yaZ8tIKB-hGA&s",
      estoque_disponivel: 10,
      ativo: true,
      tipo_produto: "Produto",
      tags: ["impermeável", "esporte"],
    },
    {
      id: "4",
      nome: "Regata Fitness",
      descricao: "Tecido dry-fit respirável",
      preco: "R$ 35,00",
      unidade: "un",
      categoria: "Camisetas",
      subcategoria: "Feminina",
      imagem_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpkSOo9zH7o-wCVecT6ds2jk8GEIaV1PyC4g&s",
      estoque_disponivel: 25,
      ativo: true,
      tipo_produto: "Produto",
      tags: ["fitness", "dry-fit"],
    },
    {
      id: "5",
      nome: "Shorts Moletom",
      descricao: "Com bolso e cordão ajustável",
      preco: "R$ 45,00",
      unidade: "un",
      categoria: "Shorts",
      subcategoria: "Casual",
      imagem_url: "data:image/jpeg;base64,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",
      estoque_disponivel: 18,
      ativo: true,
      tipo_produto: "Produto",
      tags: ["moletom", "conforto"],
    },
  ];

  const produtosFiltrados = produtos.filter(
    (p) =>
      p.nome.toLowerCase().includes(filtro.toLowerCase()) ||
      p.categoria?.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div style={{ background: "#0f172a", color: "#fff", minHeight: "100vh" }}>
      <Header />
      <div style={{ padding: "2rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <h2>Catálogo de Produtos</h2>
          <div style={{ display: "flex", gap: "1rem" }}>
            <input
              type="text"
              placeholder="Filtrar..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              style={{
                padding: "0.5rem",
                borderRadius: "8px",
                border: "1px solid #94a3b8",
              }}
            />
            <button style={styles.excelBtn}>Exportar para Excel</button>
            <button style={styles.excelBtn}>Importar de Excel</button>
          </div>
        </div>

        <div
          style={{
            overflowX: "auto",
            overflowY: "auto",
            maxHeight: "500px",
            borderRadius: "10px",
          }}
        >
          <table style={styles.table}>
            <thead style={{ backgroundColor: "#c5c9c6" }}>
              <tr style={styles.tbRow}>
                <th style={styles.tbCol}>Imagem</th>
                <th style={styles.tbCol}>ID</th>
                <th style={styles.tbCol}>Nome</th>
                <th style={styles.tbCol}>Descrição</th>
                <th style={styles.tbCol}>Preço</th>
                <th style={styles.tbCol}>Unidade Medida</th>
                <th style={styles.tbCol}>Categoria</th>
                <th style={styles.tbCol}>Subcategoria</th>
                <th style={styles.tbCol}>Estoque</th>
                <th style={styles.tbCol}>Ativo</th>
                <th style={styles.tbCol}>Tipo</th>
                <th style={styles.tbCol}>Tags</th>
              </tr>
            </thead>
            <tbody>
              {produtosFiltrados.map((p, i) => (
                <tr style={styles.tbRow} key={i}>
                  <td style={styles.tbCol}>
                    {p.imagem_url ? (
                      <img
                        src={p.imagem_url}
                        alt={p.nome}
                        style={styles.thumb}
                      />
                    ) : (
                      "-"
                    )}
                  </td>
                  <td style={styles.tbCol}>{p.id}</td>
                  <td style={styles.tbCol}>{p.nome}</td>
                  <td style={styles.tbCol}>{p.descricao || "-"}</td>
                  <td style={styles.tbCol}>{p.preco}</td>
                  <td style={styles.tbCol}>{p.unidade || "-"}</td>
                  <td style={styles.tbCol}>{p.categoria || "-"}</td>
                  <td style={styles.tbCol}>{p.subcategoria || "-"}</td>
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
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  table: {
    width: "100%",
    minWidth: "900px",
    background: "#fff",
    color: "#000",
    borderCollapse: "collapse",
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
    padding: "8px",
    borderRight: "1px solid #0d182c",
    whiteSpace: "nowrap",
    textAlign: "center",
  },
  tbRow: {
    borderBottom: "1px solid #0d182c",
  },
  thumb: {
    width: "40px",
    height: "40px",
    objectFit: "cover",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
};
