import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import * as React from "react";

const GroupSearch = ({ data, setSearchItem }) => {
  const options = data.map((option) => {
    const firstLetter = option.name[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      ...option,
    };
  });

  setTimeout(async () => {
    const close = await document.getElementsByClassName(
      "MuiAutocomplete-clearIndicator"
    )[0];
    close.addEventListener("click", () => {
      setSearchItem(null);
    });
  }, 100);

  return (
    <div className="flex justify-start">
      <Autocomplete
        id="grouped-demo"
        options={options.sort(
          (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
        )}
        groupBy={(option) => option.firstLetter}
        getOptionLabel={(option) => option.name}
        // sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Type in here to begin!" />
        )}
        onChange={(_event, newSearch) => {
          setSearchItem(newSearch.name);
        }}
        className=" mb-4 w-1/2"
      />
    </div>
  );
};

export default GroupSearch;
