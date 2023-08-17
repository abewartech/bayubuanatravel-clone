import styles from "./TitleSection.module.scss";
export default function TitleSection(props) {
  const { title, subtitle, more } = props;
  return (
    <>
      <div className={`col-12  ${more === false ? "col-lg-12" : "col-lg-8"}`}>
        <div className={styles.title}>{title}</div>
        {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
      </div>
      {more === false ? (
        ""
      ) : (
        <div className="d-none d-lg-flex col-lg-4 align-items-center justify-content-end">
          <a className={styles.link}>View More</a>
        </div>
      )}
    </>
  );
}
