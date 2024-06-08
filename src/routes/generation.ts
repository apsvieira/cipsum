const baseText = (
    "Não pq negocio de num sei que e num sei que mais lá e tal e coisa e coisa e tal. "
    + "E aí fica assim né. "
    + "Aí depois vai ver se é e num é, porque no final fica só falando dessas coisa. "
    + "E aí já viu comé que é.\n"
    + "E aí fica de negócio de num sei que e num sei que num sei que, e num sei que num sei que, num sei que num sei que, nam mermão."
);

const generate = (amount: number, separator: string) => {
    const parts = baseText.split(separator);
    const result = [];
    for (let i = 0; i < amount; i++) {
        result.push(parts[i % parts.length]);
    }
    return (result.join(separator) + separator).trim();
}

interface GenerationFunction {
    fn: (amount: number) => string;
}

export const generationTypes = new Map<string, GenerationFunction>([
    ['Parágrafos', { fn: (amount) => generate(amount, '\n\n') }],
    ['Frases', { fn: (amount) => generate(amount, '. ') }],
    ['Palavras', { fn: (amount) => generate(amount, ' ') }],
    ['Caracteres', { fn: (amount) => generate(amount, '') }],

]);


export interface GenerateParams {
    quantity: string;
    type: string;
}
