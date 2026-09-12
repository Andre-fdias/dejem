import React, { useState } from 'react';
import { Settings2, X } from 'lucide-react';
import { SearchableSelect } from './SearchableSelect';
import './Filters.css';

export function AdvancedFilters({ filters, updateFilter, filterOptions, clearFilters }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="advanced-filters-wrapper">
            <button className="btn-advanced-filters" onClick={() => setIsOpen(!isOpen)}>
                <Settings2 size={18} />
                Filtros avançados
            </button>

            {isOpen && (
                <>
                    <div className="filters-backdrop animate-fade" onClick={() => setIsOpen(false)} />
                    <div className="advanced-filters-panel animate-slide">
                        <div className="panel-header">
                            <h3 className="text-h2">Filtros avançados</h3>
                            <button className="icon-button" onClick={() => setIsOpen(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        
                        <div className="panel-content">
                            <div className="filter-section">
                                <h4 className="text-label">Período</h4>
                                <div className="filter-grid">
                                    <input 
                                        type="date" 
                                        value={filters.dataInicial} 
                                        onChange={(e) => updateFilter('dataInicial', e.target.value)} 
                                        title="Data Inicial"
                                    />
                                    <input 
                                        type="date" 
                                        value={filters.dataFinal} 
                                        onChange={(e) => updateFilter('dataFinal', e.target.value)} 
                                        title="Data Final"
                                    />
                                </div>
                            </div>

                            <div className="filter-section">
                                <h4 className="text-label">Localização</h4>
                                <div className="filter-grid">
                                    <SearchableSelect 
                                        options={filterOptions.postos}
                                        value={filters.posto}
                                        onChange={(val) => updateFilter('posto', val)}
                                        placeholder="Selecione um Posto"
                                    />
                                    <SearchableSelect 
                                        options={filterOptions.aisps}
                                        value={filters.aisp}
                                        onChange={(val) => updateFilter('aisp', val)}
                                        placeholder="Selecione uma AISP"
                                    />
                                </div>
                            </div>

                            <div className="filter-section">
                                <h4 className="text-label">Organização</h4>
                                <div className="filter-grid">
                                    <SearchableSelect 
                                        options={filterOptions.unidades}
                                        value={filters.unidade}
                                        onChange={(val) => {
                                            updateFilter('unidade', val);
                                            updateFilter('sgb', ''); // clear sgb when unidade changes
                                        }}
                                        placeholder="Unidade"
                                    />
                                    <SearchableSelect 
                                        options={filterOptions.sgbs}
                                        value={filters.sgb}
                                        onChange={(val) => updateFilter('sgb', val)}
                                        placeholder="SGB"
                                    />
                                </div>
                            </div>

                            <div className="filter-section">
                                <h4 className="text-label">Situação</h4>
                                <select 
                                    value={filters.situacao} 
                                    onChange={(e) => updateFilter('situacao', e.target.value)}
                                >
                                    <option value="ativas">Escalas Ativas</option>
                                    <option value="excluidas">Escalas Excluídas</option>
                                    <option value="todas">Todas</option>
                                </select>
                            </div>
                        </div>

                        <div className="panel-footer">
                            <button className="btn-clear" onClick={clearFilters}>Limpar</button>
                            <button className="btn-apply" onClick={() => setIsOpen(false)}>Aplicar</button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
