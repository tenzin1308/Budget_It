import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import * as React from "react";


export default function Cards({
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
}){
  return (
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
                <a href={item.url} target='_blank' rel="noreferrer">
                  <CardMedia
                    component="img"
                    alt="item image"
                    height="240"
                    image={item.image}
                  />
                </a>
                <CardContent>
                  <a href={item.url} target='_blank' rel="noreferrer">
                    <Typography gutterBottom variant="h5" component="div">
                      {item.name}
                    </Typography>
                  </a>
                  <a href={item.url} target='_blank' rel="noreferrer">
                    <Typography gutterBottom variant="h5" component="div">
                      {item.price}
                    </Typography>
                  </a>
                  <a href={`https://www.${item.store_name}.com`} target='_blank' rel="noreferrer">
                    <Typography gutterBottom variant="h5" component="div">
                      {item.store_name}
                    </Typography>
                  </a>
                  <a href={`https://www.${item.store_name}.com`} target='_blank' rel="noreferrer">
                    <Typography gutterBottom variant="h7" component="div">
                      Searched Zipcode: {item.searched_zipcode}
                    </Typography>
                  </a>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
  );
};