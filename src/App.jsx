import React, { useState, useEffect } from 'react';
import { LayoutGrid, List } from 'lucide-react';
import { useEscalas } from './hooks/useEscalas';
import { useFilters } from './hooks/useFilters';
import { useTheme } from './hooks/useTheme';

import { Header } from './components/Header/Header';
import { GlobalSearch } from './components/Search/GlobalSearch';
import { QuickFilters } from './components/Filters/QuickFilters';
import { AdvancedFilters } from './components/Filters/AdvancedFilters';
import { StatsCards } from './components/Dashboard/StatsCards';
import { EscalasGrid } from './components/Escalas/EscalasGrid';
import { EscalasTable } from './components/Escalas/EscalasTable';
import { EscalaDetailsModal } from './components/Escalas/EscalaDetailsModal';
import { LoadingSkeleton } from './components/Common/LoadingSkeleton';
import { EmptyState } from './components/Common/EmptyState';
import { ErrorState } from './components/Common/ErrorState';

import './styles/globals.css';

export default function App() {
    const { data: rawEscalas, loading, error, source, lastUpdate, isUpdating, refresh } = useEscalas();
    const { filters, updateFilter, clearFilters, filteredEscalas, filterOptions } = useFilters(rawEscalas);
    const [theme, setTheme] = useTheme();

    const [viewMode, setViewMode] = useState(() => localStorage.getItem('dejem_viewMode') || 'cards');
    const [selectedEscala, setSelectedEscala] = useState(null);

    useEffect(() => {
        localStorage.setItem('dejem_viewMode', viewMode);
    }, [viewMode]);

    return (
        <div className="app-layout">
            <Header 
                source={source} 
                lastUpdate={lastUpdate} 
                isUpdating={isUpdating} 
                refresh={refresh} 
                theme={theme}
                setTheme={setTheme}
            />

            <main className="container pb-12">
                <div style={{
                    backgroundColor: 'rgba(250, 204, 21, 0.1)',
                    border: '1px solid var(--warning)',
                    borderRadius: 'var(--radius-md)',
                    padding: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    marginTop: '24px',
                    marginBottom: '24px'
                }}>
                    <span style={{ fontSize: '24px' }}>⚠️</span>
                    <div>
                        <h4 style={{ color: 'var(--warning)', fontWeight: 700, margin: 0, textTransform: 'uppercase', fontSize: '14px' }}>
                            Atenção militares
                        </h4>
                        <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '14px' }}>
                            É OBRIGATÓRIO A CONFERÊNCIA DA ESCALA NO SISTEMA DE ESCALAS DA PMESP (SGE).
                        </p>
                    </div>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '16px',
                    marginBottom: '24px',
                    background: 'var(--surface)',
                    padding: '16px',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border)'
                }}>
                    <GlobalSearch onSearch={(val) => updateFilter('searchQuery', val)} />
                    <QuickFilters currentQuickDate={filters.quickDate} updateFilter={updateFilter} />
                    <AdvancedFilters 
                        filters={filters} 
                        updateFilter={updateFilter} 
                        filterOptions={filterOptions} 
                        clearFilters={clearFilters} 
                    />
                </div>

                {!loading && !error && (
                    <StatsCards escalas={filteredEscalas} />
                )}

                <div className="results-header flex justify-between items-center mb-6">
                    <h2 className="text-subtitle">
                        ESCALAS ENCONTRADAS <br/> 
                        <span className="text-primary font-bold" style={{fontSize: 20}}>{filteredEscalas.length}</span> resultados
                    </h2>
                    
                    <div className="view-toggle">
                        <button 
                            className={`icon-button ${viewMode === 'cards' ? 'active' : ''}`}
                            onClick={() => setViewMode('cards')}
                            title="Cards"
                        >
                            <LayoutGrid size={18} />
                        </button>
                        <button 
                            className={`icon-button ${viewMode === 'table' ? 'active' : ''}`}
                            onClick={() => setViewMode('table')}
                            title="Tabela"
                        >
                            <List size={18} />
                        </button>
                    </div>
                </div>

                {loading && <LoadingSkeleton />}
                
                {error && <ErrorState message={error} onRetry={refresh} />}

                {!loading && !error && filteredEscalas.length === 0 && (
                    <EmptyState onClear={clearFilters} />
                )}

                {!loading && !error && filteredEscalas.length > 0 && (
                    <>
                        {viewMode === 'cards' ? (
                            <EscalasGrid escalas={filteredEscalas} onEscalaClick={setSelectedEscala} />
                        ) : (
                            <EscalasTable escalas={filteredEscalas} onEscalaClick={setSelectedEscala} />
                        )}
                    </>
                )}
            </main>

            {selectedEscala && (
                <EscalaDetailsModal 
                    escala={selectedEscala} 
                    onClose={() => setSelectedEscala(null)} 
                />
            )}
        </div>
    );
}
