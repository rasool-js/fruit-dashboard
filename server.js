const express = require('express');
const path = require('path');
const cors = require('cors');
const router = require('./src/router/index.js');

const app = express();
const pkg = (name) => __dirname + `/node_modules/${name}`;

// setup middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// declare constant
const SERVER_PORT = 3000;
const STATIC_PUBLIC = express.static(__dirname + '/public');
const STATIC_NORMALIZE_CSS = express.static(pkg('normalize.css'));
const STATIC_JQUERY = express.static(pkg('jquery'));

// setup statics
app.use('/static', STATIC_PUBLIC);
app.use('/static/css/normalize', STATIC_NORMALIZE_CSS);
app.use('/static/js/jquery', STATIC_JQUERY);

// setup api and routers
app.use('/api', router.api);
app.use('/view', router.view);

// server handler
function handleServer() {
	return new Promise((resolve, reject) => {
		return app.listen(SERVER_PORT, () => {
			console.log(
				`[SERVER] : listening on http://127.0.0.1:${SERVER_PORT}`,
			);
			return resolve(SERVER_PORT, app);
		});
	});
}

module.exports = handleServer;
