import issuesService from './issues-service';
import express from 'express';

const router = express.Router();

router
	/**
	 * Create a new issue
	 */
  .post('/api/admin/issues', async (req, res) => {
    const user = req.user;
    const newIssue = await issuesService.createIssue(user, req.body);

    return res.status(201).json(newIssue);
  })

  /**
	 * Get a single issue by the given id
	 */
  .get('/api/admin/issues/:id', async (req, res) => {
    const user = req.user;
    const issue = await issuesService.getIssue(Number(req.params.id))
    
    return res.status(200).json(issue)
  })

  /**
	 * Get all issues for the logged in admin
	 */
  .get('/api/admin/issues', async (req, res) => {
    const user = req.user;
    const issues = await issuesService.getAllIssues(user)
    
    return res.status(200).json(issues)
  })
  /**
	 * Update an issue's status
	 */
  .patch('/api/admin/issue/:id', async (req, res) => {
    const user = req.user;
    const issue = await issuesService.updateIssue(Number(req.params.id), req.body)

    res.status(200).json(issue);
  })
  /**
	 * Delete an issue
	 */
  .delete('/api/admin/issues/:id', async (req, res) => {
    const user = req.user;
    const issue = await issuesService.deleteIssue(Number(req.params.id))

    res.status(200).json(issue);
  })

export default router;