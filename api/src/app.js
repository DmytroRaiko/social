const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const config = require('./services/config');

// require route directory
const profilesRoutes = require('./routes/profiles');
const postsRoutes = require('./routes/posts');

const portApp = config.appPort;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('secret key'));
app.use(express.json());

app.use('/profiles', profilesRoutes);
app.use('/posts', postsRoutes);

app.listen(portApp, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening at: http://localhost:${portApp}`);
});
