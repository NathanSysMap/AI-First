import Header from "../components/Header";
import StatusSelect from "../components/StatusSelect";
import PedidoModal from "../components/PedidoModal";
import StatusTag from "../components/StatusTag";
import { useState } from "react";
import { ItemPedido } from "../components/PedidoModal";

export default function Pedidos() {
    const [modalOpen, setModalOpen] = useState(false);
    const [pedidoSelecionado, setPedidoSelecionado] = useState<{
        id: string;
        valor: string;
        itens: ItemPedido[];
    }>({
        id: "",
        valor: "",
        itens: [],
    });

    const abrirModal = () => {
        setPedidoSelecionado({
            id: "12345",
            valor: "R$ 375,00",
            itens: [
                { nome: "Camiseta", detalhes: "Tamanho: M", quantidade: 2, precoUnitario: "R$ 50,00", total: "R$ 100,00" },
                { nome: "Livro", quantidade: 1, precoUnitario: "R$ 30,00", total: "R$ 30,00" },
                { nome: "Café", quantidade: 3, precoUnitario: "R$ 15,00", total: "R$ 45,00" },
                { nome: "Curso", quantidade: 1, precoUnitario: "R$ 200,00", total: "R$ 200,00" },
            ],
        });
        setModalOpen(true);
    };

    const pedidosAndamento = [
        { id: "1001", valor: "R$ 150,00", data: "10/04/2024", cliente: "João Souza", hora: "14:30", detalhes: "2x Pizza", status: "Aberto" },
        { id: "1002", valor: "R$ 250,00", data: "10/04/2024", cliente: "Maria Oliveira", hora: "15:45", detalhes: "1x Combo", status: "Aberto" },
        { id: "1003", valor: "R$ 90,00", data: "11/04/2024", cliente: "Carlos Pereira", hora: "10:00", detalhes: "3x Pastel", status: "Aberto" },
    ];

    const pedidosEncerrados = [
        { id: "1001", valor: "R$ 300,00", data: "09/04/2024", cliente: "Ana Lima", hora: "09:20", detalhes: "Ver detalhes", status: "Recusado" },
        { id: "1002", valor: "R$ 120,00", data: "08/04/2024", cliente: "Pedro Santos", hora: "16:10", detalhes: "Ver detalhes", status: "Recusado" },
        { id: "1003", valor: "R$ 80,00", data: "07/04/2024", cliente: "Mariana Costa", hora: "11:45", detalhes: "Ver detalhes", status: "Suspenso" },
    ];

    return (
        <div style={{ background: "#0f172a", color: "#fff", minHeight: "100vh" }}>
            <Header />
            <div style={styles.container}>
                <h2>Pedidos em andamento</h2>
                <div style={styles.tableWrapper}>
                    <table style={styles.table}>
                        <thead style={{ backgroundColor: "#c5c9c6" }}>
                            <tr style={styles.tbRow}>
                                <th style={styles.tbCol}>ID</th>
                                <th style={styles.tbCol}>Valor</th>
                                <th style={styles.tbCol}>Data</th>
                                <th style={styles.tbCol}>Cliente</th>
                                <th style={styles.tbCol}>Hora</th>
                                <th style={styles.tbCol}>Detalhes</th>
                                <th style={styles.tbCol}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pedidosAndamento.map((p) => (
                                <tr style={styles.tbRow} key={p.id}>
                                    <td style={styles.tbCol}>{p.id}</td>
                                    <td style={styles.tbCol}>{p.valor}</td>
                                    <td style={styles.tbCol}>{p.data}</td>
                                    <td style={styles.tbCol}>{p.cliente}</td>
                                    <td style={styles.tbCol}>{p.hora}</td>
                                    <td style={styles.tbCol}><button onClick={() => abrirModal()}>Ver detalhes</button></td>
                                    <td style={styles.tbCol}><StatusSelect initial={p.status} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <h2 style={{ marginTop: "2rem" }}>Pedidos encerrados</h2>
                <div style={styles.tableWrapper}>
                    <table style={styles.table}>
                        <thead style={{ backgroundColor: "#c5c9c6" }}>
                            <tr style={styles.tbRow}>
                                <th style={styles.tbCol}>ID</th>
                                <th style={styles.tbCol}>Valor</th>
                                <th style={styles.tbCol}>Data</th>
                                <th style={styles.tbCol}>Cliente</th>
                                <th style={styles.tbCol}>Hora</th>
                                <th style={styles.tbCol}>Detalhes</th>
                                <th style={styles.tbCol}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pedidosEncerrados.map((p, i) => (
                                <tr style={styles.tbRow} key={i}>
                                    <td style={styles.tbCol}>{p.id}</td>
                                    <td style={styles.tbCol}>{p.valor}</td>
                                    <td style={styles.tbCol}>{p.data}</td>
                                    <td style={styles.tbCol}>{p.cliente}</td>
                                    <td style={styles.tbCol}>{p.hora}</td>
                                    <td style={styles.tbCol}><button onClick={() => abrirModal()}>Ver detalhes</button></td>
                                    <td style={styles.tbCol}><StatusTag status={p.status as any} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <PedidoModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                idPedido={pedidoSelecionado.id}
                valorPedido={pedidoSelecionado.valor}
                itens={pedidoSelecionado.itens}
            />
        </div>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        padding: "2rem",
        maxWidth: "100%",
        overflowX: "hidden",
    },
    tableWrapper: {
        overflowX: "auto",
        overflowY: "auto",
        maxWidth: "100%",
    },
    table: {
        minWidth: "900px",
        width: "100%",
        background: "#fff",
        color: "#000",
        borderCollapse: "collapse",
        borderRadius: "10px",
        marginTop: "1rem",
    },
    tbCol: {
        padding: "8px",
        borderRight: "1px solid #0d182c",
        whiteSpace: "nowrap",
    },
    tbRow: {
        borderBottom: "1px solid #0d182c",
        textAlign: "center"
    },
};
