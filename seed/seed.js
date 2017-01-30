const parse = require('csv-parse/lib/sync');
const fs = require('fs');
const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({
  host: process.env.ELASTICSEARCHURL || 'localhost:9200',
//   log: 'trace',
});

client.ping().then(() => {
	console.log('ping success');
	client.indices.delete({ index: 'parsley' })
	.then(() => {
		client.indices.create({
			index: 'parsley',
		})
		.then((res) => {
			console.log('created index');
			const inputFile = 'data/transactions.csv';

			const parsed = parse(fs.readFileSync(inputFile).toString(), {
				auto_parse: true,
				columns: true,
			}).map((transaction) => {
				return {
					...transaction,
					date: new Date(transaction.date),
					credit: transaction.credit === '' ? 0 : transaction.credit,
					debit: transaction.debit === '' ? 0 : transaction.debit,
				};
			});
			
			const elasticPayload = parsed.reduce((body, transaction) => {
				body.push({ index: { _index: 'parsley', _type: 'transaction' } });
				body.push(transaction);
				return body;
			}, []);

			// console.log(elasticPayload);

			client.bulk({
				body: elasticPayload,
			})
			.then(console.log('Seeded data')).catch(() => console.log('Error seeding data'));

		})
		.catch(error => console.log('error creating index'));
	})
	.catch(() => {
		client.indices.create({
			index: 'parsley',
		})
		.then((res) => {
			console.log('created index');
			const inputFile = 'data/transactions.csv';

			const parsed = parse(fs.readFileSync(inputFile).toString(), {
				auto_parse: true,
				columns: true,
			}).map((transaction) => {
				return {
					...transaction,
					date: new Date(transaction.date),
					credit: transaction.credit === '' ? 0 : transaction.credit,
					debit: transaction.debit === '' ? 0 : transaction.debit,
				};
			});
			
			const elasticPayload = parsed.reduce((body, transaction) => {
				body.push({ index: { _index: 'parsley', _type: 'transaction' } });
				body.push(transaction);
				return body;
			}, []);

			// console.log(elasticPayload);

			client.bulk({
				body: elasticPayload,
			})
			.then(console.log('Seeded data')).catch(() => console.log('Error seeding data'));

		})
		.catch(error => console.log('error creating index'));
	});
}).catch(() => console.log('ping error'));





