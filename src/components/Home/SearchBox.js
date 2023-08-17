import { useState } from "react";
import styles from "./../../../styles/pages/Home.module.scss";
import Select from "react-select";
import location from "./../../../public/assets/icon/location.svg";
import calendar from "./../../../public/assets/icon/calendar.svg";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
export default function SearchBox() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [startDate, endDate] = dateRange;

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  return (
    <div className="container">
      <div className={`${styles.searchBox} row`}>
        <div className="col-12 col-lg-5 p-0">
          <div className={styles.filter}>
            <div className={styles.icon}></div>
            <div className="d-flex align-items-center">
              <div className="me-3">
                <Image src={location} alt="location" />
              </div>
              <div className={styles.filterForm}>
                <label>Departure Dates</label>
                {/* <input /> */}
                <Select
                  id="search"
                  classNamePrefix="select"
                  defaultValue={selectedOption}
                  onChange={setSelectedOption}
                  options={options}
                  placeholder="Where are you going?"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-5 p-0">
          <div className={styles.filter}>
            <div className={styles.icon}></div>
            <div className={styles.filterForm}>
              <div className="d-flex w-100 align-items-center">
                <div className="me-3">
                  <Image src={calendar} alt="calendar" />
                </div>
                <div className="w-100">
                  <label>Departure Dates</label>
                  <ReactDatePicker
                    selectsRange={true}
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(update) => {
                      setDateRange(update);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-2 p-0">
          <button className={styles.cta}>Find Now</button>
        </div>
      </div>
    </div>
  );
}
