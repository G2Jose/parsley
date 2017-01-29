const mongoose = require('mongoose');

const SALT_WORK_FACTOR = 10;

const DB_BASE_URL = (process.env.DB_BASE_URL || '127.0.0.1:27017');
const url = `${DB_BASE_URL}/pizzaProject`;

console.log('Attempting to connect to mongodb on url', url);
mongoose.Promise = global.Promise;

const connectWithRetry = function() {
  return mongoose.connect(url, { server: { reconnectTries: Number.MAX_VALUE } }, function(err) {
	if (err) {
		console.error('Failed to connect to mongo on startup - retrying in 5 sec', err);
		setTimeout(connectWithRetry, 5000);
	}
  });
};

connectWithRetry();
const db = mongoose.connection;

db.on('connecting', () => {
	console.log('connecting');
});

db.on('connected', () => {
	console.log('connected');
});

// db.once('connected');

const userSchema = mongoose.Schema({
	username: {
		type: String, required: true, index: {unique: true},
	},
	password: {
		type: String,
	},
	name: String,
	phoneNumber: String,
});

userSchema.pre('save', function(next) {
	const user = this;
	if (!user.isModified('password')) {
		return next();
	}
	bcrypt.genSalt(SALT_WORK_FACTOR, function(saltError, salt) {
		if (saltError) {
			return next(saltError);
		}
		bcrypt.hash(user.password, salt, function(hashError, hash) {
			if (hashError) {
				return next(hashError);
			}
			user.password = hash;
			next();
		});
	});
});

userSchema.methods.comparePassword = function(testPassword) {
	return new Promise((resolve, reject) => {
		bcrypt.compare(testPassword, this.password, function(err, isMatch) {
			if (err) {
				reject(err);
			}
			resolve(isMatch);
		});
	});
};

const orderSchema = mongoose.Schema({
	options: {
		type: { type: String, enum: ['Build Your Own', 'Hawaiian', 'ATB Special', 'Meat Lovers', 'Classic Pepperoni'] },
		details: {
			size: { type: String, enum: ['Small', 'Medium', 'Large'] },
			crustStyle: { type: String, enum: ['Original', 'Whole Wheat', 'Gluten Free'] },
			baseSauce: { type: String, enum: ['Alfredo', 'Tomato'] },
			cheese: { type: String, enum: ['Cheddar', 'Jack', 'Mozzarella'] },
			meats: { type: Array },
			otherToppings: { type: Array }
		},
	},
	orderDate: { type: Date, default: Date.now },
	username: { type: String, required: true },
});


const User = mongoose.model('User', userSchema);
const Order = mongoose.model('Order', orderSchema);

export {
	Order,
	User,
};
