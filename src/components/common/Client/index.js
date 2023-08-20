import Image from "next/image";
import TitleSection from "../TitleSection";
import client1 from "./../../../../public/assets/clients/client1.png";
import client2 from "./../../../../public/assets/clients/client2.png";
import client3 from "./../../../../public/assets/clients/client3.png";
import client4 from "./../../../../public/assets/clients/client4.png";
import client5 from "./../../../../public/assets/clients/client5.png";
import client6 from "./../../../../public/assets/clients/client6.png";
import client7 from "./../../../../public/assets/clients/client7.png";
import client8 from "./../../../../public/assets/clients/client8.png";
import client9 from "./../../../../public/assets/clients/client9.png";
import client10 from "./../../../../public/assets/clients/client10.png";
import client11 from "./../../../../public/assets/clients/client11.png";
import client12 from "./../../../../public/assets/clients/client12.png";
import styles from "./Client.module.scss";
export default function Client() {
  const clients = [
    client1,
    client2,
    client3,
    client4,
    client5,
    client6,
    client7,
    client8,
    client9,
    client10,
    client11,
    client12,
  ];
  return (
    <div className="container mb-5">
      <div className="row">
        <div className="col-12">
          <TitleSection title="Our Clients" more={false} />
        </div>
        {clients.map((item, idx) => {
          return (
            <div
              className="col-3 col-lg-2 mb-3 d-flex justify-content-center align-items-center"
              key={idx}
            >
              <Image src={item} alt="client" className={styles.client_logo} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
