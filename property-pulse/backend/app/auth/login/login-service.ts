import passport from "passport";

const loginUser = async (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) return next(err);
    if (!user) { return res.redirect('/login'); }

    req.logIn(user, function(err) {
      if (err) return next(err);
        
      return res.status(200).json({ user });
    });
  })(req, res);
};

export default { loginUser };