import React from 'react';
import { MapPin, Clock } from 'lucide-react';
import { parseDateString, isExcluded } from '../../utils/normalizationUtils';
import { APP_CONFIG } from '../../config/constants';
import './Escalas.css';

export function EscalaCard({ escala, onClick }) {
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
    const year = dateObj.getFullYear();

    return (
        <div className={`escala-card ${excluido ? 'excluida' : ''}`} onClick={() => onClick(escala)}>
            <div className="card-top-accent"></div>
            
            <div className="card-header-new">
                <div className="escala-id">ID: {escala.id || '---'}</div>
                <div className="escala-date">{day}/{month}/{year}</div>
            </div>

            <div className="card-body">
                <div className="card-meta-row">
                    <MapPin size={14} className="text-info" />
                    <span className="font-medium">{escala.posto || "Não informado"}</span>
                </div>
                <div className="card-meta-row">
                    <Clock size={14} className="text-info" />
                    <span className="font-medium">{escala.horaInicio} às {escala.horaTermino}</span>
                </div>
                
                <div className="card-meta-row" style={{ marginTop: 8, marginBottom: 8 }}>
                    <span className="meta-label">TIPO:</span>
                    <span className="badge badge-neutral">{escala.tipoEscala || 'DEJEM'}</span>
                </div>

                <div className="military-box">
                    <div className="military-box-title">MILITAR ESCALADO</div>
                    {escala.nome && escala.nome.trim() !== '-' ? (
                        <div className="military-info">
                            <span className="mil-grad">{escala.graduacao || 'PM'}</span>
                            <span className="mil-name">{escala.nome}</span>
                        </div>
                    ) : (
                        <div className="military-info empty">Vaga disponível</div>
                    )}
                </div>
            </div>

            <div className="card-footer-new">
                <div className={`badge ${statusClass}`}>
                    <span className="badge-dot" />
                    {statusLabel}
                </div>
                <div className="vacancy-info">
                    <span className={escala.vagasEmAberto > 0 ? 'text-success' : 'text-danger'}>
                        {String(escala.vagasEmAberto).padStart(2, '0')}
                    </span>
                    <span className="text-muted"> / {String(escala.vagasPracas).padStart(2, '0')} ABERTAS</span>
                </div>
            </div>
        </div>
    );
}
