import Layout from "../src/components/Layout";
import HeaderPage from "../src/components/common/HeaderPage";
import styles from "./../styles/pages/Passport.module.scss";
import Image from "next/image";
import passport from "./../public/assets/passport.png";
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
              <div key={idx} className="col-6">
                <div className={styles.cardPassword}>
                  <div className={styles.cardImg}>
                    <Image src={passport} alt="passport" />
                  </div>
                  <div className={styles.cardInfo}>
                    <div className={styles.title}>Visa</div>
                    <div className={styles.cardList}>
                      <ul>
                        <li>Visa Requirement</li>
                        <li>Visa Requirement</li>
                        <li>Visa Requirement</li>
                        <li>Visa Requirement</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="row">
          <div className="col-12">
            <div className={styles.title}>News Update</div>
          </div>
          <div className="col-4">
            <div className={styles.cardNewsUpdate}>
              <div className={styles.cardNewsThumbnail}></div>
              <div className={styles.cardNewsDate}></div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
