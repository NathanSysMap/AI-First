interface Props {
  status: "Recusado" | "Concluído" | "Suspenso";
}

export default function StatusTag({ status }: Props) {
  const colorMap: { [key in Props["status"]]: string } = {
    Recusado: "#dc2626",     // vermelho
    Concluído: "#16a34a",    // verde
    Suspenso: "#facc15",     // amarelo
  };

  return (
    <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <span
        style={{
          display: "inline-block",
          width: 10,
          height: 10,
          borderRadius: "50%",
          backgroundColor: colorMap[status],
        }}
      />
      {status}
    </span>
  );
}
