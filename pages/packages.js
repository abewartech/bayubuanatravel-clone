// import { useRouter } from "next/router";
import Layout from "../src/components/Layout";
import Card from "../src/components/common/Card";
import HeaderPage from "../src/components/common/HeaderPage";

export default function TypeDestination() {
  // const currUrl = useRouter();
  // const typePage = currUrl.query.type;
  const breadcrumb = [
    {
      name: "Home",
    },
    {
      name: "Package",
    },
  ];
  return (
    <Layout>
      <HeaderPage title={"Packages"} breadcrumb={breadcrumb} />
      <div className="container mb-5">
        <div className="row">
          {[...Array(8)].map((item, idx) => {
            return (
              <div className={"col-lg-3 col-md-6 col-12"} key={idx}>
                <Card type="common" />
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
