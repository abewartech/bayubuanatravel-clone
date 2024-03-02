import Image from "next/image";
import styles from "./../../../styles/pages/Home.module.scss";
import quote from "./../../../public/assets/quote-review.svg";

export default function TestimoniItem({ testimony }) {
  const { name, travelDate, testimonial } = testimony;

  return (
    <div className="mb-4">
      <div className={styles.testimoniCard}>
        <div className={styles.userInformation}>
          <div className={styles.profilePict}></div>
          <div className={styles.profileUser}>
            <div className={styles.name}>{name}</div>
            <div className={styles.travelDate}>Travel Date: {travelDate}</div>
          </div>
          <Image src={quote} alt="quote" />
        </div>
        <div className={styles.testimoniText}>
          <p>{testimonial}</p>
        </div>
      </div>
    </div>
  );
}
