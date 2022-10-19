/*
 * TODO: Fill this out with the routes layer for your toxic person! Hint: tale a look at admin.route.ts and see how that file
 * defines the routes that will be hit by the backend, and which functions they call from the controller layer to perform the
 * desired function.
 */
import express from 'express';
import {
  getAllToxicPersons,
  create,
  addTraits,
} from '../controllers/toxicperson.controller';
import 'dotenv/config';

const router = express.Router();

router.get('/all', getAllToxicPersons);

router.put('/add-traits', addTraits);

router.post('/create-toxic', create);

export default router;
