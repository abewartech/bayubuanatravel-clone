import TitleSection from "../TitleSection";
import styles from "./Client.module.scss";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";

const clients = [
  "client1.png",
  "client2.png",
  "client3.png",
  "client4.png",
  "client5.png",
  "client6.png",
  "client7.png",
  "client8.png",
  "client9.png",
  "client10.png",
  "client11.png",
  "client12.png"
];

export default function Client() {
  const { t, lang } = useTranslation("common");
  return (
    <div className="container mb-5">
      <div className="row">
        <div className="col-12">
          <TitleSection title={t("our")} more={false} />
        </div>
        {clients.map((item, idx) => {
          return (
            <div
              className="col-3 col-lg-2 mb-3 d-flex justify-content-center align-items-center"
              key={idx}
            >
              <Image
                src={`/assets/clients/${item}`}
                alt="client"
                width={100}
                height={100}
                className={styles.client_logo}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
