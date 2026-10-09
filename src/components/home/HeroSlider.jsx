import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import { HERO_SLIDES } from "@/constants/content";
import { SITE_NAME } from "@/constants/site";

const sliderSettings = {
  dots: true,
  dotsClass: "hero-dots",
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 6000,
  pauseOnFocus: true,
};

const HeroSlider = () => (
  <section className="relative isolate overflow-hidden bg-secondary-900 text-white">
    <Image
      src="/images/hero-bg.jpg"
      alt=""
      fill
      priority
      sizes="100vw"
      className="-z-10 object-cover object-right"
    />
    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-secondary-900 via-secondary-900/80 to-transparent" />
    <div className="container py-20 sm:py-28 lg:py-36">
      <div className="max-w-xl">
        <Slider {...sliderSettings}>
          {HERO_SLIDES.map((slide, index) => {
            const Heading = index === 0 ? "h1" : "h2";

            return (
              <div key={slide.id}>
                <p className="eyebrow !text-primary">{SITE_NAME} restaurant</p>
                <Heading className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                  {slide.title}
                </Heading>
                <p className="mt-5 text-base text-white/75 sm:text-lg">{slide.text}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/menu" className="btn btn-lg btn-primary">
                    Order now
                  </Link>
                  <Link href="/reservation" className="btn btn-lg btn-light">
                    Book a table
                  </Link>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  </section>
);

export default HeroSlider;
