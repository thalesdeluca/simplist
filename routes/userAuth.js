const moongoose = require('mongoose');
const User = moongoose.model('user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const Cryptr = require('cryptr');

const tokenCheck = (req, res, next) => {
  if(req.headers.cookie){
    if(req.headers.cookie.includes("sess")){
      next();
    } else {
      res.sendStatus(401);
    }
  } else {
    res.sendStatus(401);
  }
}
//Helper function that generates token if password is right
function tryLogin(user, password, res, req) {
  if(!user){
    res.status(404);
    res.send("User not found");
  } else {

    bcrypt.compare(password, user.password)
    .catch((err) => {
      res.status(401);
      res.send("Wrong Password");
    })
    .then((ok) => {
      if(ok){
        let token = jwt.sign({
          id: user.id, 
          username: user.username, 
          email: user.email
        }, keys.jwtKey);

        //Encrypt seesion and save in cookie
        const hash = new Cryptr(keys.cookieKey);
        const safeToken = hash.encrypt(token);

        res.cookie("sess", safeToken, {
          httpOnly: true,
          resave: true,
          saveUninitialized: false,
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        res.send({ 
          name: user.username, 
          email: user.email 
        });
      }
    })
    

  }
}

module.exports = app => {
  app.post("/auth/login", (req, res) => {
    const { email, password } = req.body;
    if(email){
      User.findOne({ email: email })
      .then(user => {
        tryLogin(user, password, res, req);
      })
    }
  }); 

  app.get("/auth/logout", (req, res) => {
    res.clearCookie('sess', {path: '/'});
    res.clearCookie('session', { path: '/'});
    res.send(200);
  });

  app.get("/auth/user", tokenCheck, (req, res) => {
    const safeToken = req.headers.cookie.split("sess=")[1];

    const hash = new Cryptr(keys.cookieKey);
    const token = hash.decrypt(safeToken);
    let user = jwt.verify(token, keys.jwtKey);

    res.send({
      email: user.email,
      name: user.username
    });
  })

  app.post("/auth/validate", (req, res) => {
    const email = req.body.email;
    if(email){
      User.findOne({email: email})
      .then(user => {
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
    User.findOne({email: email})
    .then(user => {
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