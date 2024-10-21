// src/components/Card.tsx
import React from 'react';

interface CardProps {
    title: string;
    value: string | number;
}

const Card: React.FC<CardProps> = ({ title, value }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 m-2 flex flex-col justify-between">
            <h3 className="text-lg font-bold">{title}</h3>
            <p className="text-2xl">{value}</p>
        </div>
    );
};

export default Card;
