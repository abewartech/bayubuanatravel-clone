import Image from "next/image";
import styles from "./../../../styles/pages/Home.module.scss";
import quote from "./../../../public/assets/quote-review.svg";
export default function TestimoniItem() {
  return (
    <div className="col-4 mb-4">
      <div className={styles.testimoniCard}>
        <div className={styles.userInformation}>
          <div className={styles.profilePict}></div>
          <div className={styles.profileUser}>
            <div className={styles.name}>Bayu Indra</div>
            <div className={styles.travelDate}>Travel Date: 2022-07-25</div>
          </div>
          <Image src={quote} alt="quote" />
        </div>
        <div className={styles.testimoniText}>
          <p>
            Pertama kali ke Jepang, tadinya mau pergi sendiri aja.eh ternyata
            harus group kalo mau ke Jepang. trus coba nanya2 sama adminnya
            Nadia, eh cocok. Dan seneng banget soalnya semua destinasi yang mau
            gw datengin ada semua di list nya
          </p>
        </div>
      </div>
    </div>
  );
}
