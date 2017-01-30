import React from 'react';
import moment from 'moment';
const Select = require('react-select');

import { summarize } from '../utils/data';

import './Transactions.css';
import 'react-select/dist/react-select.css';

export default (props) => {
	const transactions = props.transactions;
	const options = [
		{ value: 'one', label: 'One' },
		{ value: 'two', label: 'Two' }
	];

	function logChange(val) {
		console.log("Selected: " + val);
	}
	return (
		<div className="transactions__table">
			<div className="transactions__header">
				<div className="transactions__date">Date</div>
				<div className="transactions__description">Description</div>
				<div className="transactions__credit">Credit</div>
				<div className="transactions__debit">Debit</div>
			</div>
			<div className="transactions__list">
				{transactions && transactions.map((transaction, index) => {
					// console.log(index);
					return (
						<div key={index} className="transactions__row">
							<div className="transactions__date">{moment(transaction.date).format('DD MMM YYYY')}</div>
							<div className="transactions__description">{transaction.description}</div>
							<div className="transactions__credit">{transaction.credit > 0 ? `$${transaction.credit}` : ''}</div>
							<div className="transactions__debit">{transaction.debit > 0 ? `$${transaction.debit}` : ''}</div>
							<div className="transactions__categories">
								<Select.Creatable
									name="form-field-name"
									options={options}
									onChange={logChange}
								/>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};
