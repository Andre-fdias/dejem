import React from 'react';
import { parseDateString, isExcluded } from '../../utils/normalizationUtils';
import { APP_CONFIG } from '../../config/constants';
import './Escalas.css';

export function EscalasTable({ escalas, onEscalaClick }) {
    if (escalas.length === 0) return null;

    return (
        <div className="table-container animate-fade">
            <table className="escalas-table">
                <thead>
                    <tr>
                        <th>Data / Hora</th>
                        <th>Posto / Unidade</th>
                        <th>Vagas / Abertas</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {escalas.map(escala => {
                        const excluido = isExcluded(escala);
                        let statusClass = "badge-success";
                        let statusLabel = "DISPONÍVEL";
                        
                        if (excluido) {
                            statusClass = "badge-danger";
                            statusLabel = "EXCLUÍDA";
                        } else if (escala.vagasEmAberto <= 0) {
                            statusClass = "badge-danger";
                            statusLabel = "ESGOTADA";
                        } else if (escala.vagasEmAberto <= APP_CONFIG.lowVacancyThreshold) {
                            statusClass = "badge-warning";
                            statusLabel = "ÚLTIMAS VAGAS";
                        }

                        const dateObj = parseDateString(escala.dataInicio);
                        const day = String(dateObj.getDate()).padStart(2, '0');
                        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
                        
                        return (
                            <tr 
                                key={escala.id || Math.random().toString()} 
                                onClick={() => onEscalaClick(escala)}
                                className={excluido ? 'excluida' : ''}
                            >
                                <td>
                                    <div className="table-cell-main">{day}/{month}/{dateObj.getFullYear()}</div>
                                    <div className="table-cell-sub">{escala.horaInicio} às {escala.horaTermino}</div>
                                </td>
                                <td>
                                    <div className="table-cell-main">{escala.posto || "Não informado"}</div>
                                    <div className="table-cell-sub">{escala.unidade} {escala.sgb}</div>
                                </td>
                                <td>
                                    <div className="table-cell-main">{String(escala.vagasPracas).padStart(2, '0')} totais</div>
                                    <div className={`table-cell-sub ${escala.vagasEmAberto > 0 ? 'text-success' : 'text-danger'}`}>
                                        {String(escala.vagasEmAberto).padStart(2, '0')} abertas
                                    </div>
                                </td>
                                <td>
                                    <div className={`badge ${statusClass}`}>
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
