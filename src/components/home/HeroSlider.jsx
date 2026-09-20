import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import Title from "@/components/common/Title";
import { HERO_SLIDES } from "@/constants/content";

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 6000,
  customPaging: () => <div className="w-3 h-3 border bg-white rounded-full mt-10"></div>,
};

const HeroSlider = () => (
  <section className="relative h-screen w-full -mt-[88px]">
    <Image
      src="/images/hero-bg.jpg"
      alt="Fast food restaurant"
      fill
      priority
      className="object-cover"
    />
    <div className="container mx-auto relative z-10 h-full">
      <Slider {...sliderSettings}>
        {HERO_SLIDES.map((slide) => (
          <div key={slide.id}>
            <div className="mt-48 text-white flex flex-col items-start gap-y-10">
              <Title addClass="text-6xl">{slide.title}</Title>
              <p className="text-sm sm:w-2/5 w-full">{slide.text}</p>
              <Link href="/menu" className="btn-primary">
                Order Now
              </Link>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  </section>
);

export default HeroSlider;
