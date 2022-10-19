import { getData, postData } from '../util/api';

async function getToxicPeople() {
  const res = await getData('toxic/all');
  if (res.error) return false;
  return true;
}

async function getToxicByID(id: string) {
  const res = await postData('toxic/toxic-person', { id });
  if (res.error) return false;
  return true;
}

export { getToxicPeople, getToxicByID };
