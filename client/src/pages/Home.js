import { Pagination } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Cards from "../components/Cards";
import GeneralLayout from "../components/GeneralLayout";
import GroupSearch from "../components/GroupSearch";

export default function Home() {
  // general logic
  // get json data
  const [loadingData, setLoadingData] = useState(true); //loaded data from DB or not
  const [data, setData] = useState([]); // data from DB
  const [searchItem, setSearchItem] = useState(null); // Search word
  const [response, setResponse] = useState([]); // filtered data
  const [itemsPerPage, setItemsPerPage] = useState(9); // Page Pagination
  const [currentPage, setCurrentPage] = useState(1);

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

  // AutoSearch
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

  // Filter data on search word
  const filterData = (searchItem) => {
    if (searchItem !== null || searchItem === "") {
      const temp = data.filter((item) => {
        return item.name === searchItem;
      });
      setResponse(temp);
    } else {
      //
      setResponse(data);
    }
  };
  useEffect(() => {
    filterData(searchItem);
  }, [searchItem]);

  // PAGINATION
  // Get current item
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = response.slice(indexOfFirstItem, indexOfLastItem);
  // handle change
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <GeneralLayout>
        {!loadingData && (
          <>
            <GroupSearch data={dataNames(data)} setSearchItem={setSearchItem} />
            <Cards data={currentItems} />
            {currentItems.length > 0 && (
              <Pagination
                count={Math.ceil(response.length / itemsPerPage)}
                page={currentPage}
                onChange={handleChange}
                className="flex justify-center"
              />
            )}
          </>
        )}
      </GeneralLayout>
    </>
  );
}
