import Footer from "./Footer";
import Header from "./Header";
import styles from "./Layout.module.scss";

export default function Layout(props) {
  const { children } = props;

  return (
    <div className={styles.layout}>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
