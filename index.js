const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const mongoose = require('mongoose');
const helmet = require('koa-helmet');

const moviesRouter = require('./routes/movies');

mongoose.connect(process.env.MONGO_URL);
mongoose.connection.on('error', console.error);

const app = new Koa();

app
  .use(logger())
  .use(bodyParser())
  .use(helmet())
  .use(moviesRouter.routes());

app.listen(process.env.PORT);
