import React from 'react';
import { EscalaCard } from './EscalaCard';

export function EscalasGrid({ escalas, onEscalaClick }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
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
