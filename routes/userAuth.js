const moongoose = require('mongoose');
const User = moongoose.model('user');
const bcrypt = require('bcrypt');
async function getUser(email) {
  let user = await User.findOne({email: email});
  return user;
}
module.exports = app => {
  app.get("/auth/login", (req, res) => {

  });

  app.get("/auth/logout", (req, res) => {

  });

  app.post("/auth/validate", (req, res) => {
    const email = req.body.email;

    if(email){
      let user = getUser(email);
      if(user){
        res.status(409);
        res.send({
          status: 409,
          err: "Email already used"
        });
      }
      res.send();
    } else {
      res.status(400);
      res.send({
        status: 400,
        error: "No email parameter"
      });
    }
  });

  app.post("/auth/signup", (req, res) => {
    const { username, email, password } = req.body;
    if(!getUser(email)){
      bcrypt.hash(password, 10)
      .then(pass => {

        new User({
          username: username,
          email: email,
          password: pass
        }).save()
        .then(user => {
          res.send("User signed up successfully");
        });

      });
    } else {
      res.status(409)
      res.send("User exists");
    }
  });

};