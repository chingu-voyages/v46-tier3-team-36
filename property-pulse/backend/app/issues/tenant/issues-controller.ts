import issuesService from './issues-service';
import express from 'express';

const router = express.Router();

router
/*Tenant creates a new issue */
.post('/api/tenant/issues', async (req, res) => {
	const user = req.user;
	console.log("THE REQ.body:-----",req.body)
	const newIssue = await issuesService.createIssue(user,req.body)

	return res.status(201).json(newIssue);
})
/*get all of lgged in tenant's issues.*/
.get('/api/tenant/issues', async(req,res) =>{
	const user = req.user;
	const issues = await issuesService.getAllIssues(user)

	return res.status(200).json(issues)
})

export default router;