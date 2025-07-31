import express from 'express';
const router = express.Router();
import { install } from '../controllers/install.js';
import { register } from '../controllers/register.js';
import { login } from '../controllers/login.js';
import { DeleteUser } from '../controllers/Reset.js';

router.get('/install', install);

router.post('/register', register );

router.post('/login', login);
router.delete('/login/:id', DeleteUser);


export { router };
