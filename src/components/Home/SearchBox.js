import { useState } from "react";
import styles from "./../../../styles/pages/Home.module.scss";
import Select from "react-select";
import Search from "@mui/icons-material/Search";
import Toc from "@mui/icons-material/Toc";
import { TextField } from "@mui/material";
import { useRouter } from "next/router";
export default function SearchBox() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState({
    label: "Nearest Date",
    value: "date-asc"
  });
  const [searchName, setSearchName] = useState("");
  const [orderBy, setOrderBy] = useState("date-asc");

  const options = [
    { value: "name-asc", label: "A-Z" },
    { value: "name-desc", label: "Z-A" },
    { value: "price-asc", label: "Low Price" },
    { value: "price-desc", label: "High Price" },
    { value: "date-asc", label: "Nearest Date" }
  ];

  const handleFindNow = () => {
    // Redirect to the "packages" page with search and order by criteria
    router.push({
      pathname: "/packages",
      query: {
        searchName,
        orderBy: selectedOption.value
      }
    });
  };

  return (
    <div className="container">
      <div className={`${styles.searchBox} row`}>
        <div className="col-12 col-lg-6 p-0">
          <div className={styles.filter}>
            <div className={styles.icon}></div>
            <div className="d-flex align-items-center">
              <div className="me-3">
                <Search />
              </div>
              <div className={styles.filterForm}>
                <label className="mb-1">Search Packages</label>
                <TextField
                  label=""
                  variant="standard"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4 p-0">
          <div className={styles.filter}>
            <div className={styles.icon}></div>
            <div className={styles.filterForm}>
              <div className="d-flex w-100 align-items-center">
                <div className="me-3">
                  <Toc />
                </div>
                <div className="w-100">
                  <label>Order by</label>
                  <Select
                    id="search"
                    classNamePrefix="select"
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={options}
                    styles={{
                      // You can adjust the font size as needed
                      control: (styles) => ({ ...styles, fontSize: "14px" }), // Change the font size of the control
                      singleValue: (styles) => ({ ...styles, fontSize: "14px" }) // Change the font size of the selected value
                      // Add more custom styles as needed
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-2 p-0">
          <button className={styles.cta} onClick={handleFindNow}>
            Find Now
          </button>
        </div>
      </div>
    </div>
  );
}
