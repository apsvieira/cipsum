import { json } from '@sveltejs/kit';
import { generateText, generationTypes } from '../../generation';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const quantity = parseInt(url.searchParams.get('quantity') || '2');
	const type = url.searchParams.get('type') || 'Parágrafos';

	// Validate parameters
	if (isNaN(quantity) || quantity < 1 || quantity > 100) {
		return json(
			{ error: 'Quantidade deve ser um número entre 1 e 100' },
			{ status: 400 }
		);
	}

	if (!generationTypes.has(type)) {
		return json(
			{
				error: 'Tipo inválido. Use: ' + Array.from(generationTypes.keys()).join(', ')
			},
			{ status: 400 }
		);
	}

	try {
		const text = generateText({ quantity, type });
		return json({
			text,
			quantity,
			type
		});
	} catch (error) {
		return json(
			{ error: 'Erro ao gerar texto: ' + (error instanceof Error ? error.message : 'Erro desconhecido') },
			{ status: 500 }
		);
	}
};

export const POST: RequestHandler = async ({ request }) => {
	try {
		const body = await request.json();
		const quantity = parseInt(body.quantity || '2');
		const type = body.type || 'Parágrafos';

		// Validate parameters
		if (isNaN(quantity) || quantity < 1 || quantity > 100) {
			return json(
				{ error: 'Quantidade deve ser um número entre 1 e 100' },
				{ status: 400 }
			);
		}

		if (!generationTypes.has(type)) {
			return json(
				{
					error: 'Tipo inválido. Use: ' + Array.from(generationTypes.keys()).join(', ')
				},
				{ status: 400 }
			);
		}

		const text = generateText({ quantity, type });
		return json({
			text,
			quantity,
			type
		});
	} catch (error) {
		return json(
			{ error: 'Erro ao processar requisição: ' + (error instanceof Error ? error.message : 'Erro desconhecido') },
			{ status: 400 }
		);
	}
};
