import React, { useState, useEffect } from 'react';
import { LayoutGrid, List, AlertTriangle } from 'lucide-react';
import { useEscalas } from './hooks/useEscalas';
import { useFilters } from './hooks/useFilters';
import { useTheme } from './hooks/useTheme';

import { Header } from './components/Header/Header';
import { DashboardFilters } from './components/Filters/DashboardFilters';
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
    const [hasSearched, setHasSearched] = useState(false);

    useEffect(() => {
        localStorage.setItem('dejem_viewMode', viewMode);
    }, [viewMode]);

    return (
        <div className="min-h-screen bg-background text-text-primary font-sans selection:bg-info/30 transition-colors duration-300">
            <Header 
                source={source} 
                lastUpdate={lastUpdate} 
                isUpdating={isUpdating} 
                refresh={refresh} 
                theme={theme}
                setTheme={setTheme}
            />

            <main className="w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 flex flex-col gap-8">
                
                {/* Search / Filters Bar */}
                <DashboardFilters 
                    filters={filters}
                    updateFilter={updateFilter}
                    clearFilters={() => {
                        clearFilters();
                        setHasSearched(false);
                    }}
                    filterOptions={filterOptions}
                    onSearch={() => setHasSearched(true)}
                />

                {!hasSearched ? (
                    /* Initial Warning Banner */
                    <div className="mt-4 border border-warning/50 rounded-xl bg-warning/10 overflow-hidden shadow-[0_0_30px_rgba(250,204,21,0.05)] backdrop-blur-sm">
                        <div className="flex items-center gap-2 bg-warning/20 px-4 py-2 border-b border-warning/30">
                            <AlertTriangle size={18} className="text-warning" />
                            <h4 className="text-warning font-bold text-sm tracking-wide uppercase">
                                Atenção militares :
                            </h4>
                        </div>
                        <div className="p-5 flex flex-col gap-3 text-sm text-text-primary/90 leading-relaxed font-medium">
                            <p className="bg-info/20 text-info px-3 py-1.5 rounded inline-block w-fit">
                                Consulte o SISTEMA DEJEM, com pelo menos 24 horas de antecedência, para verificar se você está na escala.
                            </p>
                            <p className="bg-info/20 text-info px-3 py-1.5 rounded inline-block w-fit">
                                Essa é a única forma oficial de consulta e de resguardo da responsabilidade administrativa em caso de atraso e/ou falta ao serviço.
                            </p>
                            <p className="bg-info/20 text-info px-3 py-1.5 rounded inline-block w-fit">
                                Os demais avisos ou controles da Administração não substituem a necessidade de tal verificação no sistema.
                            </p>
                        </div>
                    </div>
                ) : (
                    /* Search Results Area */
                    <div className="flex flex-col gap-6 animate-fade">
                        {!loading && !error && (
                            <StatsCards escalas={filteredEscalas} />
                        )}

                        <div className="flex justify-between items-end border-b border-white/10 pb-4">
                            <h2 className="text-xs font-bold text-text-muted uppercase tracking-widest">
                                Escalas Encontradas <br/> 
                                <span className="text-xl font-black text-primary mt-1 block text-text-primary">
                                    {filteredEscalas.length} <span className="text-xs font-medium text-text-secondary normal-case tracking-normal">resultados</span>
                                </span>
                            </h2>
                            
                            <div className="flex bg-surface-elevated rounded-lg p-1 border border-border">
                                <button 
                                    className={`w-9 h-9 rounded-md flex items-center justify-center transition-all ${viewMode === 'cards' ? 'bg-surface-hover text-info shadow-sm' : 'text-text-secondary hover:text-text-primary'}`}
                                    onClick={() => setViewMode('cards')}
                                    title="Visualização em Cards"
                                >
                                    <LayoutGrid size={18} />
                                </button>
                                <button 
                                    className={`w-9 h-9 rounded-md flex items-center justify-center transition-all ${viewMode === 'table' ? 'bg-surface-hover text-info shadow-sm' : 'text-text-secondary hover:text-text-primary'}`}
                                    onClick={() => setViewMode('table')}
                                    title="Visualização em Tabela"
                                >
                                    <List size={18} />
                                </button>
                            </div>
                        </div>

                        {loading && <LoadingSkeleton />}
                        
                        {error && <ErrorState message={error} onRetry={refresh} />}

                        {!loading && !error && filteredEscalas.length === 0 && (
                            <EmptyState onClear={() => {
                                clearFilters();
                                setHasSearched(false);
                            }} />
                        )}

                        {!loading && !error && filteredEscalas.length > 0 && (
                            <div className="mt-2">
                                {viewMode === 'cards' ? (
                                    <EscalasGrid escalas={filteredEscalas} onEscalaClick={setSelectedEscala} />
                                ) : (
                                    <EscalasTable escalas={filteredEscalas} onEscalaClick={setSelectedEscala} />
                                )}
                            </div>
                        )}
                    </div>
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
