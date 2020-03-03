import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/*
class Square extends React.Component {
	render(props) {
		return (
			<button
				className="square"
				onClick={props.onClick}
			>
				{props.value}
			</button>
		);
	}
}
*/

/**
*  함수 컴포넌트
*  1. 더 간단하게 컴포넌트 작성 방법
*  2. state 없이 render 함수만을 가진다.
*  3. 'React.Component'를 확장하는데 클래스를 정의하는 대신
*     'Props'를 입력받아서 렌더링 할 대상을 반환하는 함수를 작성할 수 있습니다.
*  4. 클래스로 작성하는 것 보다 빠르게 작성할 수 있으며
*     많은 컴포넌트를 함수 컴포넌트로 표현 할 수있다.
*
*  변경
*  Square를 함수 컴포넌트로 수정했을 때
*  onClick={() => this.props.onClick()}을
*  onClick={props.onClick}로 간결하게 작성했습니다. 양
*  쪽 모두 괄호가 사라진 것에 주목해주세요.
*/
const Square = (props) => {
	return (
		<button
			className="square"
			onClick={props.onClick}
		>
			{props.value}
		</button>
	)
};

class Board extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			squares: Array(9).fill(null),
			xIsNext: true,
		}
	}
	handleClick(i) {
		const squares = this.state.squares.slice();
		if (calculateWinner(squares) || squares[i]) return;
		squares[i] = this.state.xIsNext ? 'X' : 'O';
		this.setState({
			squares,
			xIsNext: !this.state.xIsNext,
		});
	}
	renderSquare(i) {
		return (<Square
			value={this.state.squares[i]}
			onClick={() => this.handleClick(i) }
		/>);
	}

	render() {
		// const status = 'Next player: X';
		const winner = calculateWinner(this.state.squares);
		let status;
		if (winner) {
			status = 'Winner: ' + winner;
		} else {
			status = `Next player: ${ (this.state.xIsNext ? 'X' : 'O') }`;
		}
		return (
			<div>
				<div className="status">{status}</div>
				<div className="board-row">
					{this.renderSquare(0)}
					{this.renderSquare(1)}
					{this.renderSquare(2)}
				</div>
				<div className="board-row">
					{this.renderSquare(3)}
					{this.renderSquare(4)}
					{this.renderSquare(5)}
				</div>
				<div className="board-row">
					{this.renderSquare(6)}
					{this.renderSquare(7)}
					{this.renderSquare(8)}
				</div>
			</div>
		);
	}
}

class Game extends React.Component {
	render() {
		return (
			<div className="game">
				<div className="game-board">
					<Board />
				</div>
				<div className="game-info">
					<div>{/* status */}</div>
					<ol>{/* TODO */}</ol>
				</div>
			</div>
		);
	}
}

// ========================================

ReactDOM.render(
	<Game />,
	document.getElementById('root')
);


function calculateWinner(squares) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}
	return null;
}
