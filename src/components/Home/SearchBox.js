import { useState } from "react";
import styles from "./../../../styles/pages/Home.module.scss";
import Select from "react-select";
import Search from "@mui/icons-material/Search";
import Toc from "@mui/icons-material/Toc";
import { TextField } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
export default function SearchBox() {
  const router = useRouter();
  const { t, lang } = useTranslation("common");
  const [selectedOption, setSelectedOption] = useState({
    label: t("nearestdate"),
    value: 0
  });
  const [searchName, setSearchName] = useState("");
  const [orderBy, setOrderBy] = useState(0);

  const options = [
    { value: 0, label: t("nearestdate") },
    { value: 1, label: "A-Z" },
    { value: 2, label: "Z-A" },
    { value: 3, label: t("lowprice") },
    { value: 4, label: t("highprice") },
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
                <label className="mb-1">{t("searchpackages")}</label>
                <TextField
                  label=""
                  variant="standard"
                  value={searchName}
                  placeholder="What package are you looking for ?"
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
                  <label>{t("orderby")}</label>
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
            {t('findnow')}
          </button>
        </div>
      </div>
    </div>
  );
}
