import { useState, useMemo } from 'react';
import { applyFilters, sortEscalas } from '../utils/filtersUtils';

const initialFilters = {
    searchQuery: '',
    quickDate: '', 
    dataInicial: '',
    dataFinal: '',
    aisp: '',
    posto: '',
    unidade: '',
    sgb: '',
    tipoEscala: '',
    re: '',
    nome: '',
    graduacao: '',
    situacao: 'ativas', 
    mesOrigem: ''
};

export function useFilters(rawEscalas) {
    const [filters, setFilters] = useState(initialFilters);

    const updateFilter = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const clearFilters = () => {
        setFilters(initialFilters);
    };

    const filteredAndSorted = useMemo(() => {
        const filtered = applyFilters(rawEscalas, filters);
        return sortEscalas(filtered);
    }, [rawEscalas, filters]);

    const filterOptions = useMemo(() => {
        const options = {
            postos: new Set(),
            unidades: new Set(),
            sgbs: new Set(),
            tiposEscala: new Set(),
            aisps: new Set(),
            mesesOrigem: new Set()
        };

        rawEscalas.forEach(item => {
            if (item.posto) options.postos.add(item.posto);
            if (item.unidade) options.unidades.add(item.unidade);
            
            if (item.sgb && (!filters.unidade || item.unidade === filters.unidade)) {
                options.sgbs.add(item.sgb);
            }
            if (item.tipoEscala) options.tiposEscala.add(item.tipoEscala);
            if (item.aisp) options.aisps.add(item.aisp);
            if (item.mesOrigem) options.mesesOrigem.add(item.mesOrigem);
        });

        return {
            postos: Array.from(options.postos).sort(),
            unidades: Array.from(options.unidades).sort(),
            sgbs: Array.from(options.sgbs).sort(),
            tiposEscala: Array.from(options.tiposEscala).sort(),
            aisps: Array.from(options.aisps).sort(),
            mesesOrigem: Array.from(options.mesesOrigem).sort(),
        };
    }, [rawEscalas, filters.unidade]);

    return {
        filters,
        updateFilter,
        clearFilters,
        filteredEscalas: filteredAndSorted,
        filterOptions
    };
}
