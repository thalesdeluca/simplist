# simplist
A simple ToDo list app made with React/Redux, NodeJS/Express and JWT
<br/>
App available at: https://simplist-todo.herokuapp.com/

## Installation
First of all, clone the repository and enter the folder:

```
git clone https://github.com/thalesdeluca/simplist.git
cd simplist
```

After this install server dependencies: 

``
npm i
``

Then, enter client folder and install it's dependencies:

```
cd client
npm i
```

Now return to the server folder, go to `simplist/config` folder and create a file ``dev.js`` with the following:
```
module.exports = {
  mongoURI: //The mongo db connect url,
  cookieKey: //some random string/key,
  jwtKey: //some random string/key
}
```

Finally, on the server folder run:
```
cd ..
npm run dev
```

And voilá, you're set!
