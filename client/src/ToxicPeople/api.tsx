import { getData, postData } from '../util/api';

async function getToxicPeople() {
  const res = await getData('toxic/all');
  return res;
}

async function getToxicByID(id: string) {
  const res = await postData('toxic/toxic-person', { id });
  return res;
}

export { getToxicPeople, getToxicByID };
