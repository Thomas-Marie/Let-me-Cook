import express from 'express';
const app = express();
const port = 3000;

require('dotenv').config({ path: './.env.local' });

app.get('/', (req, res) => {
	res.send('test request');
});

app.listen(port, () => {
	console.log(`test exemple app listening at http://localhost:${port}`);
});
