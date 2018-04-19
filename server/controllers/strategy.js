const Auth0Strategy = require("passport-auth0");

const strat = new Auth0Strategy(
  {
    domain: process.env.DOMAIN,
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    scope: "openid profile",
    callbackURL: "/auth"
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    return done(null, profile);
  }
);
const logout = (req, res) => {
  req.session.destroy();
  res.redirect("http://localhost:3004");
};
module.exports = {
  strat,
  logout
};
