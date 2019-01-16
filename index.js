const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const session = require('express-session');
const app = express();

require('./models/User');
require('./models/List');

app.set('trust proxy', 1) 
//Set middlewares
app.use(bodyParser.json());

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

require('./routes/userAuth')(app);

require('./routes/todo')(app);

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static('client/build'));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(process.env.PORT || 5000);

