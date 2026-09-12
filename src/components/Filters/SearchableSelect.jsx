import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import './Filters.css';

export function SearchableSelect({ options, value, onChange, placeholder }) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const containerRef = useRef(null);

    const filteredOptions = options.filter(opt => 
        opt.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="searchable-select" ref={containerRef}>
            <div 
                className="select-trigger" 
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className={value ? "has-value" : "placeholder"}>
                    {value || placeholder}
                </span>
                <ChevronDown size={16} className={`chevron ${isOpen ? 'open' : ''}`} />
            </div>

            {isOpen && (
                <div className="select-dropdown animate-fade">
                    <div className="select-search-container">
                        <Search size={14} className="select-search-icon" />
                        <input
                            type="text"
                            className="select-search-input"
                            placeholder="Pesquisar..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            autoFocus
                        />
                    </div>
                    <div className="select-options">
                        <div 
                            className={`select-option ${!value ? 'selected' : ''}`}
                            onClick={() => { onChange(''); setIsOpen(false); }}
                        >
                            Todos
                        </div>
                        {filteredOptions.map(opt => (
                            <div
                                key={opt}
                                className={`select-option ${value === opt ? 'selected' : ''}`}
                                onClick={() => { onChange(opt); setIsOpen(false); }}
                            >
                                {opt}
                            </div>
                        ))}
                        {filteredOptions.length === 0 && (
                            <div className="select-option empty">Nenhum encontrado</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
