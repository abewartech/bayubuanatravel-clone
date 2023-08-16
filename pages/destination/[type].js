import { useRouter } from "next/router";
import Layout from "../../src/components/Layout";
import Card from "../../src/components/common/Card";
import HeaderPage from "../../src/components/common/HeaderPage";

export default function TypeDestination() {
  const currUrl = useRouter();
  const typePage = currUrl.query.type;
  const breadcrumb = [
    {
      name: "Home",
    },
    {
      name: "Destination & Package",
    },
  ];
  const breadcrumbDomestic = [
    {
      name: "Home",
    },
    {
      name: "Destination & Package",
    },
    {
      name: "Domestic",
    },
  ];
  return (
    <Layout>
      <HeaderPage
        title={
          typePage === "international" ? "Destination & Packages" : "Domestic"
        }
        breadcrumb={
          typePage === "international" ? breadcrumb : breadcrumbDomestic
        }
      />
      <div className="container">
        <div className="row">
          {[...Array(6)].map((item, idx) => {
            return (
              <div
                className={
                  typePage === "international"
                    ? "col-lg-3 col-md-6 col-12"
                    : "col-lg-4 col-md-6 col-12"
                }
                key={idx}
              >
                {typePage === "international" ? (
                  <Card type="common" />
                ) : (
                  <Card type="international" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
