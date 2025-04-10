import { useState } from "react";

const statusOptions = [
  "Aberto",
  "Aceito",
  "Recusado",
  "Em Preparação",
  "Em Deslocamento",
  "Enviado",
];

export default function StatusSelect({ initial }: { initial: string }) {
  const [status, setStatus] = useState(initial);
  return (
    <select value={status} onChange={(e) => setStatus(e.target.value)}>
      {statusOptions.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}
