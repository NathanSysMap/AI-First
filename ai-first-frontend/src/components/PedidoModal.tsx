import React from "react";

export interface ItemPedido {
    nome: string;
    detalhes?: string;
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
                <h2 style={{ marginBottom: "1rem" }}>Detalhes do Pedido</h2>
                <hr style={{ borderColor: "#334155", marginBottom: "1rem" }} />

                <p style={{ marginBottom: "1rem" }}>
                    <strong>ID do pedido:</strong> {idPedido}
                </p>

                <p style={{ marginBottom: "1rem" }}>
                    <strong>Valor Total do pedido:</strong> {valorPedido}
                </p>

                <h3 style={{ marginBottom: "0.5rem" }}>Itens do Pedido</h3>

                <table style={styles.table}>
                    <thead>
                        <tr style={styles.tbRow}>
                            <th style={styles.tbCol}>Nome do Produto</th>
                            <th style={styles.tbCol}>Quantidade</th>
                            <th style={styles.tbCol}>Preço Unitário</th>
                            <th>Total do Item</th>
                        </tr>
                    </thead>
                    <tbody>
                        {itens.map((item, index) => (
                            <tr style={styles.tbRow} key={index}>
                                <td style={styles.tbCol}>
                                    {item.nome}
                                    {item.detalhes && (
                                        <div style={{ fontSize: "0.85rem", color: "#94a3b8" }}>
                                            {item.detalhes}
                                        </div>
                                    )}
                                </td>
                                <td style={styles.tbCol}>{item.quantidade}</td>
                                <td style={styles.tbCol}>{item.precoUnitario}</td>
                                <td>{item.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <button onClick={onClose} style={styles.button}>
                    Fechar
                </button>
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
        minWidth: "500px",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        marginBottom: "1.5rem",
        overflowX: "auto",
        overflowY: "auto"
    },
    button: {
        padding: "0.5rem 1.5rem",
        backgroundColor: "#18244c",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "1rem",
    },
    tbCol: {
        margin: "0",
        padding: "3px",
        borderRight: "1px solid #4f5250"
    },
    tbRow: {
        borderBottom: "1px solid #4f5250",
        textAlign: "center"
    }
};
