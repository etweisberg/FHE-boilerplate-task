import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import ToxicPerson from './ToxicPerson';
import { getToxicByID } from './api';

interface ToxicPersonProps {
  firstName: string;
  lastName: string;
  pictureUrl: string;
  _id: string;
  toxicTraits: Array<string>;
}

function ToxicPersonPage() {
  const { id } = useParams();
  const [person, setPerson] = useState<ToxicPersonProps>();

  useEffect(() => {
    async function getPeople() {
      const response = await getToxicByID(id);
      const data = await response.data;
      setPerson(data);
    }

    getPeople();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (person) {
    return (
      <div>
        <h1>{`${person.firstName} ${person.lastName}`}</h1>
        <ul>
          {' '}
          {person.toxicTraits.map((t: string) => (
            <li>{t}</li>
          ))}
        </ul>
      </div>
    );
  }
  return <h1>Not found</h1>;
}

export default ToxicPersonPage;
