# Parsley

An offline version of Mint for personal use. Download transactions as a .csv file from online banking instead of linking to your bank account.

## How to use

### Without Docker

* Replace `seed/data/transactions.csv` file with a file provided by your own bank. Ensure that it has a header row that looks like: 'date', 'description', 'credit', 'debit'
* Start elasticsearch on port `9200` (default port)
* Seed elasticsearch with data by running `babel-node seed/seed.js`
* Install frontend dependencies `cd frontend && npm install`
* Start frontend `cd frontend && npm start`

You should now be able to access the application at [http://localhost:3000](http://localhost:3000)

### With Docker

* Run `docker-compose build && docker-compose up`

You should now be able to access the application at [http://localhost:3000](http://localhost:3000)

### Issues

* If you receive a `500` error from elasticsearch, you may need to increase window size for search results. You can do so by running `curl -XPUT "http://localhost:9200/parsley/_settings" -d '{ "index" : { "max_result_window" : 500000 } }'`

Contributors welcome
