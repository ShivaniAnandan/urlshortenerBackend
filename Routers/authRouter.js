import express from 'express';
import {signup, login, forgetPassword , resetPassword , getAllUser}  from '../Controller/authController.js';
const router = express.Router();

router.post('/signup', signup);
// router.get('/activate/:token', activateAccount);
router.post('/login',login)
router.get('/getAlluser',getAllUser)
router.post('/forget-password',forgetPassword)
router.post('/reset-password/:token',resetPassword)


// Additional routes for login, forgot password, etc.

export default router;
