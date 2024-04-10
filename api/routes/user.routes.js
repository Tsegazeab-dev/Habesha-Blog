import express from 'express'
import { deleteUser, updateUser } from '../controller/user.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';
import { signOut } from '../controller/user.controller.js';

const router = express.Router();

router.put('/update/:id',verifyToken, updateUser)
router.delete('/delete/:id', verifyToken, deleteUser)
router.get("/signout", signOut);

export default router;