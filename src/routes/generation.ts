// Ceará conversational style - focusing on how people actually talk
// Real places and foods, but keeping it natural

const places = [
    'Praia do Futuro', 'Jericoacoara', 'Canoa Quebrada', 'Fortaleza', 'Iracema',
    'Cumbuco', 'Morro Branco', 'Lagoinha', 'Flecheiras', 'Paracuru',
    'Aracati', 'Quixadá', 'Juazeiro do Norte', 'Sobral', 'Crato', 'Beira Mar'
];

const foods = [
    'tapioca', 'baião de dois', 'carne de sol', 'macaxeira', 'panelada',
    'buchada', 'sarapatel', 'peixada', 'caranguejada', 'queijo coalho',
    'cuscuz', 'rapadura', 'cajuína', 'batida de caju'
];

const activities = [
    'tomar uma', 'dar um rolé', 'ir pro forró', 'ir pra praia', 'jogar uma bola',
    'fazer um churrasco', 'tomar banho de mar', 'soltar pipa', 'ver o pôr do sol',
    'ir pro Centro', 'fazer um lanche', 'ir na barraca', 'conversar'
];

// Local expressions and slang
const expressions = [
    'rapaz', 'vixe maria', 'eita', 'oxente', 'arre égua', 'pronto',
    'é memo', 'num diga', 'vish', 'mermão', 'bicho', 'meu rei',
    'arretado', 'massa', 'oxe', 'vixe'
];

const adjectives = [
    'quente', 'arretado', 'massa', 'danado', 'bom demais',
    'maneiro', 'doido', 'aperreado', 'avexado', 'agoniado'
];

const phrases = [
    'é nada disso não', 'deixa de conversa', 'vai fazer o que',
    'tá certo é', 'isso mesmo', 'num tem jeito não',
    'é desse jeito mesmo', 'vai entender', 'quem foi que disse',
    'ih rapaz', 'tá doido é', 'pois é', 'imagina só', 'nem me fale',
    'e tal', 'e coisa', 'sei lá', 'num sei que', 'lá e tal'
];

// Generate a random Ceará-style sentence
function generateSentence(): string {
    const templates = [
        // Natural conversation patterns
        () => `${expressions[rand(expressions.length)]}, ${activities[rand(activities.length)]} lá em ${places[rand(places.length)]} é ${adjectives[rand(adjectives.length)]} demais`,
        () => `Você já foi em ${places[rand(places.length)]}? ${phrases[rand(phrases.length)]}, ${adjectives[rand(adjectives.length)]} demais`,
        () => `Comi um ${foods[rand(foods.length)]} que tava ${adjectives[rand(adjectives.length)]}, ${expressions[rand(expressions.length)]}`,
        () => `Final de semana vou ${activities[rand(activities.length)]} com a galera, vai ser ${adjectives[rand(adjectives.length)]}`,

        // "num sei que" rambling style - the original vibe
        () => `Rapaz, ${phrases[rand(phrases.length)]}, ${phrases[rand(phrases.length)]}, ${phrases[rand(phrases.length)]}`,
        () => `Negócio de ${foods[rand(foods.length)]} ${phrases[rand(phrases.length)]}, aí depois ${activities[rand(activities.length)]}, ${phrases[rand(phrases.length)]}`,
        () => `E aí fica de ${phrases[rand(phrases.length)]} e ${phrases[rand(phrases.length)]}, ${expressions[rand(expressions.length)]}`,
        () => `Num sei que de ${foods[rand(foods.length)]} e num sei que mais lá, ${phrases[rand(phrases.length)]}`,

        // Everyday casual talk
        () => `Quando eu tava em ${places[rand(places.length)]}, ${expressions[rand(expressions.length)]}, ${adjectives[rand(adjectives.length)]} demais da conta`,
        () => `${expressions[rand(expressions.length)]} ${expressions[rand(expressions.length)]}, ${activities[rand(activities.length)]} por aqui é ${adjectives[rand(adjectives.length)]}`,
        () => `Bora ${activities[rand(activities.length)]} e comer ${foods[rand(foods.length)]}, vai`,
        () => `${phrases[rand(phrases.length)]}, ${foods[rand(foods.length)]} daqui é ${adjectives[rand(adjectives.length)]} de verdade`,
        () => `Fui em ${places[rand(places.length)]} esses dias, ${expressions[rand(expressions.length)]}, que lugar ${adjectives[rand(adjectives.length)]}`,
        () => `Tu vai ${activities[rand(activities.length)]} comigo? ${phrases[rand(phrases.length)]}`,
        () => `Aí depois ${activities[rand(activities.length)]}, ${phrases[rand(phrases.length)]}, comé que é`,
    ];

    return templates[rand(templates.length)]();
}

function rand(max: number): number {
    return Math.floor(Math.random() * max);
}

// Generate paragraphs
function generateParagraphs(amount: number): string {
    const paragraphs = [];
    for (let i = 0; i < amount; i++) {
        const sentencesPerParagraph = rand(3) + 3; // 3-5 sentences
        const sentences = [];
        for (let j = 0; j < sentencesPerParagraph; j++) {
            sentences.push(generateSentence());
        }
        paragraphs.push(sentences.join('. ') + '.');
    }
    return paragraphs.join('\n\n');
}

// Generate sentences
function generateSentences(amount: number): string {
    const sentences = [];
    for (let i = 0; i < amount; i++) {
        sentences.push(generateSentence());
    }
    return sentences.join('. ') + '.';
}

// Generate words
function generateWords(amount: number): string {
    const allWords = [...places, ...foods, ...activities, ...expressions, ...adjectives, ...phrases];
    const words = [];
    for (let i = 0; i < amount; i++) {
        words.push(allWords[rand(allWords.length)]);
    }
    return words.join(' ');
}

// Generate characters (just generate words and take the first N characters)
function generateCharacters(amount: number): string {
    let result = '';
    while (result.length < amount) {
        result += generateSentence() + ' ';
    }
    return result.substring(0, amount);
}

interface GenerationFunction {
    fn: (amount: number) => string;
}

export const generationTypes = new Map<string, GenerationFunction>([
    ['Parágrafos', { fn: generateParagraphs }],
    ['Frases', { fn: generateSentences }],
    ['Palavras', { fn: generateWords }],
    ['Caracteres', { fn: generateCharacters }],
]);

export interface GenerateParams {
    quantity: number;
    type: string;
}

// Main generation function for API use
export function generateText(params: GenerateParams): string {
    const generator = generationTypes.get(params.type);
    if (!generator) {
        throw new Error('Tipo de geração não encontrado: ' + params.type);
    }
    return generator.fn(params.quantity);
}
