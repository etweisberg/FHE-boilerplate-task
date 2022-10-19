/*
 * TODO: Fill this out with the service layer for your toxic person! Hint: tale a look at user.service.ts and see how that service
 * uses the User model to save and update to the database.
 */
import { hash } from 'bcrypt';
import { ToxicPerson } from '../models/toxicperson.model';

const passwordHashSaltRounds = 10;
const removeSensitiveDataQuery = [
  '-password',
  '-verificationToken',
  '-resetPasswordToken',
  '-resetPasswordTokenExpiryDate',
];

const getAllToxicPersonsFromDB = async () => {
  const toxicPersonList = await ToxicPerson.find({})
    .select(removeSensitiveDataQuery)
    .exec();
  return toxicPersonList;
};

const createToxicPerson = async (
  firstName: string,
  lastName: string,
  password: string,
  pictureUrl: string,
  toxicTraits: [string],
) => {
  const hashedPassword = await hash(password, passwordHashSaltRounds);
  if (!hashedPassword) {
    return null;
  }
  const newToxicPerson = new ToxicPerson({
    firstName,
    lastName,
    password: hashedPassword,
    pictureUrl,
    toxicTraits,
  });
  const toxicPerson = await newToxicPerson.save();
  return toxicPerson;
};

const addToxicTraits = async (id: string, traits: [string]) => {
  const toxic = await ToxicPerson.findByIdAndUpdate(id, {
    $push: { toxicTraits: { $each: traits } },
  }).exec();
  return toxic;
};

const getToxicPersonByID = async (id: string) => {
  const toxicPerson = await ToxicPerson.findById(id)
    .select(removeSensitiveDataQuery)
    .exec();
  return toxicPerson;
};

export {
  passwordHashSaltRounds,
  getAllToxicPersonsFromDB,
  createToxicPerson,
  addToxicTraits,
  getToxicPersonByID,
};
