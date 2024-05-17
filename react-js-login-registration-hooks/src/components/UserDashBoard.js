import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import React, { useState, useEffect } from "react";
import { Button, CardActionArea, CardActions } from '@mui/material';
import './../customCss/UserDashBoard.css';
import ProductService from "../services/product.service";
import EventBus from "../common/EventBus";

export const UserDashBoard = (props) => {

  const [content, setContent] = useState("");

useEffect(() => {
  ProductService.getAllProduct().then(
    (response) => {
      setContent(response.data);
      console.log("here-- " + content);
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
}, []); // Empty dependency array means this effect runs only once, on component mount


  return (
    <div className="row container">
      {content
        ? content.map((d, i) => (
            <div key={`${d.title}-${i}`} className="col-sm-6 col-md-4 col-lg-4 mb-3">
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={`data:image/jpeg;base64,${d.p_image}`}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {d.name} {/* Access title property of each data object */}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                     Price :{d.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                     Category : {d.category.name}
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
