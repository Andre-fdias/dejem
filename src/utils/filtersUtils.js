import { parseDateString, isExcluded } from './normalizationUtils';

export function applyFilters(data, filters) {
    if (!data || data.length === 0) return [];

    let filtered = [...data];

    // Global Search
    if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        filtered = filtered.filter(item => {
            return (
                (item.id && item.id.toLowerCase().includes(query)) ||
                (item.posto && item.posto.toLowerCase().includes(query)) ||
                (item.unidade && item.unidade.toLowerCase().includes(query)) ||
                (item.sgb && item.sgb.toLowerCase().includes(query)) ||
                (item.re && item.re.toLowerCase().includes(query)) ||
                (item.nome && item.nome.toLowerCase().includes(query)) ||
                (item.graduacao && item.graduacao.toLowerCase().includes(query)) ||
                (item.tipoEscala && item.tipoEscala.toLowerCase().includes(query))
            );
        });
    }

    // Quick Date Filters
    if (filters.quickDate) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        filtered = filtered.filter(item => {
            const itemDate = parseDateString(item.dataInicio);
            if (!itemDate || isNaN(itemDate.getTime())) return false;
            
            const diffTime = itemDate.getTime() - today.getTime();
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

            switch (filters.quickDate) {
                case 'hoje': return diffDays === 0;
                case 'amanha': return diffDays === 1;
                case 'semana': return diffDays >= 0 && diffDays <= 7;
                case '7dias': return diffDays >= 0 && diffDays <= 7;
                case 'mes': 
                    return itemDate.getMonth() === today.getMonth() && itemDate.getFullYear() === today.getFullYear();
                default: return true;
            }
        });
    }

    // Advanced Filters
    if (filters.dataInicial) {
        const start = new Date(filters.dataInicial + 'T00:00:00');
        filtered = filtered.filter(item => parseDateString(item.dataInicio) >= start);
    }
    if (filters.dataFinal) {
        const end = new Date(filters.dataFinal + 'T23:59:59');
        filtered = filtered.filter(item => parseDateString(item.dataInicio) <= end);
    }

    if (filters.aisp) filtered = filtered.filter(item => item.aisp === filters.aisp);
    if (filters.posto) filtered = filtered.filter(item => item.posto === filters.posto);
    if (filters.unidade) filtered = filtered.filter(item => item.unidade === filters.unidade);
    if (filters.sgb) filtered = filtered.filter(item => item.sgb === filters.sgb);
    if (filters.tipoEscala) filtered = filtered.filter(item => item.tipoEscala === filters.tipoEscala);
    if (filters.re) filtered = filtered.filter(item => item.re === filters.re);
    if (filters.nome) filtered = filtered.filter(item => item.nome === filters.nome);
    if (filters.graduacao) filtered = filtered.filter(item => item.graduacao === filters.graduacao);
    
    // Situação
    if (filters.situacao === 'ativas') {
        filtered = filtered.filter(item => !isExcluded(item));
    } else if (filters.situacao === 'excluidas') {
        filtered = filtered.filter(item => isExcluded(item));
    }

    if (filters.mesOrigem) filtered = filtered.filter(item => item.mesOrigem === filters.mesOrigem);

    return filtered;
}

export function sortEscalas(data) {
    return [...data].sort((a, b) => {
        const dateA = parseDateString(a.dataInicio, a.horaInicio);
        const dateB = parseDateString(b.dataInicio, b.horaInicio);
        return dateA.getTime() - dateB.getTime();
    });
}
