const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const Keygrip = require('keygrip');
const app = express();

require('./models/User');
require('./models/List');

//Set middlewares
app.use(bodyParser.json());
app.use(cookieSession({
  name: "session",
  keys: new Keygrip([keys.cookieKey1, keys.cookieKey2], 'SHA-358', 'base-64'),
  maxAge: 30 * 24 * 60 * 60 * 1000,
  secure: true,
  httpOnly: true,
}))

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

require('./routes/userAuth')(app);
require('./routes/todo')(app);

app.get("/", (req, res) => {
  res.send("Heya");
});

app.listen(process.env.PORT || 5000);

