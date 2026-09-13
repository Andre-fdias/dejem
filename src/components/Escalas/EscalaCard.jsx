import React from 'react';
import { MapPin, Clock } from 'lucide-react';
import { parseDateString } from '../../utils/normalizationUtils';

export function EscalaCard({ escala, onClick }) {
    const militares = escala.militares || [];
    const hasMilitares = militares.length > 0;
    
    // Status Logic
    const statusClass = hasMilitares 
        ? "text-success bg-success/10 border-success/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]" 
        : "text-warning bg-warning/10 border-warning/30 shadow-[0_0_10px_rgba(250,204,21,0.2)]";
    const statusLabel = hasMilitares ? "ESCALADO" : "NÃO SORTEADO";

    const dateObj = parseDateString(escala.dataInicio);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();

    return (
        <div 
            className="group relative flex flex-col glass glass-hover rounded-xl overflow-hidden cursor-pointer"
            onClick={() => onClick(escala)}
        >
            {/* Top Accent Line */}
            <div className={`h-1 w-full absolute top-0 left-0 ${hasMilitares ? 'bg-success' : 'bg-warning'}`} />
            
            {/* Header: ID & Date */}
            <div className="flex justify-between items-center px-5 py-4 border-b border-white/5 bg-background/30">
                <div className="text-[11px] font-black text-text-muted tracking-wider bg-surface-hover/50 px-2 py-0.5 rounded border border-white/5">
                    ID: {escala.id || '---'}
                </div>
                <div className="text-[11px] font-bold text-accent tracking-wider">
                    {day}/{month}/{year}
                </div>
            </div>

            {/* Body Info */}
            <div className="p-5 flex flex-col gap-3 min-h-[160px]">
                <div className="flex items-center gap-2 text-xs text-text-primary">
                    <MapPin size={14} className="text-accent" />
                    <span className="font-bold truncate text-sm">{escala.posto || "Não informado"}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-text-primary">
                    <Clock size={14} className="text-accent" />
                    <span className="font-semibold">{escala.horaInicio} às {escala.horaTermino}</span>
                </div>
                
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-bold text-text-muted tracking-wider">TIPO:</span>
                    <span className="text-[10px] font-bold text-text-primary bg-surface-elevated px-2 py-0.5 rounded border border-white/5 uppercase">
                        {escala.tipoEscala || 'DEJEM'}
                    </span>
                </div>

                {/* Military Box */}
                <div className="mt-3 border border-warning/40 bg-warning/5 rounded-lg overflow-hidden flex flex-col">
                    <div className="bg-warning/20 text-warning text-[10px] font-black tracking-widest text-center py-1 uppercase border-b border-warning/30">
                        {militares.length > 1 ? 'MILITARES ESCALADOS' : 'MILITAR ESCALADO'}
                    </div>
                    <div className="p-2 flex flex-col gap-1 max-h-[100px] overflow-y-auto">
                        {hasMilitares ? (
                            militares.map((mil, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-[11px] py-1 border-b border-white/5 last:border-0">
                                    <span className="font-semibold text-text-primary truncate">{mil.policialStr || mil.nome}</span>
                                </div>
                            ))
                        ) : (
                            <div className="text-[11px] font-medium text-text-muted text-center py-2 uppercase italic">
                                Escala sem militares
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer Status */}
            <div className="mt-auto px-5 py-4 border-t border-white/5 bg-background/40 flex items-center justify-between">
                <div className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border ${statusClass}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${hasMilitares ? 'bg-success' : 'bg-warning'} animate-pulse`} />
                    {statusLabel}
                </div>
                {/* Optional: Add a small arrow or view details icon here if we want */}
                <div className="text-[10px] font-bold text-text-muted group-hover:text-accent transition-colors">
                    DETALHES
                </div>
            </div>
        </div>
    );
}
