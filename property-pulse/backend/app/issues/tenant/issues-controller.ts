import issuesService from './issues-service';
import express from 'express';

const router = express.Router();

router
/*
get all of a logged in user's issues.
 */
.get('/api/tenant/issues', async(req,res) =>{
	const user = req.user;
	const issues = await issuesService.getAllIssues(user)

	return res.status(200).json(issues)
})

export default router;