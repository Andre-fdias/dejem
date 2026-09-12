import React from 'react';
import './Common.css';

export function LoadingSkeleton() {
    return (
        <div className="skeleton-container animate-fade">
            <div className="skeleton-grid">
                {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="skeleton-card">
                        <div className="skeleton-header">
                            <div className="skeleton-line short"></div>
                            <div className="skeleton-circle"></div>
                        </div>
                        <div className="skeleton-body">
                            <div className="skeleton-line"></div>
                            <div className="skeleton-line medium"></div>
                        </div>
                        <div className="skeleton-footer">
                            <div className="skeleton-line short"></div>
                            <div className="skeleton-line short"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
