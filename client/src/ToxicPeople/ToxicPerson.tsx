import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

interface ToxicPersonProps {
  firstName: string;
  lastName: string;
  pictureUrl: string;
  id: string;
}

function ToxicPerson({
  firstName,
  lastName,
  pictureUrl,
  id,
}: ToxicPersonProps) {
  const navigate = useNavigate();
  const navigatePerson = () => {
    navigate(`/toxicpeople/${id}`);
  };
  return (
    <Card
      sx={{ maxWidth: 345, '&:hover': { transform: 'scale3d(1.05, 1.05, 1)' } }}
    >
      <CardActionArea onClick={navigatePerson}>
        <CardMedia component="img" height="140" image={pictureUrl} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {`${firstName} ${lastName}`}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ToxicPerson;
