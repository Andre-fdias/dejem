import React from 'react';
import { Clock, CheckCircle, AlertCircle, RefreshCw, AlertTriangle, Moon, Sun, Monitor } from 'lucide-react';

export function Header({ source, lastUpdate, isUpdating, refresh, theme, setTheme }) {
    
    let statusIcon = <CheckCircle size={14} className="text-success" />;
    let statusText = "Dados atualizados";
    let statusClass = "text-success bg-success/10 border-success/20";

    if (isUpdating) {
        statusIcon = <RefreshCw size={14} className="text-info animate-spin" />;
        statusText = "Atualizando dados...";
        statusClass = "text-info bg-info/10 border-info/20";
    } else if (source === 'cache') {
        statusIcon = <AlertTriangle size={14} className="text-warning" />;
        statusText = "Exibindo dados armazenados";
        statusClass = "text-warning bg-warning/10 border-warning/20";
    } else if (source === 'error') {
        statusIcon = <AlertCircle size={14} className="text-danger" />;
        statusText = "Não foi possível atualizar";
        statusClass = "text-danger bg-danger/10 border-danger/20";
    }

    const formatDateTime = (date) => {
        if (!date) return "--/--/---- • --:--";
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const monthNames = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];
        const month = monthNames[d.getMonth()];
        const year = d.getFullYear();
        const hrs = String(d.getHours()).padStart(2, '0');
        const mins = String(d.getMinutes()).padStart(2, '0');
        return `${day} ${month} ${year} • ${hrs}:${mins}`;
    };

    return (
        <header className="w-full bg-surface-elevated border-b border-border shadow-md sticky top-0 z-50">
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                
                {/* Brand */}
                <div className="flex flex-col justify-center">
                    <h1 className="text-xl md:text-2xl font-black text-text-primary tracking-tight flex items-center gap-2">
                        <span role="img" aria-label="Fire engine">🚒</span> 
                        DEJEM <span className="text-warning drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]">2º SGB</span>
                    </h1>
                    <p className="text-[10px] md:text-xs font-bold text-text-primary/70 tracking-widest uppercase">
                        Dashboard de Escalas
                    </p>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-3 md:gap-5">
                    
                    {/* Status Badge */}
                    <div className="hidden md:flex items-center h-8 rounded-full border bg-surface/50 px-3 gap-3 shadow-inner">
                        <div className={`flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider ${statusClass} px-2 py-0.5 rounded-full border`}>
                            {statusIcon}
                            <span>{statusText}</span>
                        </div>
                        <div className="w-px h-4 bg-border" />
                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-text-primary/80 tracking-widest">
                            <Clock size={13} className="text-text-muted" />
                            <span>{formatDateTime(lastUpdate)}</span>
                        </div>
                    </div>

                    {/* Refresh Button */}
                    <button 
                        className="w-9 h-9 flex items-center justify-center rounded-full bg-surface hover:bg-surface-hover border border-border text-text-secondary hover:text-info transition-all shadow-sm" 
                        onClick={refresh} 
                        disabled={isUpdating} 
                        title="Atualizar dados"
                    >
                        <RefreshCw size={16} className={isUpdating ? "animate-spin" : ""} />
                    </button>
                    
                    {/* Theme Toggle */}
                    <div className="flex bg-surface rounded-full p-1 border border-border shadow-sm">
                        <button 
                            className={`w-7 h-7 flex items-center justify-center rounded-full transition-all ${theme === 'light' ? 'bg-surface-elevated text-info shadow-sm' : 'text-text-muted hover:text-text-primary'}`} 
                            onClick={() => setTheme('light')} 
                            title="Claro"
                        >
                            <Sun size={14} />
                        </button>
                        <button 
                            className={`w-7 h-7 flex items-center justify-center rounded-full transition-all ${theme === 'dark' ? 'bg-surface-elevated text-info shadow-sm' : 'text-text-muted hover:text-text-primary'}`} 
                            onClick={() => setTheme('dark')} 
                            title="Escuro"
                        >
                            <Moon size={14} />
                        </button>
                        <button 
                            className={`w-7 h-7 flex items-center justify-center rounded-full transition-all ${theme === 'system' ? 'bg-surface-elevated text-info shadow-sm' : 'text-text-muted hover:text-text-primary'}`} 
                            onClick={() => setTheme('system')} 
                            title="Sistema"
                        >
                            <Monitor size={14} />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
