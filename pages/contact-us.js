import { useState } from "react";
import HeaderPage from "../src/components/common/HeaderPage";
import styles from "./../styles/pages/ContactUs.module.scss";
import Layout from "../src/components/Layout";
import ContactList from "../src/components/Contact/ContactList";
import Client from "../src/components/common/Client";
import TitleSection from "../src/components/common/TitleSection";

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
            <TitleSection title="Reservation Now" more={false} />
            <ContactList title="Contact" />
            <ContactList title="Email" />
          </div>
        </div>
        <Client />
      </Layout>
    </>
  );
}
