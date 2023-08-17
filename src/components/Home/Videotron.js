import TitleSection from "../common/TitleSection";
import styles from "./../../../styles/pages/Home.module.scss";

export default function Videotron() {
  return (
    <>
      <TitleSection title="Video" />
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
