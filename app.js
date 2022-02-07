const express = require("express");
const app = express();
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
const bodyParser = require('body-parser');

const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");
const User = require('./models/User');

const passport = require('passport');

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());


app.get("/", (req, res) => {
  const user = new User({
    handle: 'jim',
    email: 'jim@jim.com',
    password: "password"
  })
  user.save()
  res.send("Hello World from mern twitter");
});

// const passport = require('passport');
app.use(passport.initialize());
require('./config/passport')(passport);


app.use("/api/users", users);
app.use("/api/tweets", tweets);


const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

