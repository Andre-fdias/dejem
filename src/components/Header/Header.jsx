import React from 'react';
import { Clock, CheckCircle, AlertCircle, RefreshCw, AlertTriangle, Moon, Sun, Monitor } from 'lucide-react';
import './Header.css';

export function Header({ source, lastUpdate, isUpdating, refresh, theme, setTheme }) {
    
    let statusIcon = <CheckCircle size={14} className="text-success" />;
    let statusText = "Dados atualizados";
    let statusClass = "status-online";

    if (isUpdating) {
        statusIcon = <RefreshCw size={14} className="text-info animate-spin" />;
        statusText = "Atualizando dados...";
        statusClass = "status-updating";
    } else if (source === 'cache') {
        statusIcon = <AlertTriangle size={14} className="text-warning" />;
        statusText = "Exibindo dados armazenados";
        statusClass = "status-cache";
    } else if (source === 'error') {
        statusIcon = <AlertCircle size={14} className="text-danger" />;
        statusText = "Não foi possível atualizar";
        statusClass = "status-error";
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
        <header className="app-header">
            <div className="container header-container">
                <div className="header-brand">
                    <h1 className="text-h1 flex items-center gap-sm" style={{ letterSpacing: '-0.5px' }}>
                        <span role="img" aria-label="Police car">🚔</span> DEJEM <span style={{ color: 'var(--warning)' }}>2º SGB</span>
                    </h1>
                    <p className="text-subtitle" style={{ color: 'var(--info)' }}>DASHBOARD DE ESCALAS</p>
                </div>

                <div className="header-controls">
                    <div className={`status-indicator ${statusClass}`}>
                        {statusIcon}
                        <span className="text-label">{statusText}</span>
                        <div className="status-divider" />
                        <Clock size={14} className="text-muted" />
                        <span className="text-label">{formatDateTime(lastUpdate)}</span>
                    </div>

                    <button className="icon-button" onClick={refresh} disabled={isUpdating} title="Atualizar dados">
                        <RefreshCw size={18} className={isUpdating ? "animate-spin" : ""} />
                    </button>
                    
                    <div className="theme-toggle">
                        <button className={`icon-button ${theme === 'light' ? 'active' : ''}`} onClick={() => setTheme('light')} title="Claro">
                            <Sun size={18} />
                        </button>
                        <button className={`icon-button ${theme === 'dark' ? 'active' : ''}`} onClick={() => setTheme('dark')} title="Escuro">
                            <Moon size={18} />
                        </button>
                        <button className={`icon-button ${theme === 'system' ? 'active' : ''}`} onClick={() => setTheme('system')} title="Sistema">
                            <Monitor size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
