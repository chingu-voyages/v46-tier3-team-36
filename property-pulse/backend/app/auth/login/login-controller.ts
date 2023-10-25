import loginService from './login-service';
import express from 'express';

const router = express.Router();

router.post('/api/auth/login', async (req, res) => {
  loginService.loginUser(req, res)
})

export default router;