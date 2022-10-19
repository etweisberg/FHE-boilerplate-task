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
  email: string,
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
    email,
    password: hashedPassword,
    pictureUrl,
    toxicTraits,
  });
  const toxicPerson = await newToxicPerson.save();
  return toxicPerson;
};

const addToxicTraits = async (email: string, traits: [string]) => {
  const toxic = await ToxicPerson.updateOne(
    { email },
    { $push: { toxicTraits: { $each: traits } } },
  ).exec();
  return toxic;
};

const getToxicPersonByEmail = async (email: string) => {
  const toxicPerson = await ToxicPerson.findOne({ email })
    .select(removeSensitiveDataQuery)
    .exec();
  return toxicPerson;
};

export {
  passwordHashSaltRounds,
  getAllToxicPersonsFromDB,
  createToxicPerson,
  addToxicTraits,
  getToxicPersonByEmail,
};
