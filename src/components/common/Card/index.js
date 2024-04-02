import styles from "./Card.module.scss";
import Image from "next/image";
import domestic from "./../../../../public/assets/domestic.png";
import clock from "./../../../../public/assets/icon/clock.svg";
import info from "./../../../../public/assets/icon/info.svg";
import thumbnail from "./../../../../public/assets/gallery/1.jpg";
import calendar from "./../../../../public/assets/icon/calendar.svg";
import useTranslation from "next-translate/useTranslation";
import numeral from "numeral";
import PinDropIcon from "@mui/icons-material/PinDrop";

import passport from "./../../../../public/assets/passport.png";
import Link from "next/link";
import { styled } from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11
  }
}));

export default function Card(props) {
  const { type, data, disableLink } = props;
  const { t, lang } = useTranslation("common");

  const commonCard = () => {
    const calculateDuration = () => {
      if (data && data.active_date && data.expired_date) {
        const startDate = new Date(data.active_date);
        const endDate = new Date(data.expired_date);

        const durationInMilliseconds = endDate - startDate;

        // Calculate days, hours, minutes, etc. as needed
        const days = Math.floor(durationInMilliseconds / (1000 * 60 * 60 * 24));

        return `${days} ${t("days")}`;
      }

      return "N/A"; // Handle the case where data is missing or invalid
    };
    return (
      <div className={`${styles.card} mt-3`}>
        {disableLink ? (
          <div className="h-100">
            <div className={styles.card}>
              {data && data.image_url && (
                <Image
                  src={data.image_url}
                  alt="thumbnail"
                  className="w-100"
                  width={400}
                  height={200}
                />
              )}
              <div className={styles.date}>
                <span className="me-2">
                  <Image src={clock} width={10} height={10} alt="clock" />
                </span>
                {calculateDuration()}
              </div>
              <div className={styles.wrapContent}>
                <div className={styles.cardInfo}>
                  <div className={styles.titlePackage}>
                    {data && data.title}
                  </div>
                  <div className={styles.total}></div>
                </div>
                <div className={styles.cardPricing}>
                  <div className={styles.price}>{t("starting")}</div>
                  <div className={styles.priceNumber}>
                    {lang === "en"
                      ? `USD ${
                          (data && data.base_price_usd) || data?.base_price
                        }`
                      : `Rp. ${data && numeral(data.base_price).format("0,0")}`}
                    <span>{t("person")}</span>
                  </div>
                </div>
                <div className={styles.cta}>
                  <Link
                    href={`https://wa.me/6281316776671?text=Hi%2C%20${
                      lang === "en"
                        ? "I want to inquire about the package"
                        : "Saya ingin menanyakan detail terkait paket"
                    }%20${encodeURIComponent(
                      data.title
                    )}%0A%0A https://marinarajaampat.id/id/packages/${data.id}`}
                  >
                    <button>{t("contact")}</button>
                  </Link>
                  <div className={styles.infoDetail}>
                    <LightTooltip title="10 Spot" placement="top">
                      <Image src={info} alt="info" />
                    </LightTooltip>
                  </div>
                </div>
              </div>
              <div className={styles.overlay}></div>
            </div>
          </div>
        ) : (
          <Link
            href={
              data && data.id !== null ? `/packages/${data.id}` : "/default-url"
            }
            className="h-100"
          >
            <div className={styles.card}>
              {data && data.image_url && (
                <Image
                  src={data.image_url}
                  alt="thumbnail"
                  className="w-100"
                  width={400}
                  height={200}
                />
              )}
              <div className={styles.date}>
                <span className="me-2">
                  <Image src={clock} width={10} height={10} alt="clock" />
                </span>
                {calculateDuration()}
              </div>
              <div className={styles.wrapContent}>
                <div className={styles.cardInfo}>
                  <div className={styles.titlePackage}>
                    {data && data.title}
                  </div>
                  <div className={styles.total}></div>
                </div>
                <div className={styles.cardPricing}>
                  <div className={styles.price}>{t("starting")}</div>
                  <div className={styles.priceNumber}>
                    {lang === "en"
                      ? `USD ${
                          (data && data.base_price_usd) || data?.base_price
                        }`
                      : `Rp. ${data && numeral(data.base_price).format("0,0")}`}
                    <span>{t("person")}</span>
                  </div>
                </div>
                <div className={styles.cta}>
                  <Link
                    href={`https://wa.me/6281316776671?text=Hi%2C%20${
                      lang === "en"
                        ? "I want to inquire about the package"
                        : "Saya ingin menanyakan detail terkait paket"
                    }%20${encodeURIComponent(
                      data.title
                    )}%0A%0A https://marinarajaampat.id/id/packages/${data.id}`}
                  >
                    <button>{t("contact")}</button>
                  </Link>
                  <div className={styles.infoDetail}>
                    <LightTooltip title="10 Spot" placement="top">
                      <Image src={info} alt="info" />
                    </LightTooltip>
                  </div>
                </div>
              </div>
              <div className={styles.overlay}></div>
            </div>
          </Link>
        )}
      </div>
    );
  };

  const newsCard = () => {
    return (
      <div className={styles.cardNewsUpdate}>
        <div className={styles.cardNewsThumbnail}>
          <Image src={thumbnail} alt="thumb" />
        </div>
        <div className={styles.cardNewsBody}>
          <div className={styles.cardNewsDate}>
            <span className="me-1">
              <Image src={calendar} width={16} height={16} alt="date" />
            </span>{" "}
            Friday, 21 October 2022
          </div>
          <div className={styles.cardNewsTitle}>
            Masa Berlaku Paspor Indonesia Menjadi 10 Tahun
          </div>
          <div className={styles.desc}>
            Hi Marina Raja Ampat Lovers, ada kabar gembira nih, Direktorat
            Jenderal Imigrasi resmi menetapkan Paspor RI dengan masa berlaku
            paling lama 10 (sepuluh) tahun
          </div>
          <div className={styles.more}>Read More</div>
        </div>
      </div>
    );
  };

  const galleryCard = () => {
    return (
      <div className={styles.cardGallery}>
        <Image src={thumbnail} alt="thumb" />
      </div>
    );
  };

  const passportCard = () => {
    return (
      <div className={styles.cardPassword}>
        <div className={styles.cardImg}>
          <Image src={passport} alt="passport" />
        </div>
        <div className={styles.cardInfo}>
          <div className={styles.cardPassporttitle}>Visa</div>
          <div className={styles.cardList}>
            <ul>
              <li>Visa Requirement</li>
              <li>Visa Requirement</li>
              <li>Visa Requirement</li>
              <li>Visa Requirement</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const domesticCard = () => {
    return (
      <div className={`${styles.card} ${styles.card__domestic}`}>
        <div className={styles.thumbnailWrap}>
          <Image src={domestic} alt="thumbnail" />
          <div className={styles.date}>
            <span className="me-2">
              <Image src={clock} width={10} height={10} alt="clock" />
            </span>
            4 Days & 3 Nights
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.titleCard}>4D EXOTIC TANA TORAJA</div>
          <div className={styles.departure}>
            Depart: <span>Jan - Aug 2023</span>
          </div>
          <div className={styles.footerCard}>
            <div className={styles.cta}>
              <button>Select</button>
            </div>
            <div className={styles.price}>
              <div className={styles.label}>From</div>
              <div className={styles.priceNumber}>IDR 5,679,000</div>
              <div className={styles.label}>{t("person")}</div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const handleRender = (type) => {
    switch (type) {
      case "common":
        return commonCard();
      case "international":
        return domesticCard();
      case "news":
        return newsCard();
      case "gallery":
        return galleryCard();
      case "passport":
        return passportCard();
      default:
        return commonCard();
    }
  };

  return <>{handleRender(type)}</>;
}
