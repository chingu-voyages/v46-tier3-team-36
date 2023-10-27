import passport from "passport";

const loginUser = async (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
	if (err) return next(err);
    if (!user) return res.status(401).json({ msg: info.message });

    req.logIn(user, function(err) {
      if (err) return next(err);
        
      return res.status(200).json({ user });
    });
  })(req, res);
};

export default { loginUser };