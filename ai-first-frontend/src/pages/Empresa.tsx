import React, { useState } from "react";
import Header from "../components/Header";

interface Empresa {
    razaoSocial: string;
    nomeFantasia: string;
    cnpj: string;
    site?: string;
    ramo: string;
    telefone: string;
    emailComercial: string;
    whatsapp?: string;
    responsavel: string;
    emailResponsavel: string;
    endereco: {
        cep: string;
        logradouro: string;
        numero: string;
        complemento?: string;
        bairro: string;
        cidade: string;
        estado: string;
        pais: string;
    };
}

export default function Empresa() {
    const [empresa, setEmpresa] = useState<Empresa>({
        razaoSocial: "",
        nomeFantasia: "",
        cnpj: "",
        site: "",
        ramo: "",
        telefone: "",
        emailComercial: "",
        whatsapp: "",
        responsavel: "",
        emailResponsavel: "",
        endereco: {
            cep: "",
            logradouro: "",
            numero: "",
            complemento: "",
            bairro: "",
            cidade: "",
            estado: "",
            pais: "",
        },
    });

    const handleChange = (field: string, value: string) => {
        setEmpresa((prev) => ({ ...prev, [field]: value }));
    };

    const handleEnderecoChange = (field: string, value: string) => {
        setEmpresa((prev) => ({
            ...prev,
            endereco: { ...prev.endereco, [field]: value },
        }));
    };

    return (
        <div style={{ background: "#0f172a", color: "#fff", minHeight: "100vh" }}>
            <Header />
            <div style={styles.container}>
                <h2 style={styles.title}>Dados da Empresa</h2>

                <section style={styles.section}>
                    <h3>Dados Cadastrais</h3>
                    <div style={styles.grid}>
                        <input placeholder="Razão Social" value={empresa.razaoSocial} onChange={(e) => handleChange("razaoSocial", e.target.value)} style={styles.input} />
                        <input placeholder="Nome Fantasia" value={empresa.nomeFantasia} onChange={(e) => handleChange("nomeFantasia", e.target.value)} style={styles.input} />
                        <input placeholder="CNPJ" value={empresa.cnpj} onChange={(e) => handleChange("cnpj", e.target.value)} style={styles.input} />
                        <input placeholder="Site" value={empresa.site} onChange={(e) => handleChange("site", e.target.value)} style={styles.input} />
                        <input placeholder="Ramo de Atividade" value={empresa.ramo} onChange={(e) => handleChange("ramo", e.target.value)} style={styles.input} />
                    </div>
                </section>

                <section style={styles.section}>
                    <h3>Contato</h3>
                    <div style={styles.grid}>
                        <input placeholder="Telefone Comercial" value={empresa.telefone} onChange={(e) => handleChange("telefone", e.target.value)} style={styles.input} />
                        <input placeholder="E-mail Comercial" value={empresa.emailComercial} onChange={(e) => handleChange("emailComercial", e.target.value)} style={styles.input} />
                        <input placeholder="WhatsApp Comercial" value={empresa.whatsapp} onChange={(e) => handleChange("whatsapp", e.target.value)} style={styles.input} />
                        <input placeholder="Responsável Legal" value={empresa.responsavel} onChange={(e) => handleChange("responsavel", e.target.value)} style={styles.input} />
                        <input placeholder="E-mail do Responsável" value={empresa.emailResponsavel} onChange={(e) => handleChange("emailResponsavel", e.target.value)} style={styles.input} />
                    </div>
                </section>

                <section style={styles.section}>
                    <h3>Endereço da Matriz</h3>
                    <div style={styles.grid}>
                        <input placeholder="CEP" value={empresa.endereco.cep} onChange={(e) => handleEnderecoChange("cep", e.target.value)} style={styles.input} />
                        <input placeholder="Logradouro" value={empresa.endereco.logradouro} onChange={(e) => handleEnderecoChange("logradouro", e.target.value)} style={styles.input} />
                        <input placeholder="Número" value={empresa.endereco.numero} onChange={(e) => handleEnderecoChange("numero", e.target.value)} style={styles.input} />
                        <input placeholder="Complemento" value={empresa.endereco.complemento} onChange={(e) => handleEnderecoChange("complemento", e.target.value)} style={styles.input} />
                        <input placeholder="Bairro" value={empresa.endereco.bairro} onChange={(e) => handleEnderecoChange("bairro", e.target.value)} style={styles.input} />
                        <input placeholder="Cidade" value={empresa.endereco.cidade} onChange={(e) => handleEnderecoChange("cidade", e.target.value)} style={styles.input} />
                        <input placeholder="Estado (UF)" value={empresa.endereco.estado} onChange={(e) => handleEnderecoChange("estado", e.target.value)} style={styles.input} />
                        <input placeholder="País" value={empresa.endereco.pais} onChange={(e) => handleEnderecoChange("pais", e.target.value)} style={styles.input} />
                    </div>
                </section>

                <div style={{ textAlign: "center", marginTop: "2rem" }}>
                    <button style={styles.button}>Salvar Alterações</button>
                </div>
            </div>
        </div>

    );
}

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        padding: "2rem",
        backgroundColor: "#0f172a",
        color: "#fff",
        minHeight: "100vh",
        overflow: "hidden"
    },
    title: {
        fontSize: "1.8rem",
        marginBottom: "1.5rem",
        textAlign: "center",
    },
    section: {
        marginBottom: "2rem",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "1rem",
    },
    input: {
        padding: "0.75rem",
        borderRadius: "8px",
        border: "1px solid #94a3b8",
        backgroundColor: "#1e293b",
        color: "#fff",
    },
    button: {
        padding: "0.75rem 2rem",
        backgroundColor: "#38bdf8",
        color: "#0f172a",
        border: "none",
        borderRadius: "8px",
        fontSize: "1rem",
        fontWeight: "bold",
        cursor: "pointer",
    },
};