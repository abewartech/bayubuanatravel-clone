import React from "react";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import { useRouter } from "next/router";
import { Menu, MenuItem } from "@mui/material";

const languages = ["en", "id"];

function LanguageSwitcher() {
  const { lang } = useTranslation();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (newLang) => {
    // Use the Next.js router to push a new route with the desired locale
    router.push("/", "/", { locale: newLang });

    // Close the menu
    handleCloseMenu();
  };

  return (
    <div>
      <div
        aria-controls="language-menu"
        aria-haspopup="true"
        onClick={handleOpenMenu}
        style={{ cursor: "pointer" }}
      >
        <Image
          src={`/assets/flags/${lang}.png`}
          alt={lang}
          width={24}
          height={16}
          className="img-fluid"
        />
      </div>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        {languages.map((language) => (
          <MenuItem
            key={language}
            selected={lang === language}
            onClick={() => changeLanguage(language)}
          >
            <Image
              src={`/assets/flags/${language}.png`}
              alt={language}
              width={24}
              height={16}
              className="img-fluid me-1"
            />
            {language === "en" ? " English" : " Indonesia"}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default LanguageSwitcher;
