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


app.listen(process.env.PORT);

