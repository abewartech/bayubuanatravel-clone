import Image from "next/image";
import styles from "./../../../styles/pages/ContactUs.module.scss";
import mail from "./../../../public/assets/icon/mail.svg";
import Link from "next/link";
import call from "./../../../public/assets/icon/call.svg";
export default function ContactList(props) {
  const { title } = props;
  return (
    <div className="col-6">
      <div className={styles.contactItem}>
        <div className={styles.contactTitle}>{title}</div>
        <div className={styles.contactAddress}>
          <>
            <div className={`me-4 ${styles.contactNumber}`}>
              {title.toLowerCase() === "contact" ? (
                <>
                  <span className="me-2">
                    <Image src={call} alt="call" width={24} height={24} />
                  </span>
                  +6221-23509999
                </>
              ) : (
                <>
                  <span className="me-2">
                    <Image src={mail} alt="mail" width={24} height={24} />
                  </span>
                  tourtravelmarina@gmail.com
                </>
              )}
            </div>
            <div className={styles.contactMe}>
              Open trip (every weekend)
              <br /> Private trip (day by request)
            </div>
            {title.toLowerCase() === "contact" ? (
              <Link href="https://wa.me/6281316776671" target="_blank">
                <button>Contact</button>
              </Link>
            ) : (
              <Link href="mailto:tourtravelmarina@gmail.com">
                <button>Email Us</button>
              </Link>
            )}
          </>
        </div>
      </div>
    </div>
  );
}
