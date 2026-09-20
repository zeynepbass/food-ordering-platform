import Image from "next/image";
import Link from "next/link";
import Title from "@/components/common/Title";
import { ABOUT_TEXT } from "@/constants/content";

const AboutSection = () => (
  <section className="bg-secondary py-14">
    <div className="container mx-auto flex items-center text-white gap-20 justify-center flex-wrap-reverse">
      <div className="relative sm:w-[445px] sm:h-[600px] w-[300px] h-[450px]">
        <Image src="/images/about-img.png" alt="About Feane" fill className="object-contain" />
      </div>
      <div className="md:w-1/2">
        <Title addClass="text-[40px]">We Are Feane</Title>
        <p className="my-5">{ABOUT_TEXT}</p>
        <Link href="/menu" className="btn-primary">
          Explore Menu
        </Link>
      </div>
    </div>
  </section>
);

export default AboutSection;
