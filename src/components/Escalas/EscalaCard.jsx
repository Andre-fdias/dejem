import React from 'react';
import { MapPin, Clock, Users, Unlock, ArrowRight } from 'lucide-react';
import { parseDateString, isExcluded } from '../../utils/normalizationUtils';
import { APP_CONFIG } from '../../config/constants';
import './Escalas.css';

export function EscalaCard({ escala, onClick }) {
    const excluido = isExcluded(escala);
    
    let statusClass = "badge-success";
    let statusLabel = "DISPONÍVEL";
    
    if (excluido) {
        statusClass = "badge-danger";
        statusLabel = "ESCALA EXCLUÍDA";
    } else if (escala.vagasEmAberto <= 0) {
        statusClass = "badge-danger";
        statusLabel = "ESGOTADA";
    } else if (escala.vagasEmAberto <= APP_CONFIG.lowVacancyThreshold) {
        statusClass = "badge-warning";
        statusLabel = "ÚLTIMAS VAGAS";
    }

    const dateObj = parseDateString(escala.dataInicio);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const monthNames = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];
    const month = monthNames[dateObj.getMonth()];
    const year = dateObj.getFullYear();
    const daysWeek = ["DOMINGO", "SEGUNDA-FEIRA", "TERÇA-FEIRA", "QUARTA-FEIRA", "QUINTA-FEIRA", "SEXTA-FEIRA", "SÁBADO"];
    const weekDay = daysWeek[dateObj.getDay()] || "";

    return (
        <div className={`escala-card ${excluido ? 'excluida' : ''}`} onClick={() => onClick(escala)}>
            <div className="card-header">
                <div className="card-date-info">
                    <span className="card-date">{day} {month} {year}</span>
                    <span className="card-weekday">{weekDay}</span>
                </div>
                <div className={`badge ${statusClass}`}>
                    <span className="badge-dot" />
                    {statusLabel}
                </div>
            </div>

            <div className="card-body">
                <div className="card-location">
                    <MapPin size={18} className="text-info" />
                    <span className="location-text">{escala.posto || "Não informado"}</span>
                </div>
                
                <div className="card-org">
                    {escala.unidade} {escala.unidade && escala.sgb ? '•' : ''} {escala.sgb}
                </div>

                <div className="card-divider" />

                <div className="card-time">
                    <Clock size={16} className="text-muted" />
                    <span>{escala.horaInicio} &rarr; {escala.horaTermino}</span>
                </div>

                <div className="card-vacancies">
                    <div className="vacancy-item">
                        <Users size={16} className="text-muted" />
                        <span>{String(escala.vagasPracas).padStart(2, '0')} VAGAS</span>
                    </div>
                    <div className="vacancy-item highlight">
                        <Unlock size={16} className={escala.vagasEmAberto > 0 ? "text-success" : "text-muted"} />
                        <span className={escala.vagasEmAberto > 0 ? "text-success" : ""}>
                            {String(escala.vagasEmAberto).padStart(2, '0')} EM ABERTO
                        </span>
                    </div>
                </div>
            </div>

            <div className="card-footer">
                <span className="text-info font-medium">Ver detalhes</span>
                <ArrowRight size={16} className="text-info" />
            </div>
        </div>
    );
}
