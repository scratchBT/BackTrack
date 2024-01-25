import express from 'express';
const router = express.Router();
import usersController from '../controllers/usersController.js';


router.post('/login', (req, res) => {
  res.sendStatus(200);
})

router.post('/signup', (req, res) => {
  res.sendStatus(200);
})

router.post('/oauth', (req, res) => {
  res.sendStatus(200);
})

export default router