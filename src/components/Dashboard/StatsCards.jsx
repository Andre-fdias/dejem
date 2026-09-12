import React from 'react';
import './Dashboard.css';

export function StatsCards({ escalas }) {
    const totalEscalas = escalas.length;
    const vagasAbertas = escalas.reduce((acc, curr) => acc + (curr.vagasEmAberto || 0), 0);
    const postosUnicos = new Set(escalas.map(e => e.posto).filter(Boolean)).size;
    const militaresUnicos = new Set(escalas.map(e => e.re).filter(Boolean)).size;

    return (
        <div className="stats-grid animate-fade">
            <div className="stat-card">
                <span className="stat-label">ESCALAS</span>
                <span className="stat-value">{totalEscalas}</span>
            </div>
            <div className="stat-card">
                <span className="stat-label">VAGAS</span>
                <span className="stat-value text-info">{vagasAbertas}</span>
            </div>
            <div className="stat-card">
                <span className="stat-label">POSTOS</span>
                <span className="stat-value">{postosUnicos}</span>
            </div>
            <div className="stat-card">
                <span className="stat-label">MILITARES</span>
                <span className="stat-value">{militaresUnicos}</span>
            </div>
        </div>
    );
}
