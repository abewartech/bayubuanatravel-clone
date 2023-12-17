import useTranslation from "next-translate/useTranslation";
import styles from "./Profile.module.scss";
import Image from "next/image";
import useAuthStore from "../../store/loginStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import FaceIcon from "@mui/icons-material/Face";
import KeyIcon from '@mui/icons-material/Key';
import HistoryIcon from "@mui/icons-material/History";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Button } from "@mui/material";

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
      <Button
        onClick={handleClick}
        className={`${styles.navItem} ${
          currMenu === url && styles.navItem__active
        }`}
        startIcon={currMenu === url ? active : unActive}
        fullWidth
        style={{
          backgroundColor: url === "logout" ? "red" : "", // Apply red background color only when url is "logout"
          color: url === "logout" ? "white" : "" // Apply white text color only when url is "logout"
        }}
      >
        {text}
      </Button>
    );
  };

  return (
    <div className="col-lg-4">
      <div className={styles.navigationLeft}>
        <div className={styles.profileWrap}>
          <div className={styles.profile}>
            <div className={styles.profileCircle}>
              <Image
                src={"/assets/wanna2.png"}
                alt="person"
                width={100}
                height={100}
              />
            </div>
          </div>
          <div
            className={styles.profileInformation}
            style={{ textAlign: "center" }}
          >
            <div className={styles.name}>{userName}</div>
            <div className={styles.subName}></div>
          </div>
        </div>
        <div className={styles.navList}>
          {navigationMenu(
            "personal",
            currUrl[2],
            "information",
            <FaceIcon />,
            <FaceIcon />,
            t("personal")
          )}
          {navigationMenu(
            "history",
            currUrl[2],
            "information",
            <HistoryIcon />,
            <HistoryIcon />,
            t("thistory")
          )}
          {navigationMenu(
            "password",
            currUrl[2],
            "change",
            <KeyIcon />,
            <KeyIcon />,
            "Change Password"
          )}
          {navigationMenu(
            "logout",
            currUrl[2],
            "information",
            <ExitToAppIcon />,
            <ExitToAppIcon />,
            "Logout"
          )}
        </div>
      </div>
    </div>
  );
}
