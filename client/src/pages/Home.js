import logo from "../logo.png";
import { useEffect, useState } from "react";
import axios from "axios";
import GeneralLayout from "../components/GeneralLayout";
import Cards from "../components/Cards";
import GroupSearch from "../components/GroupSearch";

export default function Home() {
  // general logic
  // get json data
  // const [searchStr, setSearchStr] = useState("");
  const [loadingData, setLoadingData] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    retrieveData();
  }, []);

  const retrieveData = async () => {
    await axios
      .get("http://localhost:8000/")
      .then((res) => {
        setData(res.data);
        setLoadingData(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const dataNames = (array) => {
    // Create a map object
    let map = [];

    // Loop to insert key & value in this object one by one
    for (var i = 0; i < array.length; i++) {
      // map.set("name", array[i]["name"]);
      let aux = {};
      aux["name"] = array[i]["name"];
      map.push(aux);
    }
    return map;
  };

  return (
    <>
      {/* <img src={logo} alt="logo" /> */}
      {/* 
        search bar component
        card view component
        */}
      {/* {!loadingData && console.log("data received\n", data)} */}
      {/* <img src={data[0]["image"]} /> */}
      {/* {console.log(
        Object.values(data).reduce((x, y) => {
          x[y.name] = x[y.name] || {};
          return x;
        }, {})
      )} */}

      {console.log(dataNames(data))}

      <GeneralLayout>
        {!loadingData && (
          <>
            <GroupSearch data={dataNames(data)} />
            <Cards data={data} />{" "}
          </>
        )}
      </GeneralLayout>
    </>
  );
}
