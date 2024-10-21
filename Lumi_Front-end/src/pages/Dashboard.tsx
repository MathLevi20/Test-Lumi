// src/pages/Dashboard.tsx
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from '../components/Card';
import Filter from '../components/Filter';

const mockData = [
    { name: 'Abril', consumo: 526, energiaCompensada: 100 },
    { name: 'Maio', consumo: 600, energiaCompensada: 150 },
    { name: 'Junho', consumo: 700, energiaCompensada: 200 },
    { name: 'Julho', consumo: 800, energiaCompensada: 250 },
];

const Dashboard: React.FC = () => {
    const [clientId, setClientId] = useState<string>('');
    const [period, setPeriod] = useState<string>('');

    const consumoTotal = mockData.reduce((acc, data) => acc + data.consumo, 0);
    const energiaCompensadaTotal = mockData.reduce((acc, data) => acc + data.energiaCompensada, 0);

    return (
        <div className="p-4">
            <h1 className="text-2xl mb-4">Dashboard de Consumo de Energia</h1>
            <Filter onClientChange={setClientId} onPeriodChange={setPeriod} />
            <div className="flex flex-wrap">
                <Card title="Consumo Total (kWh)" value={consumoTotal} />
                <Card title="Energia Compensada (kWh)" value={energiaCompensadaTotal} />
            </div>

            <h2 className="text-xl mt-6 mb-4">Resultados de Energia (kWh)</h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mockData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="consumo" stroke="#8884d8" name="Consumo (kWh)" />
                    <Line type="monotone" dataKey="energiaCompensada" stroke="#82ca9d" name="Energia Compensada (kWh)" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Dashboard;
