<script lang="ts">
	import { generationTypes } from './generation';
	let generatedText = '';
	let quantity = 2;
	let type = 'Parágrafos';

	async function generate() {
		const generator = generationTypes.get(type);
		if (!generator) {
			throw new Error('Tipo de geração não encontrado: ' + type);
		}
		const content = generator.fn(quantity);
		console.log(content);
		generatedText = content;
	}
</script>

<div class="banner">
	<h1>Gerador de Conversinha</h1>
	<h4>"Não porque negócio de num sei que e num sei que mais lá e tal..."</h4>
	<h5>"Rapaz, tu fica aí inventando história..."</h5>
</div>

<div class="container">
	<div>
		<h2>Diabé isso?</h2>
		<p>
			Isso aqui é um gerador de conversinha que fala português direito. <br />
			Você vai bem ali assim embaixo, escolhe um tanto de leruaite pro negócio botar na tela e pronto.
			Copia, taca lá no teu design, apaga o que tiver de xingamento no meio só pra garantir que num vai
			perder o emprego. Tem muito mais ideia que isso não.
		</p>
	</div>
	<div>
		<h2>E por que eu usaria esta budega?</h2>
		<p>
			Negócio é que ficar usando Lorem Ipsum é coisa de quem puxa saco de gringo. <br />
			Eu lá vou ficar falando latim, que nem quem inventou fala. Isso é um gerador de besteira pra ver
			se mais gente larga de ficar copiando textinho bonitinho só porque vem pronto dum site. <br />
			Agora num tem mais desculpa pra ficar botando palavra véa nada a ver no meio do design que é falando
			de praia, cacto, sei lá.
			<br />
			Porra de latim.
		</p>
	</div>
	<h2>Pois deixa eu ver esse negócio aí...</h2>
	<div>
		<table>
			<tr>
				<td>
					<label
						>Quantidade:<input
							name="quantity"
							type="number"
							min="1"
							max="100"
							bind:value={quantity}
						/></label
					>
				</td>
				<td>
					{#each generationTypes.keys() as gentype}
						<label
							><input name="type" type="radio" value={gentype} bind:group={type} />{gentype}</label
						>
					{/each}
				</td>
			</tr>
		</table>
	</div>
	<button on:click={generate}>Gerar</button>
</div>
{#if generatedText}
	<div class="content">
		<h2>Pronto, copia aí!</h2>
		<p class="generatedText">{generatedText}</p>
	</div>
{/if}

<style>
	@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
	@import './styles.css';
</style>
