module.exports = {
	createTransaction: (data) => {
		const massagedData = {
			date: data.date,
			description: data.description,
			credit: isNaN(parseFloat(data.credit)) ? 0 : data.credit,
			debit: isNaN(parseFloat(data.debit)) ? 0 : data.debit,
		};

		// console.log(parseFloat(massagedData.credit) === NaN);

		return new Promise((resolve, reject) => {
			Transaction.create(massagedData).exec((err, transaction) => {
				console.log(massagedData);
				if (transaction) {
					console.log('resolved', transaction);
					resolve(transaction);
				} else if (err) {
					console.log('transaction', transaction);
					reject(err);
				}
			});
		});
	},
	getTransaction: () => {
		return Transaction.findAll();
	},
};
