import { useRouter } from "next/router";
import Layout from "../src/components/Layout";
import HeaderPage from "../src/components/common/HeaderPage";
import resort from "./../public/assets/resort.jpg";
import NavProfile from "../src/components/Profile/NavProfile";
import styles from "../src/components/Profile/Profile.module.scss";
import { useState, useEffect } from "react";
import PrivateInformation from "../src/components/Profile/PrivateInformation";
import History from "../src/components/Profile/History";
import PasswordChange from "../src/components/Profile/PasswordChange";

export default function Profile() {
  const router = useRouter();
  const [currMenu, setCurrMenu] = useState("personal");
  const [scrollPosition, setScrollPosition] = useState(0);
  const breadcrumb = [
    {
      name: "Home"
    },
    {
      name: "Profile"
    }
  ];
  const handleNavigateMenu = (menu) => {
    setScrollPosition(window.scrollY);
    setCurrMenu(menu);
    router.push(`?menu=${menu}`);
  };
  const initialValues = {
    address: "",
    country: "",
    email: "",
    full_name: "",
    gender: "",
    password: ""
  };

  useEffect(() => {
    // Event listener to handle scroll position after route change
    const handleRouteChange = () => {
      // Restore the scroll position
      window.scrollTo(0, scrollPosition);
    };

    // Add the event listener
    router.events.on("routeChangeComplete", handleRouteChange);

    // Remove the event listener on component unmount
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events, scrollPosition]);

  return (
    <Layout>
      <HeaderPage
        title={"Profile"}
        breadcrumb={breadcrumb}
        background={resort}
      />
      <div className="container">
        <div className={styles.profileDesktop}>
          <div className="row">
            <NavProfile
              currMenu={currMenu}
              handleNavigateMenu={handleNavigateMenu}
            />
            {currMenu === "personal" && <PrivateInformation />}
            {currMenu === "history" && <History />}
            {currMenu === "password" && <PasswordChange />}
          </div>
        </div>
      </div>
    </Layout>
  );
}
