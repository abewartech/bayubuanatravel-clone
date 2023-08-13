import styles from "./../../../styles/pages/Home.module.scss";

export default function Videotron() {
  return (
    <>
      <div className="col-8">
        <div className={styles.title}>Video</div>
      </div>
      <div className="col-4 d-flex align-items-center justify-content-end">
        <a className={styles.link}>View More</a>
      </div>
      <div className="col-12">
        <div className={styles.iframeVideo}>
          <iframe
            src="https://www.youtube.com/embed/_dqO0s7SZuw"
            frameBorder="0"
          />
        </div>
      </div>
    </>
  );
}
