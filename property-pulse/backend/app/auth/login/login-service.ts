import passport from "passport";

const loginUser = async (req, res) => {
  passport.authenticate('local', (err, user) => {
    if (err) throw Error;
    if (!user) { return res.redirect('/login'); }

    req.logIn(user, function(err) {
      if (err) throw Error;
        
      return res.status(200).json({ user });
    });
  })(req, res);
};

export default { loginUser };