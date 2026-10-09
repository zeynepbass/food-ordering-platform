import Image from "next/image";
import Link from "next/link";
import Title from "@/components/common/Title";
import { ABOUT_TEXT } from "@/constants/content";
import { SITE_NAME } from "@/constants/site";

const AboutSection = ({ headingAs = "h2" }) => (
  <section className="bg-secondary text-white">
    <div className="container grid items-center gap-10 py-16 md:grid-cols-2 lg:gap-20">
      <div className="relative mx-auto aspect-[3/4] w-full max-w-[320px]">
        <Image
          src="/images/about-img.png"
          alt="Layers of a burger"
          fill
          sizes="320px"
          className="object-contain"
        />
      </div>
      <div>
        <p className="eyebrow !text-primary">Our story</p>
        <Title as={headingAs} className="section-title mt-3 !text-white">
          We are {SITE_NAME}
        </Title>
        <p className="mt-5 text-white/75">{ABOUT_TEXT}</p>
        <Link href="/menu" className="btn btn-primary mt-8">
          Explore the menu
        </Link>
      </div>
    </div>
  </section>
);

export default AboutSection;
