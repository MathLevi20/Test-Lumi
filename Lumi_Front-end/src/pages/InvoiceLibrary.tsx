import React from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const InvoiceLibrary: React.FC = () => {
    const onDrop = async (acceptedFiles: File[]) => {
        const formData = new FormData();
        formData.append('file', acceptedFiles[0]);

        try {
            const response = await axios.post('/api/invoices/upload', formData);
            alert(response.data);
        } catch (error) {
            console.error('Erro ao fazer upload da fatura:', error);
            alert('Erro ao fazer upload da fatura.');
        }
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div className="p-4">
            <h1 className="text-2xl mb-4">Biblioteca de Faturas</h1>
            <div {...getRootProps()} className="border-2 border-dashed p-6 mb-4">
                <input {...getInputProps()} />
                <p>Arraste e solte sua fatura aqui, ou clique para selecionar.</p>
            </div>
            {/* Aqui você pode adicionar um botão para ir ao Dashboard */}
        </div>
    );
};

export default InvoiceLibrary;
