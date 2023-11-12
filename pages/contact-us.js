
import { useState } from "react";
import HeaderPage from "../src/components/common/HeaderPage";
// import styles from "./../styles/pages/ContactUs.module.scss";
import Layout from "../src/components/Layout";
import ContactList from "../src/components/Contact/ContactList";
import Client from "../src/components/common/Client";
import TitleSection from "../src/components/common/TitleSection";
import useTranslation from 'next-translate/useTranslation';
import resort from "./../public/assets/resort.jpg";


export default function ContactUs() {
  const { t, lang } = useTranslation("common");
  const [id, setId] = useState(0);
  const [expand, setExpand] = useState(false);
  const breadcrumb = [
    {
      name: t("home"),
    },
    {
      name:  t("contactus"),
    },
  ];
  const handleCollapse = (id) => {
    setId(id);
    setExpand(!expand);
  };
  return (
    <>
      <Layout>
        <HeaderPage
          title={t('contactus')}
          breadcrumb={breadcrumb}
          background={resort}
        />
        <div className="container mb-5">
          <div className="row">
            <TitleSection title={t("reserv")} more={false} />
            <ContactList title={t("contact")} />
            <ContactList title="Email" />
          </div>
        </div>
        <Client />
      </Layout>
    </>
  );
}
