import React, { Component } from 'react';
import axios from 'axios';
import LineChart from './Components/LineChart';
import Transactions from './Components/Transactions';
import { aggregateByMonth, summarize } from './utils/data';
import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			data: null,
		};
	}
	componentDidMount() {
		axios.get('http://localhost:1337/transactions')
			.then((response) => {
				// console.log(response.data);
				this.setState({
					data: response.data,
					windowHeight: window.innerHeight,
				});
			});
		window.addEventListener('resize', () => this.setState({
			windowHeight: window.innerHeight,
		}));
	}
	render() {
		return (
			<div className="App">
				<LineChart data={aggregateByMonth(this.state.data)} height={this.state.windowHeight} />
				<Transactions transactions={this.state.data} />
			</div>
		);
	}
}

export default App;
