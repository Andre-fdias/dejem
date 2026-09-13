import React from 'react';
import { X, Calendar, Clock, MapPin, Building, Users } from 'lucide-react';

export function EscalaDetailsModal({ escala, onClose }) {
    if (!escala) return null;

    const militares = escala.militares || [];
    const hasMilitares = militares.length > 0;
    
    const statusClass = hasMilitares 
        ? "text-success bg-success/10 border-success/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]" 
        : "text-warning bg-warning/10 border-warning/30 shadow-[0_0_15px_rgba(250,204,21,0.2)]";
    const statusLabel = hasMilitares ? "ESCALADO" : "NÃO SORTEADO";

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade" onClick={onClose}>
            <div 
                className="bg-surface border border-border w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-slide-up"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="bg-surface-elevated border-b border-border p-5 flex items-center justify-between sticky top-0 z-10">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-xl font-black text-text-primary tracking-tight">
                            ESCALA <span className="text-accent opacity-90">#{escala.id || 'N/A'}</span>
                        </h2>
                        <div className={`w-fit flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${statusClass}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${hasMilitares ? 'bg-success' : 'bg-warning'} animate-pulse`} />
                            {statusLabel}
                        </div>
                    </div>
                    <button 
                        className="w-10 h-10 rounded-full bg-surface hover:bg-surface-hover border border-border flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
                        onClick={onClose}
                    >
                        <X size={20} />
                    </button>
                </div>
                
                {/* Body (Scrollable) */}
                <div className="p-6 overflow-y-auto flex flex-col gap-8">
                    
                    {/* Top Row: Period & Location */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2 text-accent">
                                <Calendar size={16} />
                                <h4 className="text-xs font-bold uppercase tracking-widest text-text-primary">Período</h4>
                            </div>
                            <div className="bg-background/50 border border-white/5 rounded-xl p-4 flex flex-col gap-2">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-text-muted">Início:</span>
                                    <span className="font-semibold text-text-primary">{escala.dataInicio || '-'} • {escala.horaInicio || '-'}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm border-t border-white/5 pt-2">
                                    <span className="text-text-muted">Término:</span>
                                    <span className="font-semibold text-text-primary">{escala.dataTermino || '-'} • {escala.horaTermino || '-'}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2 text-accent">
                                <MapPin size={16} />
                                <h4 className="text-xs font-bold uppercase tracking-widest text-text-primary">Localização</h4>
                            </div>
                            <div className="bg-background/50 border border-white/5 rounded-xl p-4 flex flex-col gap-2">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-text-muted">Posto:</span>
                                    <span className="font-bold text-text-primary text-right max-w-[180px] truncate" title={escala.posto}>{escala.posto || '-'}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm border-t border-white/5 pt-2">
                                    <span className="text-text-muted">AISP:</span>
                                    <span className="font-semibold text-text-primary">{escala.aisp || '-'}</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Organization Row */}
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2 text-accent">
                            <Building size={16} />
                            <h4 className="text-xs font-bold uppercase tracking-widest text-text-primary">Organização</h4>
                        </div>
                        <div className="bg-background/50 border border-white/5 rounded-xl p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex flex-col gap-1">
                                <span className="text-[11px] text-text-muted uppercase">Unidade</span>
                                <span className="font-semibold text-text-primary">{escala.unidade || '-'}</span>
                            </div>
                            <div className="flex flex-col gap-1 border-l border-white/5 pl-4">
                                <span className="text-[11px] text-text-muted uppercase">SGB</span>
                                <span className="font-semibold text-text-primary">{escala.sgb || '-'}</span>
                            </div>
                            <div className="flex flex-col gap-1 border-l border-white/5 pl-4">
                                <span className="text-[11px] text-text-muted uppercase">Tipo de Escala</span>
                                <span className="font-bold text-warning">{escala.tipoEscala || '-'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Military Array */}
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2 text-warning">
                            <Users size={16} />
                            <h4 className="text-xs font-bold uppercase tracking-widest text-text-primary">
                                {militares.length > 1 ? 'Militares Escalados' : 'Militar Escalado'} ({militares.length})
                            </h4>
                        </div>
                        
                        <div className="border border-warning/30 bg-warning/5 rounded-xl overflow-hidden flex flex-col">
                            {hasMilitares ? (
                                <div className="flex flex-col divide-y divide-warning/10">
                                    {militares.map((mil, idx) => (
                                        <div key={idx} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-2 hover:bg-warning/10 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <span className="font-bold text-sm text-text-primary">{mil.policialStr || mil.nome}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs">
                                                <span className="text-text-muted">RE:</span>
                                                <span className="font-mono bg-background/50 px-2 py-1 rounded text-text-secondary">{mil.re}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-8 flex flex-col items-center justify-center gap-3 text-text-muted">
                                    <Users size={32} className="opacity-20" />
                                    <span className="uppercase text-xs font-bold tracking-widest">Nenhum militar sorteado</span>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
                
            </div>
        </div>
    );
}
