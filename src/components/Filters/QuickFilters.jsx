import React from 'react';
import './Filters.css';

export function QuickFilters({ currentQuickDate, updateFilter }) {
    const filters = [
        { label: 'Hoje', value: 'hoje' },
        { label: 'Amanhã', value: 'amanha' },
        { label: 'Esta Semana', value: 'semana' },
        { label: 'Próximos 7 dias', value: '7dias' },
        { label: 'Este Mês', value: 'mes' }
    ];

    const handleClick = (value) => {
        if (currentQuickDate === value) {
            updateFilter('quickDate', '');
        } else {
            updateFilter('quickDate', value);
        }
    };

    return (
        <div className="quick-filters-scroll">
            <div className="quick-filters-container">
                {filters.map(f => (
                    <button
                        key={f.value}
                        className={`filter-chip ${currentQuickDate === f.value ? 'active' : ''}`}
                        onClick={() => handleClick(f.value)}
                    >
                        {f.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
