import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface ToxicPersonProps {
  firstName: string;
  lastName: string;
  pictureUrl: string;
}

export default function ToxicPerson({
  firstName,
  lastName,
  pictureUrl,
}: ToxicPersonProps) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" height="140" image={pictureUrl} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {`${firstName} ${lastName}`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
