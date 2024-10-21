// services/dataExtractor.ts

export interface ExtractedData {
    customerNumber: string;
    customerName: string;
    referenceMonth: string;
    referenceYear: string;
    electricEnergyKwh?: number;
    electricEnergyValue?: number;
    sceeValue?: number;
    compensatedEnergyKwh?: number;
    publicLightingContribution?: number;
    total?: number;
}

export const extractInvoiceData = (pdfText: string): ExtractedData => {
    let arr = pdfText.split('\n');
    arr = removeEmptyElements(arr);

    const customerNumberIndex = arr.findIndex(item => item.includes('Nº DO CLIENTE'));
    const referenceMonthIndex = arr.findIndex(item => item.includes('Referente a'));
    const stateNumber = arr.findIndex(item => item.includes('INSCRIÇÃO ESTADUAL'));
    const totalIndex = arr.findIndex(item => item.includes('TOTAL'));

    const customerNumber = arr[customerNumberIndex + 1]?.split(/\s{2,}/g);
    const reference = arr[referenceMonthIndex + 1]?.split(/\s{2,}/g)[0];
    const referenceMonth = reference?.split('/')[0];
    const referenceYear = reference?.split('/')[1];

    let customerName = arr[customerNumberIndex - 5];
    if (stateNumber !== -1) {
        customerName = arr[customerNumberIndex - 6];
    }

    const electricEnergyQuantity = arr[3]?.split(/\s{2,}/g);
    const electricEnergyValue = arr[3]?.split(/\s{2,}/g);
    const sceeeEnergyQuantity = arr[4]?.split(/\s{2,}/g);
    const sceeeEnergyValue = arr[4]?.split(/\s{2,}/g);
    const compensatedEnergyQuantity = arr[5]?.split(/\s{2,}/g);
    const publicLightingContribution = arr[6]?.split(/\s{2,}/g);
    const total = arr[totalIndex]?.split(/\s{2,}/g);

    return {
        customerNumber: customerNumber ? customerNumber[0] : '',
        customerName: customerName ? customerName : '',
        referenceMonth: referenceMonth ? referenceMonth : '',
        referenceYear: referenceYear ? referenceYear : '',
        electricEnergyKwh: electricEnergyQuantity ? parseFloat(electricEnergyQuantity[1].replace(/,/, '.')) : undefined,
        electricEnergyValue: electricEnergyValue ? parseFloat(electricEnergyValue[2].replace(/,/, '.')) : undefined,
        sceeValue: sceeeEnergyValue ? parseFloat(sceeeEnergyValue[2].replace(/,/, '.')) : undefined,
        compensatedEnergyKwh: compensatedEnergyQuantity ? parseFloat(compensatedEnergyQuantity[1].replace(/,/, '.')) : undefined,
        publicLightingContribution: publicLightingContribution ? parseFloat(publicLightingContribution[1].replace(/,/, '.')) : undefined,
        total: total ? parseFloat(total[1].replace(/,/, '.')) : undefined,
    };
};

const removeEmptyElements = (arr: any[]) => {
    return arr.filter(element => element !== undefined && element !== null && element.trim() !== "");
};
