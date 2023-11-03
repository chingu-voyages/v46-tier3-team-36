import issuesService from './issues-service';
import express from 'express';

const router = express.Router();

router
/*Tenant creates a new issue */
.post('/api/tenant/issues', async (req, res) => {
	const user = req.user;
	const newIssue = await issuesService.createIssue(user,req.body)

	return res.status(201).json(newIssue);
})
/*Tenant gets all of their issues.*/
.get('/api/tenant/issues', async(req,res) =>{
	const user = req.user;
	const issues = await issuesService.getAllIssues(user)

	return res.status(200).json(issues)
})
/*Tenant updates an issue */
.patch('/api/tenant/issues', async (req,res) => {
	const user = req.user;
	const issue = await issuesService.updateIssue(Number(req.query.id), req.body);

	return res.status(200).json(issue)
})
/*Tenant deletes an issue */
.delete('/api/tenant/issues', async (req, res) =>{
	console.log("received a delete request.")
	const user = req.user;
	const issue = await issuesService.deleteIssue(Number(req.query.id));

	return res.status(200).json(issue);
})

export default router;