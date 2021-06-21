import React from 'react';
import './App.css';

function App() {
	let config = {
		x: 10,
		y: 10,
	};

	const gridMaker = (x, y) => {
		let out = '';
		for (let iy = y - 1; iy >= 0; iy--) {
			let cells = '';
			for (let ix = x - 1; ix >= 0; ix--) {
				let className = `x${ix}y${iy}`;
				cells += cellMaker(className);
			}
			out += rowMaker(cells);
		}
		return out;
	};

	function rowMaker(cells) {
		return `<div className="cell-row">${cells}</div>`;
	}

	function cellMaker(className) {
		return `<div className="cell${className}">.</div>`;
	}

	if (document.getElementsByClassName('grid')[0]) {
		const initialGrid = gridMaker(config.x, config.y);
		document.getElementsByClassName('grid')[0].innerHTML = initialGrid;
		document.getElementsByClassName('next')[0].innerHTML = initialGrid;
	}

	return (
		<div className="App">
			<header className="App-header">
				<div className="grid"></div>
				<div className="next"></div>
			</header>
		</div>
	);
}

export default App;
