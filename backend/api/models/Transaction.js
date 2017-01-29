/**
 * Transaction.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	attributes: {
		date: {
			type: 'datetime',
		},
		description: {
			type: 'string',
		},
		credit: {
			type: 'float',
			defaultsTo: 0,
		},
		debit: {
			type: 'float',
			defaultsTo: 0,
		},
	},
};

