import Layout from "../src/components/Layout";
import Card from "../src/components/common/Card";
import HeaderPage from "../src/components/common/HeaderPage";
import resort from "./../public/assets/resort.jpg";

export default function Resort() {
  const breadcrumb = [
    {
      name: "Home",
    },
    {
      name: "Resort",
    },
  ];
  return (
    <Layout>
      <HeaderPage title="Resort" breadcrumb={breadcrumb} background={resort} />
      <div className="container">
        <div className="row">
          {[...Array(6)].map((item, idx) => {
            return (
              <div key={idx} className="col-12 col-xl-4">
                <Card type="gallery" />
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
