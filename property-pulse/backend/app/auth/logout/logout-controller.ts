import logoutService from './logout-service';
import express from 'express';

const router = express.Router();

router.post('/api/auth/logout', logoutService.logoutUser);

export default router;