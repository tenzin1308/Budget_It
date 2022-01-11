import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
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
}) {
  return (
    <div className="mb-4" id="Grid">
      <Grid
        container
        spacing={4}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {data.length > 0 &&
          Object.values(data).map((item, index) => (
            // <div id="Grid-Cards" className="">
            <Grid item key={`${item.name}-${index}`} xs={4}>
              <Card className="max-w-[345]">
                <a href={item.url} target="_blank" rel="noreferrer">
                  <img
                    src={item.image}
                    alt="item pic"
                    className="h-full w-full p-4"
                  />
                </a>
                <CardContent className="flex-col">
                  <div className="">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className=""
                    >
                      <p className="text-md whitespace-normal truncate h-12 mb-1 font-semibold">
                        {item.name}
                      </p>
                    </a>
                  </div>
                  <div>
                    <a href={item.url} target="_blank" rel="noreferrer">
                      <p className="text-lg mb-1 font-semibold">{item.price}</p>
                    </a>
                  </div>
                  <div>
                    <a
                      href={`https://www.${item.store_name}.com`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <p className="text-lg mb-1 font-normal">
                        {item.store_name}
                      </p>
                    </a>
                  </div>
                  <div>
                    <a
                      href={`https://www.${item.store_name}.com`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <p className="text-md mb-1 font-normal">
                        Searched Zipcode: {item.searched_zipcode}
                      </p>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </Grid>
            // </div>
          ))}
      </Grid>
    </div>
  );
}
