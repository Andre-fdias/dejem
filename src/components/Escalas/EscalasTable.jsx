import React from 'react';
import { parseDateString } from '../../utils/normalizationUtils';
import { Users } from 'lucide-react';

export function EscalasTable({ escalas, onEscalaClick }) {
    if (escalas.length === 0) return null;

    return (
        <div className="w-full overflow-x-auto bg-surface-elevated/40 backdrop-blur-md rounded-xl border border-white/10 shadow-lg animate-slide-up">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-surface-hover/50 border-b border-white/10">
                        <th className="px-4 py-3 text-xs font-bold text-text-muted uppercase tracking-wider">Data / Hora</th>
                        <th className="px-4 py-3 text-xs font-bold text-text-muted uppercase tracking-wider">Posto / Unidade</th>
                        <th className="px-4 py-3 text-xs font-bold text-text-muted uppercase tracking-wider">Militares</th>
                        <th className="px-4 py-3 text-xs font-bold text-text-muted uppercase tracking-wider">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {escalas.map(escala => {
                        const militares = escala.militares || [];
                        const hasMilitares = militares.length > 0;
                        
                        const statusClass = hasMilitares 
                            ? "text-success bg-success/10 border-success/30" 
                            : "text-warning bg-warning/10 border-warning/30";
                        const statusLabel = hasMilitares ? "ESCALADO" : "NÃO SORTEADO";

                        const dateObj = parseDateString(escala.dataInicio);
                        const day = String(dateObj.getDate()).padStart(2, '0');
                        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
                        
                        return (
                            <tr 
                                key={escala.id || Math.random().toString()} 
                                onClick={() => onEscalaClick(escala)}
                                className="hover:bg-white/5 transition-colors cursor-pointer group"
                            >
                                <td className="px-4 py-3 whitespace-nowrap">
                                    <div className="font-bold text-sm text-text-primary">{day}/{month}/{dateObj.getFullYear()}</div>
                                    <div className="text-xs text-info mt-0.5">{escala.horaInicio} às {escala.horaTermino}</div>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="font-bold text-sm text-text-primary max-w-[200px] truncate" title={escala.posto}>{escala.posto || "Não informado"}</div>
                                    <div className="text-xs text-text-muted mt-0.5">{escala.unidade} {escala.sgb}</div>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <Users size={14} className={hasMilitares ? 'text-warning' : 'text-text-muted opacity-50'} />
                                        <span className={`text-xs font-bold ${hasMilitares ? 'text-text-primary' : 'text-text-muted italic'}`}>
                                            {hasMilitares ? `${militares.length} alocado(s)` : 'Nenhum'}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                    <div className={`w-fit flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border ${statusClass}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${hasMilitares ? 'bg-success' : 'bg-warning'} animate-pulse`} />
                                        {statusLabel}
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
