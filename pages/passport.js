import Layout from "../src/components/Layout";
import HeaderPage from "../src/components/common/HeaderPage";
import styles from "./../styles/pages/Passport.module.scss";
import CardPassport from "../src/components/Passport/CardPassport";
import CardNews from "../src/components/Passport/CardNews";
export default function Passport() {
  const breadcrumb = [
    {
      name: "Home",
    },
    {
      name: "Passport & Visa",
    },
  ];
  return (
    <Layout>
      <HeaderPage title="Passport & Visa" breadcrumb={breadcrumb} />
      <div className="container">
        <div className="row">
          {[...Array(2)].map((item, idx) => {
            return (
              <div key={idx} className="col-12 col-xl-6">
                <CardPassport />
              </div>
            );
          })}
        </div>
        <div className="row">
          <div className="col-12">
            <div className={styles.title}>News Update</div>
          </div>
          {[...Array(3)].map((item, idx) => {
            return (
              <div className="col-12 col-md-6 col-lg-4" key={idx}>
                <CardNews />
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
