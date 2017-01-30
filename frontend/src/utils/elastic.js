import elasticsearch from 'elasticsearch';

const index = 'parsley';

const elastic = new elasticsearch.Client({
	host: 'localhost:9200',
});

const getAll = (input = 'transaction') => {
	return elastic.search({
		index,
		type: input,
		body: { query: {} },
		size: 100000,
	});
};

const update = (id, newField, type = 'transaction') => {
	return elastic.update({
		index,
		type,
		id,
		body: {
			newField,
		},
	});
};

export {
	getAll,
	update,
};
