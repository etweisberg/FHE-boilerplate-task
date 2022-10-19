import * as React from 'react';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import ToxicPerson from './ToxicPerson';
import { getToxicPeople } from './api';

interface ToxicPersonProps {
  firstName: string;
  lastName: string;
  pictureUrl: string;
}

function ToxicPersonDashboard() {
  const [toxicPeople, setToxicPeople] = useState([]);

  useEffect(() => {
    async function getPeople() {
      const response = await getToxicPeople();
      const data = await response.data;
      setToxicPeople(data);
    }

    if (!toxicPeople) {
      getPeople();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container>
      {toxicPeople.map((p: ToxicPersonProps) => (
        <Grid item>
          <ToxicPerson
            firstName={p.firstName}
            lastName={p.lastName}
            pictureUrl={p.pictureUrl}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default ToxicPersonDashboard;
