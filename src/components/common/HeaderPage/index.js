import styles from "./HeaderPage.module.scss";
export default function HeaderPage(props) {
  const { title, breadcrumb } = props;
  console.log(breadcrumb);
  return (
    <>
      <div className="position-relative">
        <div className={styles.headerPage}>
          <div className={styles.title}>{title}</div>
          <div className={styles.breadcrumb}>
            {breadcrumb.map((item, idx) => {
              return (
                <div
                  key={idx}
                  className={`${styles.breadcrumbItem} ${
                    idx === 0 && styles.breadcrumbItem__bold
                  }`}
                >
                  {item.name}
                  {idx + 1 !== breadcrumb.length && (
                    <span className="px-3">{">"}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.overlay}></div>
      </div>
    </>
  );
}
