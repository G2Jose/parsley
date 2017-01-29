/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

/*
  globals
  sails: true
*/

const parse = require('csv-parse/lib/sync');
const fs = require('fs');

module.exports.bootstrap = function (cb) {
  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
	const inputFile = 'data/transactions.csv';
	// const lines = fs.readFileSync(inputFile).toString().split('\n');
	const parsed = parse(fs.readFileSync(inputFile).toString(), {
		auto_parse: true,
		columns: true,
	});
	const promises = [];
	parsed.forEach(item => {
		promises.push(sails.services.transactionservice.createTransaction(item));
	});
	// console.log(promises);
	Promise.all(promises)
	// promises[1].then
	.then(() => {
		console.log('Done');
		cb();
	})
	.catch(console.log);
	// cb();
};
