const auth = require('json-server-auth');
const jsonServer = require('json-server');
const express = require('express');
const http = require('http');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

app.use(cors());

const router = jsonServer.router('db.json');

// response middleware
router.render = (req, res) => {
	res.json(res.locals.data);
};
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 9000;

// Bind the router db to the app
app.db = router.db;
app.use(middlewares);

const rules = auth.rewriter({
	users: 640,
	teams: 660,
	projects: 660,
});

app.use(rules);
app.use(auth);
app.use(router);
server.listen(port);
