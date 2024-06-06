import express from 'express';
const router = express.Router();
import { signup } from '../controller/auth_controller.js';

router.post('/signup', signup)

export default router;