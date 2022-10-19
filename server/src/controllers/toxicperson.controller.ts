/*
 * TODO: Fill this out with the controller layer for your toxic person! Hint: Look at how admin.controller.ts
 * works in the controller layer, how it deals with the interface of IUser, and how it utilizes functions from the service layer.
 */
import express from 'express';
import ApiError from '../util/apiError';
import StatusCode from '../util/statusCode';
import { IToxicPerson } from '../models/toxicperson.model';
import {
  createToxicPerson,
  getToxicPersonByID,
  addToxicTraits,
  getAllToxicPersonsFromDB,
} from '../services/toxicperson.service';

const getAllToxicPersons = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  return (
    getAllToxicPersonsFromDB()
      .then((toxicPersonList) => {
        res.status(StatusCode.OK).send(toxicPersonList);
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((e) => {
        next(ApiError.internal('Unable to retrieve all toxic people'));
      })
  );
};

const getToxicPerson = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { id } = req.body;
  const existingUser: IToxicPerson | null = await getToxicPersonByID(id);
  if (!existingUser) {
    next(ApiError.badRequest(`An account with id ${id} does not exist.`));
  } else {
    res.status(StatusCode.OK).send(existingUser);
  }
};

const create = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { id, firstName, lastName, password, pictureUrl, toxicTraits } =
    req.body;
  if (!firstName || !lastName || !password || !pictureUrl || !toxicTraits) {
    next(ApiError.missingFields(['firstName', 'lastName', 'password']));
    return;
  }

  const passwordRegex = /^[a-zA-Z0-9!?$%^*)(+=._-]{6,61}$/;
  const nameRegex = /^[a-z ,.'-]+/i;

  if (
    !password.match(passwordRegex) ||
    !firstName.match(nameRegex) ||
    !lastName.match(nameRegex)
  ) {
    next(ApiError.badRequest('Invalid password, or name.'));
    return;
  }
  const existingUser: IToxicPerson | null = await getToxicPersonByID(id);
  if (existingUser) {
    next(ApiError.badRequest(`An account with id ${id} already exists.`));
    return;
  }
  try {
    const toxicPerson = await createToxicPerson(
      firstName,
      lastName,
      password,
      pictureUrl,
      toxicTraits,
    );
    await toxicPerson?.save();
    res.sendStatus(StatusCode.CREATED);
  } catch (err) {
    next(ApiError.internal('Unable to register toxic person.'));
  }
};

const addTraits = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { id, traits } = req.body;
  if (!traits) {
    next(ApiError.missingFields(['traits']));
    return;
  }

  const toxicPerson: IToxicPerson | null = await getToxicPersonByID(id);
  if (!toxicPerson) {
    next(ApiError.notFound(`Toxic person with id ${id} does not exist`));
    return;
  }
  addToxicTraits(id, traits)
    .then(() => {
      res.sendStatus(StatusCode.OK);
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .catch((e) => {
      next(ApiError.internal('Unable to add traits'));
    });
};

export { getAllToxicPersons, getToxicPerson, create, addTraits };
