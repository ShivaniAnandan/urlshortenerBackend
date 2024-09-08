import express from 'express';
import {signup, login, forgetPassword , resetPassword , getAllUser}  from '../Controller/authController.js';
const router = express.Router();

router.post('/signup', signup);
router.post('/login',login)
router.get('/getAlluser',getAllUser)
router.post('/forget-password',forgetPassword)
router.post('/reset-password/:token',resetPassword)




export default router;
