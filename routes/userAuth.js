const moongoose = require('mongoose');
const User = moongoose.model('user');
const bcrypt = require('bcrypt');


module.exports = app => {
  app.get("/auth/login", (req, res) => {

  });

  app.get("/auth/logout", (req, res) => {

  });

  app.post("/auth/validate", (req, res) => {
    const email = req.body.email;
    if(email){
      User.findOne({email: email}).then(user => {
        if(user){
          res.status(409);
          res.send({
            status: 409,
            err: "Email already used"
          });
        }
        res.send("User doesn't exist");
      });
      
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
    User.findOne({email: email}).then(user => {
      if(!user){
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
    })
  });
} 