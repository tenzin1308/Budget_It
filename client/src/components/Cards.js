import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const Cards = ({
  data = [
    {
      item_type: "",
      name: "",
      price: "",
      image: "",
      url: "",
      store_name: "",
      searched_zipcode: "",
    },
  ],
}) => {
  return (
    <div>
      <Grid
        container
        spacing={4}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {data.length > 0 &&
          Object.values(data).map((item, index) => (
            <Grid item key={`${item.name}-${index}`} xs={4}>
              <Card sx={{ maxWidth: 345 }}>
                <a href={item.url}>
                  <CardMedia
                    component="img"
                    alt="item image"
                    height="240"
                    image={item.image}
                  />
                </a>
                <CardContent>
                  <a href={item.url}>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.name}
                    </Typography>
                  </a>
                  <a href={item.url}>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.price}
                    </Typography>
                  </a>
                  <a href={`www.${item.store_name}.com`}>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.store_name}
                    </Typography>
                  </a>
                  <a href={`www.${item.store_name}.com`}>
                    <Typography gutterBottom variant="h7" component="div">
                      Searched Zipcode: {item.searched_zipcode}
                    </Typography>
                  </a>
                </CardContent>
                {/* <CardActions>
                  <Button size="large">
                    <a href={item.url}>
                      <Typography variant="h5" component="div">
                        {item.name}
                      </Typography>
                    </a>
                  </Button>
                </CardActions>
                <CardActions>
                  <Button size="large">
                    <a href={item.url}>
                      <Typography variant="h5" component="div">
                        {item.price}
                      </Typography>
                    </a>
                  </Button>
                </CardActions>
                <CardActions>
                  <Button size="large">
                    <a href={`www.${item.store_name}.com`}>
                      <Typography variant="h5" component="div">
                        {item.store_name}
                      </Typography>
                    </a>
                  </Button>
                </CardActions>
                <CardActions>
                  <Button size="large">
                    <a href={`www.${item.store_name}.com`}>
                      <Typography variant="h7" component="div">
                        Searched Zipcode: {item.searched_zipcode}
                      </Typography>
                    </a>
                  </Button>
                </CardActions> */}
              </Card>
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default Cards;
