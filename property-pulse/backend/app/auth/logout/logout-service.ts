const logoutUser = async (req, res, next) => {
	// Some online posts questions the use of req.logout (From passport) and found req.session.destroy to be reliable.
	// Using both just in case.
	req.logout(() => {
		req.session.destroy(() => {
			res.clearCookie('connect.sid').status(200).json({ msg: 'Successfully logged out' });
		});
	});
};

export default { logoutUser };