import React, { Component} from 'react';
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

class Board extends Component {
	renderSquare(i) {
		return (<Square
			value={this.props.squares[i]}
			onClick={() => this.props.onClick(i) }
		/>);
	}

	render() {
		return (
			<div>
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
	constructor(props) {
		super(props);
		this.state = {
			history: [{
				squares: Array(9).fill(null),
			}],
			stepNumber: 0,
			xIsNext: true,
		}
	}

	handleClick(i) {
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[history.length - 1];
		const squares = current.squares.slice();
		if (calculateWinner(squares) || squares[i]) return;
		squares[i] = this.state.xIsNext ? 'X' : 'O';
		this.setState({
			history: history.concat([{
				squares,
			}]),
			stepNumber: history.length,
			xIsNext: !this.state.xIsNext,
		});
	}

	jumpTo(step) {
		this.setState({
			stepNumber: step,
			xIsNext: (step % 2) === 0,
		})
	}

	render() {
		const history = this.state.history;
		const current = history[this.state.stepNumber];
		const winner = calculateWinner(current.squares);

		const moves = history.map((step, move) => {
			const desc = move
				? `Go to move # ${move}`
				: `Go to game start`;
			return (
				<li key={move}>
					<button onClick={() => this.jumpTo(move)}>{desc}</button>
				</li>
			)
		});

		let status;
		if (winner) {
			status = 'Winner: ' + winner;
		} else {
			status = `Next player: ${ (this.state.xIsNext ? 'X' : 'O') }`;
		}
		return (
			<div className="game">
				<div className="game-board">
					<Board
						squares={current.squares}
						onClick={i => this.handleClick(i) }
					/>
				</div>
				<div className="game-info">
					<div>{status}</div>
					<ol>{moves}</ol>
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
