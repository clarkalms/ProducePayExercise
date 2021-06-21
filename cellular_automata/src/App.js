import React from 'react';
import './App.css';

function App() {
	const config = {
		generation: 0,
		seed: false,
		x: 10,
		y: 10,
		speed: 1000,
	};

	const makeGrid = (x, y) => {
		let out = '';
		for (var iy = y - 1; iy >= 0; iy--) {
			let cells = '';
			for (var ix = x - 1; ix >= 0; ix--) {
				let className = 'x' + ix + 'y' + iy;
				cells += makeCell(className);
			}
			out += makeRow(cells);
		}
		return out;
	};

	const makeRow = (cells) => {
		return '<div class="cell-row">' + cells + '</div>';
	};

	const makeCell = (className) => {
		return '<div class="cell ' + className + '" data-toggle="0">.</div>';
	};

	const coinFlip = () => {
		return Math.floor(Math.random() * 2) == 0;
	};

	const toggle = (x, y, el = 'life') => {
		let cell = document
			.getElementsByClassName(el)[0]
			.getElementsByClassName('x' + x + 'y' + y)[0];
		cell.dataset.toggle = cell.dataset.toggle == '0' ? '1' : '0';
	};

	const isLive = (x, y) => {
		let cell = document
			.getElementsByClassName('life')[0]
			.getElementsByClassName('x' + x + 'y' + y)[0];
		if (cell === null) {
			return false;
		}
		return cell.dataset.toggle == 1 ? true : false;
	};

	const getNeighbors = (x, y) => {
		const n = y != config.y - 1; // has northern neighbors
		const e = x != 0; // has eastern neighbors
		const s = y != 0; // has southern neighbors
		const w = x != config.x - 1; // has western neighbors
		let count = 0;
		if (n && isLive(x, y + 1)) count++;
		if (n && e && isLive(x - 1, y + 1)) count++;
		if (e && isLive(x - 1, y)) count++;
		if (s && e && isLive(x - 1, y - 1)) count++;
		if (s && isLive(x, y - 1)) count++;
		if (s && w && isLive(x + 1, y - 1)) count++;
		if (w && isLive(x + 1, y)) count++;
		if (n && w && isLive(x + 1, y + 1)) count++;
		return count;
	};
	const isUnderPopulated = (c) => {
		return c < 2;
	};
	const isHealthy = (c) => {
		return c == 2 || c == 3;
	};
	const isOverPopulated = (c) => {
		return c > 3;
	};
	const isBorn = (c) => {
		return c == 3;
	};

	const census = (x, y) => {
		let c = getNeighbors(x, y);
		let underPopulated = false;
		let healthy = false;
		let overPopulated = false;
		let born = false;
		if (isLive(x, y)) {
			underPopulated = isUnderPopulated(c);
			healthy = isHealthy(c);
			overPopulated = isOverPopulated(c);
		} else {
			born = isBorn(c);
		}
		if (underPopulated || overPopulated) {
			return false;
		}
		if (healthy || born) {
			return true;
		}
	};

	const buildNextGeneration = () => {
		config.generation++;
		document.getElementsByClassName('next')[0].innerHTML = makeGrid(
			config.x,
			config.y
		);
		let live = [];
		for (var iy = config.y - 1; iy >= 0; iy--) {
			for (var ix = config.x - 1; ix >= 0; ix--) {
				if (config.seed) {
					if (coinFlip()) {
						live.push({
							x: ix,
							y: iy,
						});
					}
				} else {
					if (census(ix, iy)) {
						live.push({
							x: ix,
							y: iy,
						});
					}
				}
			}
		}
		live.forEach((cell) => {
			toggle(cell.x, cell.y, 'next');
		});
		document.getElementsByClassName('life')[0].innerHTML =
			document.getElementsByClassName('next')[0].innerHTML;
		document.getElementsByClassName('generation')[0].innerHTML =
			config.generation;
		config.seed = false;
	};

	function seed() {
		document.getElementsByClassName('generation')[0].innerHTML = 0;
		document.getElementsByClassName('life')[0].innerHTML = makeGrid(
			config.x,
			config.y
		);
		config.generation = 0;
		config.seed = true;
	}

	if (document.getElementsByClassName('life')[0]) {
		let initialGrid = makeGrid(config.x, config.y);
		document.getElementsByClassName('life')[0].innerHTML = initialGrid;
		document.getElementsByClassName('next')[0].innerHTML = initialGrid;
		seed();
		setInterval(buildNextGeneration, config.speed);
	}

	return (
		<div className="App">
			<header className="App-header">
				<div class="life"></div>
				<div class="next"></div>
				<p>
					generation <span class="generation">0</span>,{' '}
					<button href="#" onClick={seed}>
						seed
					</button>
				</p>
			</header>
		</div>
	);
}

export default App;
