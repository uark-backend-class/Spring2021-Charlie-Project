const express = require('express');
const routes = require('./routes');
const exphbs = require('express-handlebars');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('./models/user.model');
const flash = require('connect-flash');
require('./db.js');

  passport.use(new GoogleStrategy({
  clientID: "clientID.apps.googleusercontent.com",
  clientSecret: "clientsecret",
  callbackURL: "/auth/google/redirect"
}, async (accessToken, refreshToken, profile, done) => {
  let currentUser = await User.findOne({ googleId: profile.id });

  if (currentUser) {
    done(null, currentUser);
  }
  else {

    const newUser = new User({
      displayName: profile.displayName,
      email: profile.emails[0].value,
      googleId: profile.id,
    });

    await newUser.save();

    done(null, newUser);
  }
}));
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id, "name email _id");
  done(null, user);
});

const app = express();

app.use(
  session({
    secret: 'keyboard-dog',
  })
);

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.urlencoded()); // parse url encoded data and put it into req.body
app.use(express.json()); // parse json data and put it into the req.body
// app.use(express.static('./public'));
app.use(routes);

app.listen(process.env.PORT || 3000, () => {
  console.log('Now listening...');
});
