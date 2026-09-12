import React from 'react';
import { Search } from 'lucide-react';
import './Common.css';

export function EmptyState({ onClear }) {
    return (
        <div className="empty-state animate-fade">
            <div className="empty-icon">
                <Search size={48} className="text-muted" />
            </div>
            <h3 className="text-h2">Nenhuma escala encontrada</h3>
            <p className="text-body text-secondary" style={{ marginBottom: 24, textAlign: 'center' }}>
                Não encontramos resultados com os filtros atuais.
            </p>
            <button className="btn-outline" onClick={onClear}>
                LIMPAR FILTROS
            </button>
        </div>
    );
}
