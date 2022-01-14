import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
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
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.length > 0 &&
          Object.values(data).map((item, index) => (
            <article key={`${item.name}-${index}`} className="block h-120 relative rounded shadow leading-snug bg-white">
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
            </article>
          ))}
        </div>
    </div>
  );
}
