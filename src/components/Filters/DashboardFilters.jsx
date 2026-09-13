import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

export function DashboardFilters({ filters, updateFilter, filterOptions, clearFilters, onSearch }) {
    const [localFilters, setLocalFilters] = useState(filters);

    const handleLocalChange = (key, value) => {
        setLocalFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleSearch = () => {
        // Aplica os filtros locais no hook principal e dispara o evento de busca
        Object.keys(localFilters).forEach(key => {
            updateFilter(key, localFilters[key]);
        });
        if (onSearch) onSearch();
    };

    const handleClear = () => {
        clearFilters();
        setLocalFilters({
            id: '',
            dataInicial: '',
            dataFinal: '',
            posto: '',
            re: ''
        });
    };

    return (
        <div className="w-full bg-surface-elevated/40 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
                
                {/* ID */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider">ID</label>
                    <input 
                        type="text" 
                        placeholder="Ex: 8604016" 
                        value={localFilters.searchQuery || ''}
                        onChange={(e) => handleLocalChange('searchQuery', e.target.value)}
                        className="w-full bg-background/50 border border-border rounded-lg p-2 text-xs text-text-primary focus:border-info focus:ring-1 focus:ring-info transition-all"
                    />
                </div>

                {/* Data Inicial e Final (Mesclados visualmente) */}
                <div className="flex flex-col gap-1.5 lg:col-span-2">
                    <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider text-nowrap truncate overflow-hidden">Por Data (Início — Fim)</label>
                    <div className="flex gap-2">
                        <input 
                            type="date" 
                            value={localFilters.dataInicial || ''}
                            onChange={(e) => handleLocalChange('dataInicial', e.target.value)}
                            className="w-full bg-background/50 border border-border rounded-lg p-1.5 text-xs text-text-primary focus:border-info focus:ring-1 focus:ring-info transition-all"
                            style={{ paddingRight: 4, paddingLeft: 8 }}
                        />
                        <input 
                            type="date" 
                            value={localFilters.dataFinal || ''}
                            onChange={(e) => handleLocalChange('dataFinal', e.target.value)}
                            className="w-full bg-background/50 border border-border rounded-lg p-1.5 text-xs text-text-primary focus:border-info focus:ring-1 focus:ring-info transition-all"
                            style={{ paddingRight: 4, paddingLeft: 8 }}
                        />
                    </div>
                </div>

                {/* Local */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Por Local</label>
                    <select 
                        value={localFilters.posto || ''}
                        onChange={(e) => handleLocalChange('posto', e.target.value)}
                        className="w-full bg-background/50 border border-border rounded-lg p-2 text-xs text-text-primary focus:border-info focus:ring-1 focus:ring-info transition-all"
                    >
                        <option value="">— Selecione —</option>
                        {filterOptions?.postos?.map(posto => (
                            <option key={posto} value={posto}>{posto}</option>
                        ))}
                    </select>
                </div>

                {/* RE */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Por RE</label>
                    <input 
                        type="text" 
                        placeholder="Ex: 108248" 
                        value={localFilters.re || ''}
                        onChange={(e) => handleLocalChange('re', e.target.value)}
                        className="w-full bg-background/50 border border-border rounded-lg p-2 text-xs text-text-primary focus:border-info focus:ring-1 focus:ring-info transition-all"
                    />
                </div>

                {/* Botões */}
                <div className="flex items-center gap-2 h-[34px]">
                    <button 
                        onClick={handleSearch}
                        className="flex-1 h-full bg-success/20 text-success border border-success/30 hover:bg-success hover:text-white rounded-lg flex items-center justify-center font-bold text-xs transition-all shadow-[0_0_15px_rgba(16,185,129,0.15)] hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                    >
                        Pesquisar
                    </button>
                    <button 
                        onClick={handleClear}
                        className="h-full px-3 bg-danger/10 text-danger border border-danger/30 hover:bg-danger hover:text-white rounded-lg flex items-center justify-center font-bold text-xs transition-all shadow-[0_0_15px_rgba(244,63,94,0.1)] hover:shadow-[0_0_20px_rgba(244,63,94,0.3)]"
                        title="Limpar filtros"
                    >
                        Limpar
                    </button>
                </div>
                
            </div>
        </div>
    );
}
