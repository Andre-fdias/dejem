import React from 'react';
import { X } from 'lucide-react';
import { isExcluded } from '../../utils/normalizationUtils';
import './Escalas.css';

export function EscalaDetailsModal({ escala, onClose }) {
    if (!escala) return null;

    const excluido = isExcluded(escala);
    
    return (
        <div className="modal-backdrop animate-fade" onClick={onClose}>
            <div className="modal-content animate-slide" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="text-h2">ESCALA #{escala.id || 'N/A'}</h2>
                    <button className="icon-button" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>
                
                <div className="modal-body">
                    {excluido && (
                        <div className="badge badge-danger" style={{ marginBottom: 16 }}>
                            ● ESCALA EXCLUÍDA
                        </div>
                    )}
                    {!excluido && escala.vagasEmAberto > 0 && (
                        <div className="badge badge-success" style={{ marginBottom: 16 }}>
                            ● DISPONÍVEL
                        </div>
                    )}
                    {!excluido && escala.vagasEmAberto <= 0 && (
                        <div className="badge badge-danger" style={{ marginBottom: 16 }}>
                            ● ESGOTADA
                        </div>
                    )}

                    <div className="detail-section">
                        <h4 className="detail-title">PERÍODO</h4>
                        <div className="detail-grid">
                            <div className="detail-item">
                                <span className="detail-label">Data Início</span>
                                <span className="detail-value">{escala.dataInicio || '-'}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Hora Início</span>
                                <span className="detail-value">{escala.horaInicio || '-'}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Data Término</span>
                                <span className="detail-value">{escala.dataTermino || '-'}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Hora Término</span>
                                <span className="detail-value">{escala.horaTermino || '-'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="detail-section">
                        <h4 className="detail-title">LOCALIZAÇÃO</h4>
                        <div className="detail-grid">
                            <div className="detail-item">
                                <span className="detail-label">Posto</span>
                                <span className="detail-value">📍 {escala.posto || '-'}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">AISP</span>
                                <span className="detail-value">{escala.aisp || '-'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="detail-section">
                        <h4 className="detail-title">ORGANIZAÇÃO</h4>
                        <div className="detail-grid">
                            <div className="detail-item">
                                <span className="detail-label">Unidade</span>
                                <span className="detail-value">{escala.unidade || '-'}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">SGB</span>
                                <span className="detail-value">{escala.sgb || '-'}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Tipo de Escala</span>
                                <span className="detail-value">{escala.tipoEscala || '-'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="detail-section">
                        <h4 className="detail-title">MILITAR</h4>
                        <div className="detail-grid">
                            <div className="detail-item">
                                <span className="detail-label">Nome</span>
                                <span className="detail-value">{escala.nome || '-'}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">RE</span>
                                <span className="detail-value">{escala.re || '-'}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Graduação</span>
                                <span className="detail-value">{escala.graduacao || '-'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="detail-section">
                        <h4 className="detail-title">DISPONIBILIDADE</h4>
                        <div className="detail-grid">
                            <div className="detail-item">
                                <span className="detail-label">Vagas Totais</span>
                                <span className="detail-value">{String(escala.vagasPracas).padStart(2, '0')} vagas</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Vagas Abertas</span>
                                <span className={`detail-value ${escala.vagasEmAberto > 0 ? 'text-success' : 'text-danger'}`}>
                                    {String(escala.vagasEmAberto).padStart(2, '0')} em aberto
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="detail-section">
                        <h4 className="detail-title">INFORMAÇÕES</h4>
                        <div className="detail-grid">
                            <div className="detail-item">
                                <span className="detail-label">ID Interno</span>
                                <span className="detail-value">{escala.id || '-'}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Mês/Origem</span>
                                <span className="detail-value">{escala.mesOrigem || '-'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
