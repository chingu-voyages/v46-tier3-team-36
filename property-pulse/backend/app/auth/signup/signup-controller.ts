import signupService from './signup-service';
import express from 'express';

const router = express.Router();

router.post('/api/auth/signup', async (request, response) => {
  const { name, email, password } = request.body;

  const newUser = await signupService.saveUser(name, email, password );
  response.status(201).json(newUser);
})

export default router;