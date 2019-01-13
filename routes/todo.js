const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const mongoose = require('mongoose');
const User = mongoose.model('user');
const List = mongoose.model('list');
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
const getUserFromToken = (req) => {
  //Decrypt saved session from cookie    
  const safeToken = req.headers.cookie.split("sess=")[1];
  const hash = new Cryptr(keys.cookieKey);
  const token = hash.decrypt(safeToken);
  let user = jwt.verify(token, keys.jwtKey);

  return user;
}
module.exports = app => {

  //middleware requiring token to proceed
  app.post("/todo/create", tokenCheck,(req, res) => {
    const user = getUserFromToken(req, res);
    new List({
      user: user.id,
      title: "Untitled",
      modified: Date.now(),
      tasks: [{
        checked: false,
        message: "Your task here"
      }]
    }).save()
    .then(list => {
      res.send(list);
    })
    .catch(err => {
      res.status(400);
      res.send("Bad token");
    });
  });

  //Get all todo lists
  app.get("/todo", tokenCheck, (req, res) => {
    const user = getUserFromToken(req);
    List.find({ user: user.id })
    .then(lists => {
      const safeLists = [];

      lists.forEach(list => {
        safeLists.push({
          id: list.id,
          title: list.title,
          tasks: list.tasks
        });
      })
      res.send(safeLists);
    }) 
  })

  app.put("/todo/save", tokenCheck,(req, res) => {
    const list  = req.body;
    List.findById(list.id)
    .then(target => {
      target.set({
        title: list.title,
        tasks: list.tasks
      });
      target.save()
      .then(ok => res.send(200))
      .catch(err => res.send(500));
    })

  });

  app.post("/todo/delete", tokenCheck,(req, res) => {
    const list = req.body;
    console.log(list);
    List.deleteOne({ _id: list.id })
    .then(ok => res.send(200))
    .catch(err => res.send(404));
  });
}