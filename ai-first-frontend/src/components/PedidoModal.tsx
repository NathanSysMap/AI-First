import React from "react";
import logo from "../assets/logo.png";

export interface ItemPedido {
    nome: string;
    detalhes?: string;
    imagemUrl?: string;
    quantidade: number;
    precoUnitario: string;
    total: string;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    idPedido: string;
    valorPedido: string;
    itens: ItemPedido[];
}

export default function PedidoModal({ isOpen, onClose, idPedido, valorPedido, itens }: Props) {
    if (!isOpen) return null;

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                    <img src={logo} alt="Logo" style={{ height: "40px" }} />
                </div>

                <h2 style={{ marginBottom: "1rem", textAlign: "center" }}>Detalhes do Pedido</h2>
                <hr style={{ borderColor: "#334155", marginBottom: "1rem" }} />

                <p style={{ marginBottom: "1rem" }}>
                    <strong>ID do pedido:</strong> {idPedido}
                </p>

                <p style={{ marginBottom: "1rem" }}>
                    <strong>Valor Total do pedido:</strong> {valorPedido}
                </p>

                <h3 style={{ marginBottom: "0.5rem" }}>Itens do Pedido</h3>

                <div style={{ overflowX: "auto", overflowY: "auto", maxHeight: "300px" }}>
                    <table style={styles.table}>
                        <thead>
                            <tr style={styles.headerRow}>
                                <th style={styles.headerCol}>Imagem</th>
                                <th style={styles.headerCol}>Nome do Produto</th>
                                <th style={styles.headerCol}>Quantidade</th>
                                <th style={styles.headerCol}>Preço Unitário</th>
                                <th style={styles.headerCol}>Total do Item</th>
                            </tr>
                        </thead>
                        <tbody>
                            {itens.map((item, index) => (
                                <tr style={styles.tbRow} key={index}>
                                    <td style={styles.tbCol}>
                                        <img src={item.imagemUrl || "/placeholder.png"} alt={item.nome} style={{ width: "40px", borderRadius: "4px" }} />
                                    </td>
                                    <td style={styles.tbCol}>
                                        <strong>{item.nome}</strong>
                                        {item.detalhes && (
                                            <div style={{ fontSize: "0.85rem", color: "#475569" }}>
                                                {item.detalhes}
                                            </div>
                                        )}
                                    </td>
                                    <td style={styles.tbCol}>{item.quantidade}</td>
                                    <td style={styles.tbCol}>{item.precoUnitario}</td>
                                    <td style={styles.tbCol}>{item.total}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div style={{ textAlign: "center" }}>
                    <button onClick={onClose} style={styles.button}>Fechar</button>
                </div>
            </div>
        </div>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    overlay: {
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
    },
    modal: {
        backgroundColor: "#111937",
        color: "#fff",
        padding: "2rem",
        borderRadius: "12px",
        minWidth: "600px",
        maxHeight: "80vh",
        overflow: "auto"
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        backgroundColor: "#fff",
        color: "#0f172a",
        borderRadius: "8px",
        minWidth: "700px"
    },
    headerRow: {
        backgroundColor: "#1e40af",
        color: "#fff",
        textAlign: "center",
    },
    headerCol: {
        padding: "8px",
    },
    tbRow: {
        borderBottom: "1px solid #e2e8f0",
        textAlign: "center"
    },
    tbCol: {
        padding: "10px",
    },
    button: {
        padding: "0.5rem 1.5rem",
        backgroundColor: "#38bdf8",
        color: "#0f172a",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "1rem",
        fontWeight: "bold",
        marginTop: "5px"
    },
};