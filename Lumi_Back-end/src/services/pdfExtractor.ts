import fs from 'fs';
import pdf from 'pdf-parse';

interface InvoiceData {
    clientNumber: string;
    referenceMonth: string;
    energyElectricity: { quantity: number; value: number };
    energySCEEE: { quantity: number; value: number };
    compensatedEnergy: { quantity: number; value: number };
    publicLightingContribution: number;
}

const extractInvoiceData = async (pdfFilePath: string): Promise<InvoiceData | null> => {
    const dataBuffer = fs.readFileSync(pdfFilePath);

    try {
        const data = await pdf(dataBuffer);
        const text = data.text;

        // Implementar lógica para extrair informações relevantes
        const clientNumber = extractClientNumber(text);
        const referenceMonth = extractReferenceMonth(text);
        const energyElectricity = extractEnergyElectricity(text);
        const energySCEEE = extractEnergySCEEE(text);
        const compensatedEnergy = extractCompensatedEnergy(text);
        const publicLightingContribution = extractPublicLightingContribution(text);

        return {
            clientNumber,
            referenceMonth,
            energyElectricity,
            energySCEEE,
            compensatedEnergy,
            publicLightingContribution,
        };
    } catch (error) {
        console.error('Error parsing PDF:', error);
        return null;
    }
};

const extractClientNumber = (text: string): string => {
    // Lógica para extrair o "No DO CLIENTE"
    const match = text.match(/No DO CLIENTE:\s*(\w+)/);
    return match ? match[1] : '';
};

const extractReferenceMonth = (text: string): string => {
    // Lógica para extrair "Mês de referência"
    const match = text.match(/Mês de referência:\s*(\w+ \d+)/);
    return match ? match[1] : '';
};

const extractEnergyElectricity = (text: string) => {
    // Lógica para extrair "Energia Elétrica"
    const match = text.match(/Energia Elétrica:\s*([\d,]+) kWh\s*R\$(\d+,\d+)/);
    return match ? { quantity: parseFloat(match[1].replace(',', '.')), value: parseFloat(match[2].replace(',', '.')) } : { quantity: 0, value: 0 };
};

const extractEnergySCEEE = (text: string) => {
    // Lógica para extrair "Energia SCEEE s/ICMS"
    const match = text.match(/Energia SCEEE s\/ICMS:\s*([\d,]+) kWh\s*R\$(\d+,\d+)/);
    return match ? { quantity: parseFloat(match[1].replace(',', '.')), value: parseFloat(match[2].replace(',', '.')) } : { quantity: 0, value: 0 };
};

const extractCompensatedEnergy = (text: string) => {
    // Lógica para extrair "Energia Compensada GD I"
    const match = text.match(/Energia Compensada GD I:\s*([\d,]+) kWh\s*R\$(\d+,\d+)/);
    return match ? { quantity: parseFloat(match[1].replace(',', '.')), value: parseFloat(match[2].replace(',', '.')) } : { quantity: 0, value: 0 };
};

const extractPublicLightingContribution = (text: string): number => {
    // Lógica para extrair "Contrib Ilum Publica Municipal"
    const match = text.match(/Contrib Ilum Publica Municipal:\s*R\$(\d+,\d+)/);
    return match ? parseFloat(match[1].replace(',', '.')) : 0;
};

export default extractInvoiceData;
