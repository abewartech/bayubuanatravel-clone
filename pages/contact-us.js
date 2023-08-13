import { useState } from "react";
import HeaderPage from "../src/components/common/HeaderPage";
import styles from "./../styles/pages/ContactUs.module.scss";
import Layout from "../src/components/Layout";
import ContactList from "../src/components/Contact/ContactList";

export default function ContactUs() {
  const [id, setId] = useState(0);
  const [expand, setExpand] = useState(false);
  const breadcrumb = [
    {
      name: "Home",
    },
    {
      name: "Contact Us",
    },
  ];
  const handleCollapse = (id) => {
    setId(id);
    setExpand(!expand);
  };
  return (
    <>
      <Layout>
        <HeaderPage title="Contact Us" breadcrumb={breadcrumb} />
        <div className="container mb-5">
          <div className="row">
            {[...Array(4)].map((item, idx) => {
              return (
                <div className="col-12" key={idx}>
                  <div
                    onClick={() => handleCollapse(idx)}
                    className={styles.contactCollapsible}
                  >
                    <div className={styles.title}>Head Office</div>
                    <div></div>
                  </div>
                  {expand && id === idx && <ContactList />}
                </div>
              );
            })}
          </div>
        </div>
      </Layout>
    </>
  );
}
