import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import ToxicPerson from './ToxicPerson';
import { getToxicPeople } from './api';

function ToxicPersonPage() {
  const { id } = useParams();
  return (
    <div>
      <h1>{id}</h1>
    </div>
  );
}

export default ToxicPersonPage;
