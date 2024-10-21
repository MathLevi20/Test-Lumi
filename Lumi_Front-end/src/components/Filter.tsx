// src/components/Filter.tsx
import React from 'react';

interface FilterProps {
    onClientChange: (clientId: string) => void;
    onPeriodChange: (period: string) => void;
}

const Filter: React.FC<FilterProps> = ({ onClientChange, onPeriodChange }) => {
    return (
        <div className="flex flex-col mb-4">
            <input
                type="text"
                placeholder="Número do Cliente"
                onChange={(e) => onClientChange(e.target.value)}
                className="border border-gray-300 rounded p-2 mb-2"
            />
            <input
                type="month"
                onChange={(e) => onPeriodChange(e.target.value)}
                className="border border-gray-300 rounded p-2"
            />
        </div>
    );
};

export default Filter;
