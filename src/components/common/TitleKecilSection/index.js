import { useRouter } from "next/router";
import styles from "./TitleSection.module.scss";
import useTranslation from "next-translate/useTranslation";

export default function TitleKecilSection(props) {
  const { title, subtitle, more, align, tours } = props;
  const { t, lang } = useTranslation("common");
  const router = useRouter();

  // Redirect to the "package" page if tours is true
  const handleViewClick = () => {
    if (tours) {
      router.push("packages"); // Replace '/package' with the actual path of your "package" page
    } else {
      // Handle other logic for the view click
    }
  };

  return (
    <>
      <div
        className={`col-12 ${align === "center" ? "text-center" : undefined} ${
          more === false ? "col-lg-12" : "col-lg-8"
        }`}
      >
        <div className={styles.title}>{title}</div>
        {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
        {!subtitle && <div className={styles.border}></div>}
      </div>
      {more === false ? (
        ""
      ) : (
        <div className="d-none d-lg-flex col-lg-4 align-items-center justify-content-end">
          <a className={styles.link} onClick={handleViewClick}>
            {t("view")}
          </a>
        </div>
      )}
    </>
  );
}
