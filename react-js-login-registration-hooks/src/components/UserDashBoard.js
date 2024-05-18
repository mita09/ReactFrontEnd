import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, CircularProgress, Box } from '@mui/material';
import ProductService from "../services/product.service";
import EventBus from "../common/EventBus";
import './../customCss/UserDashBoard.css';

export const UserDashBoard = (props) => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    ProductService.getAllProduct().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);

  return (
    <div className="dashboard-container">
      {content ? (
        <div className="row dashboard-row">
          {content.map((d, i) => (
            <div key={`${d.title}-${i}`} className="col-sm-6 col-md-4 col-lg-4 mb-4">
              <Card className="custom-card" sx={{ maxWidth: 345, boxShadow: 3, '&:hover': { boxShadow: 6 } }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={`data:image/jpeg;base64,${d.p_image}`}
                    alt={d.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {d.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Price: {d.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Category: {d.category.name}
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
          ))}
        </div>
      ) : (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
          <CircularProgress />
        </Box>
      )}
    </div>
  );
}
