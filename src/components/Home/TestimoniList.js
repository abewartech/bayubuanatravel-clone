import { Splide, SplideSlide } from "@splidejs/react-splide";
import styles from "./../../../styles/pages/Home.module.scss";
import TestimoniItem from "./TestimoniItem";
import TitleSection from "../common/TitleSection";
import { useState } from "react";
export default function TestimoniList() {
  const testimonies = [
    {
      name: "Evonardi",
      travelDate: "2022-01-10",
      testimonial:
        "Terima kasih tripnya sangat menyenangkan. Guidenya sangat ramah & lucu. Pelayannya luar biasa sekali. Benar-benar paket komplit marina raja ampat ini. Mulai dari restoran, pelabuhan, speed & punya pulau pribadi. Buat kalian yang mau ke raja ampat saya sangat sarankan pakai marina, dijamin tidak akan menyesal. Jika tidak salah slogan mereka adalah 'ONE STOP SERVICE' karena mereka punya semuanya. Sukses marina tour raja ampat."
    },
    {
      name: "Fatimah Renfaan",
      travelDate: "2022-02-15",
      testimonial: "Action untuk Pelunasan Sisa Pembayaran."
    },
    {
      name: "Runalolelo",
      travelDate: "2022-03-20",
      testimonial:
        "Untuk view sangat keren karena posisi marina ada di pinggir laut. Tapi harga dan rasa makanan kurang sepadan, karena terlalu mahal namun rasa makanan sedikit hambar. Saran kalau mau kesini lebih baik ketika dengan rekanan kerja. Kalau lapar, tidak direkomendasikan untuk makan disini 😂"
    },
    {
      name: "Nurdiansyah Alimuddin",
      travelDate: "2022-04-25",
      testimonial:
        "Travel yang direkomendasikan untuk kamu yang mau ke raja ampat. Guidenya ramah. Semua ramah banget. Terima kasih kaka."
    },
    {
      name: "Dewi Dewi",
      travelDate: "2022-05-30",
      testimonial:
        "Pemandangan yang bagus. Tempatnya seperti jet ski di Jakarta tapi pemandangan alam disini lebih bagus."
    },
    {
      name: "Novan Maulana A Md",
      travelDate: "2022-06-05",
      testimonial:
        "Tempat yang nyaman untuk menikmati sunset. Dan disuguhkan dengan laut lepas."
    },
    {
      name: "Action untuk Pelunasan Sisa Pembayaran",
      travelDate: "2022-07-10",
      testimonial:
        "Tempat yang bagus untuk menikmati matahari terbenam. Tempat ini diperuntukkan bagi anda yang ingin pergi ke Raja Ampat dengan speed boat, dan anda juga bisa makan dan minum kopi di tempat ini. Tempatnya sangat bersih dan menyenangkan, mereka menyajikan tempat duduk di luar ruangan atau di dalam ruangan. Kerja bagus."
    }
  ];

  // const [testimonies, setTestimonies] = useState([]);
  return (
    <div className={styles.testimoniWrap}>
      <div className="container">
        <div className="row">
          <TitleSection
            title="Testimoni Travelers"
            subtitle="Kata mereka mengenai traveling bareng bayu buana"
            more={false}
          />
          <Splide
            options={{
              type: "loop",
              perPage: 3,
              pagination: false,
              gap: "1.25rem",
              fixedWidth: "calc(33% - 32px)",
              perMove: 1,
              autoplay: true,
              arrows: false,
              breakpoints: {
                1024: {
                  perPage: 3,
                  fixedWidth: "calc(33% - 32px)"
                },
                992: {
                  perPage: 1,
                  fixedWidth: "calc(100% - 32px)"
                },
                640: {
                  perPage: 1,
                  fixedWidth: "calc(100% - 4.5rem)"
                }
              }
            }}
          >
            {testimonies.map((testimony, idx) => (
              <SplideSlide key={idx}>
                <TestimoniItem testimony={testimony} />
              </SplideSlide>
            ))}
          </Splide>
        </div>
      </div>
    </div>
  );
}
