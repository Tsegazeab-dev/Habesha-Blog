import express from 'express'
import { updateUser } from '../controller/user.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.put('/update/:id',verifyToken, updateUser)

export default router;