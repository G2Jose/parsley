import moment from 'moment';

const aggregateByMonth = (data) => {
	if (!data)
		return null;
	const categorized = data.reduce((transactions, transaction) => {
		const m = new Date(transaction.date);
		const categorizedDate = new Date(m.getFullYear(), m.getMonth(), 1, 0, 0, 0, 0);
		if (categorizedDate in transactions) {
			transactions[categorizedDate].credit =  transactions[categorizedDate].credit + transaction.credit;
			transactions[categorizedDate].debit = transactions[categorizedDate].debit + transaction.debit;
		} else {
			transactions[categorizedDate] = {
				credit: !isNaN(parseFloat(transaction.credit)) ? parseFloat(transaction.credit) : 0,
				debit: !isNaN(parseFloat(transaction.debit)) ? parseFloat(transaction.debit) : 0,
			};
		}
		return transactions;
	}, {});
	const array = Object.keys(categorized).sort((a, b) => new Date(a) - new Date(b)).map(key => {
		return {
			date: moment(key).format('MMM YYYY'),
			credit: categorized[key].credit,
			debit: categorized[key].debit,
		};
	});
	return array;
};

const summarize = (data) => {
	if (!data)
		return null;
	const wordsToRemove = [
		/Point of Sale/ig, / - /ig, /INTERAC RETAIL PURCHASE/ig, / [0-9]{4,12}/g,
	];
	return data.map((transaction) => {
		return {
			...transaction,
			description: wordsToRemove.reduce((newDescription, keyword) => {
				return newDescription.replace(keyword, '');
			}, transaction.description),
		};
	});
};

export {
	aggregateByMonth,
	summarize,
};
