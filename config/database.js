const config = {
	database: 'mongodb://localhost:27017/voting',
	secret: 'truongngocsecret020511906'
};

if (process.env.NODE_ENV === 'production') {
	config = {
		database: process.env.DB_URL,
		secret: process.env.SECRET_KEY
	}
}

module.exports = config;
