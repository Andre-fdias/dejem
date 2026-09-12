import React from 'react';
import { EscalaCard } from './EscalaCard';
import './Escalas.css';

export function EscalasGrid({ escalas, onEscalaClick }) {
    return (
        <div className="escalas-grid animate-slide">
            {escalas.map(escala => (
                <EscalaCard 
                    key={escala.id || Math.random().toString()} 
                    escala={escala} 
                    onClick={onEscalaClick} 
                />
            ))}
        </div>
    );
}
