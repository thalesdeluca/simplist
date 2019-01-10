const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const app = express();

require('./models/User');
require('./models/List');

//Set middlewares
app.use(bodyParser.json());

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

require('./routes/userAuth')(app);
app.get("/", (req, res) => {
  res.send("Heya");
});

app.listen(process.env.PORT || 5000);

