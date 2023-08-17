import Layout from "../src/components/Layout";
import HeaderPage from "../src/components/common/HeaderPage";
import TitleSection from "../src/components/common/TitleSection";
import Card from "../src/components/common/Card";
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
                <Card type="passport" />
              </div>
            );
          })}
        </div>
        <div className="row">
          <TitleSection title="News Update" more={false} />
          {[...Array(3)].map((item, idx) => {
            return (
              <div className="col-12 col-md-6 col-lg-4" key={idx}>
                <Card type="news" />
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
