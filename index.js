const express = require('express');

const app = express();

app.use((req, res) => {
  res.send("Heya");
});

app.listen(process.env.PORT || 5000);

