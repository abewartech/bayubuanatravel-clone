import Layout from "../../src/components/Layout";
import HeaderPage from "../../src/components/common/HeaderPage";

export default function TypeDestination() {
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
      <HeaderPage title="Domestic" breadcrumb={breadcrumb} />
    </Layout>
  );
}
