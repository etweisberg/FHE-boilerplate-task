import * as React from 'react';
import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import ToxicPerson from './ToxicPerson';
import { getToxicPeople } from './api';

interface ToxicPersonProps {
  firstName: string;
  lastName: string;
  pictureUrl: string;
  _id: string;
}

function ToxicPersonDashboard() {
  const [toxicPeople, setToxicPeople] = useState([]);

  useEffect(() => {
    async function getPeople() {
      const response = await getToxicPeople();
      const data = await response.data;
      setToxicPeople(data);
    }

    getPeople();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      <Typography variant="h3">☣️ Biohazards Near You ☣️</Typography>
      <Grid
        container
        spacing={0}
        direction="row"
        justifyContent="center"
        padding="3vh"
      >
        {toxicPeople.map((p: ToxicPersonProps) => (
          <Grid item padding="2vh" direction="row">
            <ToxicPerson
              firstName={p.firstName}
              lastName={p.lastName}
              pictureUrl={p.pictureUrl}
              // eslint-disable-next-line no-underscore-dangle
              id={p._id}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

export default ToxicPersonDashboard;
