const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const mongoose = require('mongoose');
const User = mongoose.model('user');
const List = mongoose.model('list');

const tokenCheck = (req, res, next) => {
  const token = req.session.token || req.get("Authorization");
  if(!token){
    res.status(401);
    res.send("Unauthorized");
  } else {
    next();
  }
};

const getUserFromToken = async (req, res) => {
  let token;
  try {
    user =  await jwt.verify(req.get("Authorization"), keys.jwtKey);
  } catch(err){
    res.status(400);
    res.send("Bad token provided");
    throw err;
  } finally{
    return user;
  }
}
module.exports = app => {

  //middleware requiring token to proceed

  app.post("/todo/create", tokenCheck, (req, res) => {
    getUserFromToken(req, res)
    .then(user => {
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
      });
    })
    .catch(err => {
      res.status(400);
      res.send("Bad token");
    });
  });

  //Get all todo lists
  app.get("/todo", tokenCheck, (req, res) => {
    getUserFromToken(req, res)
    .then(user => {
      List.find({user: user.id})
      .then(lists => {
        let safeLists = [];

        lists.forEach(list => {
          safeLists.push({
            _id: list._id,
            title: list.title,
            tasks: list.tasks
          })
        });
        res.send(safeLists);
      })
    })
    .catch(err => {
      res.status(400);
      res.send("Bad token");
    });
  })

  app.put("/todo/save", tokenCheck,(req, res) => {
    const list  = req.body;
    List.findById(list._id)
    .then(target => {
      target.set({
        title: list.title,
        tasks: list.tasks
      });
      target.save()
      .then(ok => res.send(200))
      .catch(err => res.send(500));
    })
    .catch(err => {
      res.send(404);
    })
  });

  app.delete("/todo/delete", tokenCheck, (req, res) => {
    const list = req.body;
    List.deleteOne({ _id: list._id })
    .then(res => res.send(200))
    .catch(err => res.send(404));
  });
}