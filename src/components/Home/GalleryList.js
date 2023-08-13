import styles from "./../../../styles/pages/Home.module.scss";

export default function GalleryList() {
  return (
    <div className={`${styles.galleryList} container`}>
      <div className="row">
        <div className="col-8">
          <div className={styles.title}>Image Gallery from Participant</div>
        </div>
        <div className="col-4 d-flex align-items-center justify-content-end">
          <a className={styles.link}>View More</a>
        </div>
        {[...Array(4)].map((item, idx) => {
          return (
            <div key={idx} className="col-3">
              <div className={styles.galleryItem}></div>
              <div className={styles.caption}>Photo By</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
