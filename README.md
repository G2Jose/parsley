# Parsley

An offline version of Mint for personal use. Download transactions as a .csv file from online banking instead of linking to your bank account.

## How to use

### Without Docker

* Replace `backend/data/transactions.csv` file with a file provided by your own bank. Ensure that it has a header row that looks like: 'date', 'description', 'credit', 'debit'
* Install backend dependencies `cd backend && npm install`
* Start mongodb on port `27017` (default port)
* Start backend `./node_modules/.bin/sails lift`
* Install frontend dependencies `cd frontend && npm install`
* Start frontend `cd frontend && npm start`

You should now be able to access the application at [http://localhost:3000](http://localhost:3000)

### With Docker

* Run `docker-compose build && docker-compose up`

You should now be able to access the application at [http://localhost:3000](http://localhost:3000)
