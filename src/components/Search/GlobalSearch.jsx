import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import './Search.css';

export function GlobalSearch({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            onSearch(searchTerm);
        }, 300);
        return () => clearTimeout(timer);
    }, [searchTerm, onSearch]);

    return (
        <div className="search-container">
            <Search className="search-icon" size={20} />
            <input
                type="text"
                className="search-input text-body"
                placeholder="Pesquisar por ID, Posto, Unidade, SGB, RE ou Nome..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    );
}
