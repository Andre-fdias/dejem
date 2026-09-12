export function normalizeRow(row) {
    if (!row) return null;
    return {
        id: row["ID"] ?? "",
        dataInicio: row["Data Início"] ?? "",
        horaInicio: row["Hora Início"] ?? "",
        dataTermino: row["Data Término"] ?? "",
        horaTermino: row["Hora Término"] ?? "",
        aisp: row["AISP"] ?? "",
        posto: row["Posto"] ?? "",
        unidade: row["Unidade"] ?? "",
        sgb: row["SGB"] ?? "",
        tipoEscala: row["Tipo de Escala"] ?? "",
        re: row["RE"] ?? "",
        nome: row["Nome"] ?? "",
        graduacao: row["Graduação"] ?? "",
        vagasPracas: Number(row["Vagas Praças"]) || 0,
        vagasEmAberto: Number(row["Vagas em Aberto"]) || 0,
        escalaExcluida: row["Escala Excluída"] ?? "",
        mesOrigem: row["Mês/Origem"] ?? ""
    };
}

export function isExcluded(escala) {
    if (!escala || !escala.escalaExcluida) return false;
    const val = escala.escalaExcluida.toString().trim().toUpperCase();
    return val === "SIM" || val === "S" || val === "TRUE" || val === "EXCLUÍDA" || val === "EXCLUIDA";
}

export function parseDateString(dateStr, timeStr) {
    if (!dateStr) return new Date(0);
    const parts = dateStr.split('/');
    if (parts.length === 3) {
        const [day, month, year] = parts;
        let d = new Date(year, month - 1, day);
        if (timeStr) {
            const timeParts = timeStr.split(':');
            if (timeParts.length >= 2) {
                d.setHours(parseInt(timeParts[0], 10), parseInt(timeParts[1], 10), 0, 0);
            }
        }
        return d;
    }
    return new Date(dateStr);
}
