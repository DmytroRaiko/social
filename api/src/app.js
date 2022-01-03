const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const config = require('./services/config');

// require route directory
const profilesRoutes = require('./routes/profiles');
const universityRoutes = require('./routes/university');

const portApp = config.appPort;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use('/profiles', profilesRoutes);
app.use('/university', universityRoutes);

app.listen(portApp, () => {
  console.log(`App listening at: http://localhost:${portApp}`);
});
