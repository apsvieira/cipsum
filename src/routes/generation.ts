// Ceará-specific words and phrases
// Sources: See SOURCES.md for detailed references

// Famous beaches and cities of Ceará
const places = [
    'Praia do Futuro', 'Jericoacoara', 'Canoa Quebrada', 'Fortaleza', 'Iracema',
    'Cumbuco', 'Morro Branco', 'Lagoinha', 'Flecheiras', 'Paracuru',
    'Aracati', 'Quixadá', 'Juazeiro do Norte', 'Sobral', 'Crato', 'Pedra Furada',
    'Lagoa do Paraíso', 'Beira Mar'
];

// Traditional Ceará cuisine
const foods = [
    'tapioca', 'baião de dois', 'carne de sol', 'macaxeira', 'panelada',
    'buchada', 'sarapatel', 'peixada', 'caranguejada', 'queijo coalho',
    'cuscuz', 'rapadura', 'cajuína', 'batida de caju', 'paçoca', 'vatapá',
    'pirão'
];

const activities = [
    'tomar uma', 'dar um rolé', 'ir pro forró', 'ir pra praia', 'jogar uma bola',
    'fazer um churrasco', 'tomar banho de mar', 'soltar pipa', 'ver o pôr do sol',
    'ir pro Centro', 'fazer um lanche', 'ir na barraca', 'ouvir Fagner',
    'assistir Os Trapalhões', 'fazer kitesurf'
];

// Northeastern expressions, particularly from Ceará
const expressions = [
    'rapaz', 'vixe maria', 'eita', 'oxente', 'arre égua', 'pronto',
    'é memo', 'num diga', 'vish', 'mermão', 'bicho', 'meu rei',
    'é demais da conta', 'arretado', 'massa', 'oxe', 'bom demais', 'vixe'
];

const adjectives = [
    'quente', 'arretado', 'massa', 'danado', 'cabra macho', 'bom demais',
    'topzera', 'maneiro', 'irado', 'frenético', 'doido',
    'aperreado', 'avexado', 'agoniado', 'arretado mesmo'
];

const phrases = [
    'É nada disso não', 'Deixe de conversa', 'Vai fazer o que',
    'Tá certo é', 'Isso mesmo', 'Num tem jeito não',
    'É desse jeito mesmo', 'Vai entender', 'Quem foi que disse',
    'Ih rapaz', 'Tá doido é', 'Pois é', 'Imagina só', 'Nem me fale'
];

// Cultural icons from Ceará (Pessoal do Ceará movement and famous comedians)
const culturalIcons = [
    'Fagner', 'Belchior', 'Ednardo', 'Amelinha', 'Renato Aragão',
    'Chico Anysio', 'Tom Cavalcante'
];

// Generate a random Ceará-style sentence
function generateSentence(): string {
    const templates = [
        () => `${expressions[rand(expressions.length)].charAt(0).toUpperCase() + expressions[rand(expressions.length)].slice(1)}, ${activities[rand(activities.length)]} lá em ${places[rand(places.length)]} é ${adjectives[rand(adjectives.length)]} demais`,
        () => `Você já foi em ${places[rand(places.length)]}? ${phrases[rand(phrases.length)]}, ${adjectives[rand(adjectives.length)]} demais`,
        () => `${expressions[rand(expressions.length)]}, comi um ${foods[rand(foods.length)]} que tava ${adjectives[rand(adjectives.length)]}`,
        () => `Final de semana vou ${activities[rand(activities.length)]} com a galera, vai ser ${adjectives[rand(adjectives.length)]}`,
        () => `${phrases[rand(phrases.length)]}, ${foods[rand(foods.length)]} daqui é ${adjectives[rand(adjectives.length)]} de verdade`,
        () => `Quando eu tava em ${places[rand(places.length)]}, ${expressions[rand(expressions.length)]}, ${adjectives[rand(adjectives.length)]} demais da conta`,
        () => `${expressions[rand(expressions.length)]} ${expressions[rand(expressions.length)]}, ${activities[rand(activities.length)]} por aqui é ${adjectives[rand(adjectives.length)]}`,
        () => `Rapaz, num sei que de ${foods[rand(foods.length)]} e num sei que de ${places[rand(places.length)]}, aí ${phrases[rand(phrases.length)].toLowerCase()}`,
        () => `${expressions[rand(expressions.length)]}, bora ${activities[rand(activities.length)]} e comer ${foods[rand(foods.length)]}`,
        () => `Negócio é que em ${places[rand(places.length)]} tu vai ver como é ${adjectives[rand(adjectives.length)]} ${expressions[rand(expressions.length)]}`,
        () => `Escutando ${culturalIcons[rand(culturalIcons.length)]} e tomando ${foods[rand(foods.length)]}, ${expressions[rand(expressions.length)]}, ${adjectives[rand(adjectives.length)]} demais`,
        () => `${culturalIcons[rand(culturalIcons.length)]} é ${adjectives[rand(adjectives.length)]}, num tem pra ninguém`,
        () => `Fui em ${places[rand(places.length)]} semana passada, ${expressions[rand(expressions.length)]}, que lugar ${adjectives[rand(adjectives.length)]}`,
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
    const allWords = [...places, ...foods, ...activities, ...expressions, ...adjectives, ...culturalIcons];
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
