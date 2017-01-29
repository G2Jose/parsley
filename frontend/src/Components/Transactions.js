import React from 'react';
import moment from 'moment';

import { summarize } from '../utils/data';

import './Transactions.css';

export default (props) => {
	const transactions = summarize(props.transactions);
	return (
		<div className="transactions__table">
			<div className="transactions__header">
				<div className="transactions__date">Date</div>
				<div className="transactions__description">Description</div>
				<div className="transactions__credit">Credit</div>
				<div className="transactions__debit">Debit</div>
			</div>
			<div className="transactions__list">
				{transactions && transactions.map(transaction => {
					return (
						<div className="transactions__row">
							<div className="transactions__date">{moment(transaction.date).format('DD MMM YYYY')}</div>
							<div className="transactions__description">{transaction.description}</div>
							<div className="transactions__credit">{transaction.credit > 0 ? `$${transaction.credit}` : ''}</div>
							<div className="transactions__debit">{transaction.debit > 0 ? `$${transaction.debit}` : ''}</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};
