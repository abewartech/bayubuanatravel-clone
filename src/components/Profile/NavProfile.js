import useTranslation from "next-translate/useTranslation";
import styles from "./Profile.module.scss";
import Image from "next/image";
import useAuthStore from "../../store/loginStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import personalCardActive from "./personalcardActive.svg";
import personalCard from "./personalcard.svg";

export default function NavProfile(props) {
  const { data, handleNavigateMenu, currMenu } = props;
  const { t, lang } = useTranslation("common");
  const [userName, setUserName] = useState("");
  const router = useRouter();
  const currUrl = router.pathname.split("/");
  const {
    isLoggedIn,
    accessToken,
    refreshToken,
    username,
    setLoggedIn,
    setAccessToken,
    setRefreshToken,
    setUsername,
    setEmail
  } = useAuthStore();
  useEffect(() => {
    setUserName(username);
  }, []);
  const navigationMenu = (url, curr, param, active, unActive, text) => {
    const handleClick = () => {
      if (url === "logout") {
        setLoggedIn(false);
        setUsername("");
        setEmail("");
        router.push("/");
      } else {
        // For other URLs, navigate as usual
        handleNavigateMenu(url);
      }
    };

    return (
      <div
        onClick={handleClick}
        className={`${styles.navItem} ${
          currMenu === url && styles.navItem__active
        }`}
      >
        <Image src={currMenu === url ? active : unActive} alt="personal" />
        {text}
      </div>
    );
  };

  return (
    <div className="col-lg-4">
      <div className={styles.navigationLeft}>
        <div className={styles.profileWrap}>
          <div className={styles.profile}>
            <div className={styles.profileCircle}>
              <Image
                src={"/assets/wanna1.png"}
                alt="person"
                width={100}
                height={100}
              />
            </div>
          </div>
          <div className={styles.profileInformation}>
            <div className={styles.name}>{userName}</div>
            <div className={styles.subName}></div>
          </div>
        </div>
        <div className={styles.navList}>
          {navigationMenu(
            "personal",
            currUrl[2],
            "information",
            personalCardActive,
            personalCard,
            "Personal Information"
          )}
          {navigationMenu(
            "history",
            currUrl[2],
            "information",
            personalCardActive,
            personalCard,
            "Transaction History"
          )}
          {navigationMenu(
            "logout",
            currUrl[2],
            "information",
            personalCardActive,
            personalCard,
            "Logout"
          )}
        </div>
      </div>
    </div>
  );
}
