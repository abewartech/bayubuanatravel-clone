import styles from "./../../../styles/pages/ContactUs.module.scss";

export default function ContactList() {
  return (
    <div className={`${styles.contactList} row`}>
      <div className={`${styles.contactItem} col-4`}>
        <div className={styles.contactTitle}>Puri Indah Mall</div>
        <div className={styles.contactAddress}>
          Expansion 2nd Floor, Unit E-2068 Jl. Puri Agung No.1, Jakarta 11610
        </div>
        <div className={styles.contactMe}>
          <span></span> (021) 582 2708
        </div>
        <div className={styles.contactMe}>
          <span></span> office@pri.bayubuanatravel.com
        </div>
        <div className={styles.officeHours}>
          <span></span> Jam Operasional :
          <br />
          Senin - Minggu, 10.00 - 21.00 WIB
        </div>
        <div className={styles.dayOpen}></div>
      </div>
    </div>
  );
}
