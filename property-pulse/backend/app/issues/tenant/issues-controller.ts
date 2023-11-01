import issuesService from './issues-service';
import express from 'express';

const router = express.Router();

router
/*
get all of a logged in user's issues.
 */
.get('/api/tenant/issues', async(req,res) =>{
	const user = req.user;
	console.log("received a request")
	
	return res.status(200).json("got your request.")
	//return res.status(200).json(user)
})

export default router;