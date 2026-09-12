import React from 'react';
import { AlertCircle } from 'lucide-react';
import './Common.css';

export function ErrorState({ message, onRetry }) {
    return (
        <div className="error-state animate-fade">
            <div className="error-icon">
                <AlertCircle size={48} className="text-danger" />
            </div>
            <h3 className="text-h2">Não foi possível atualizar os dados.</h3>
            <p className="text-body text-secondary" style={{ marginBottom: 24, textAlign: 'center' }}>
                {message || "Verifique sua conexão ou a disponibilidade da planilha."}
            </p>
            <button className="btn-primary" onClick={onRetry}>
                Tentar novamente
            </button>
        </div>
    );
}
