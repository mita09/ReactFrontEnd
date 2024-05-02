import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import './../customCss/adminDashboard.css';

export const AdminDashBoard = (props) => {
  return (
    <div className="row">
      {props.data
        ? props.data.map((d, i) => (
            <div key={`${d.title}-${i}`} className="col-sm-6 col-md-4 col-lg-4">
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={d.image}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {d.title} {/* Access title property of each data object */}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    {d.text}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    Share
                  </Button>
                </CardActions>
              </Card>
            </div>
          ))
        : "Loading..."}
    </div>
  );
}
