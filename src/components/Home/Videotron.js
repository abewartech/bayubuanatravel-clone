import TitleSection from "../common/TitleSection";
import styles from "./../../../styles/pages/Home.module.scss";

export default function Videotron() {
  return (
    <>
      <TitleSection title="Video" />
      <div className="col-12">
        <div className={styles.iframeVideo}>
          <iframe
            src="https://www.youtube.com/embed/xTS5RmnIlOE?controls=1&rel=0&playsinline=0&modestbranding=0&autoplay=0&enablejsapi=1&origin=https%3A%2F%2Fmarinarajaampat.com&widgetid=1"
            frameBorder="0"
          />
        </div>
      </div>
    </>
  );
}
