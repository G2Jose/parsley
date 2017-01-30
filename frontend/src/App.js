import React, { Component } from 'react';
import axios from 'axios';
import elasticsearch from 'elasticsearch';
import moment from 'moment';

import LineChart from './Components/LineChart';
import Transactions from './Components/Transactions';
import DateRange from './Components/DateRange';
import { aggregateByMonth, esToTransactions, filter } from './utils/data';
import { getAll } from './utils/elastic';

import './App.css';

const elastic = new elasticsearch.Client({
	host: 'localhost:9200',
});

class App extends Component {
	constructor() {
		super();
		this.state = {
			data: null,
			windowHeight: window.innerHeight,
			dateFilterStart: moment(new Date()).subtract(1, 'year').toDate(),
			dateFilterEnd: (new Date()),
		};
	}
	componentDidMount() {
		// axios.get('http://localhost:1337/transactions')
		// 	.then((response) => {
		// 		// console.log(response.data);
		// 		this.setState({
		// 			data: response.data,
		// 			windowHeight: window.innerHeight,
		// 		});
		// 	});

		getAll()
		.then(response => {
			this.setState({
				data: esToTransactions(response),
			}, () => console.log(this.state));
		});

		window.addEventListener('resize', () => this.setState({
			windowHeight: window.innerHeight,
		}));
	}
	render() {
		return (
			<div className="App">
				<LineChart data={aggregateByMonth(filter(this.state.data, this.state.dateFilterStart, this.state.dateFilterEnd))} height={this.state.windowHeight / 2} />
				<DateRange
					currentStart={this.state.dateFilterStart}
					currentEnd={this.state.dateFilterEnd}
					updateStart={(date) => this.setState({
						dateFilterStart: date,
					})}
					updateEnd={(date) => this.setState({
						dateFilterEnd: date,
					})}
				/>
				<Transactions transactions={filter(this.state.data, this.state.dateFilterStart, this.state.dateFilterEnd)} />
			</div>
		);
	}
}

export default App;
