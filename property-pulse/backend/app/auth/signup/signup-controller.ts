import signupService from './signup-service';
import express from 'express';

const router = express.Router();

router.post('/', async (request, response) => {
  const { email, password } = request.body;

  const newUser = await signupService.saveUser(email, password );
  response.status(201).json(newUser);
})

export default router;