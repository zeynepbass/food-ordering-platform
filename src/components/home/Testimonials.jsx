import Image from "next/image";
import Title from "@/components/common/Title";
import { TESTIMONIALS } from "@/constants/content";

const Testimonials = () => (
  <section className="container mx-auto mb-20 mt-12">
    <Title addClass="text-[40px] text-center">What Says Our Customers</Title>
    <div className="flex gap-10 flex-wrap">
      {TESTIMONIALS.map((item) => (
        <figure key={item.id} className="mt-5 flex-1 min-w-[280px]">
          <blockquote className="p-6 bg-secondary text-white rounded-[5px]">
            <p>{item.text}</p>
            <figcaption className="flex flex-col mt-4">
              <span className="text-lg font-semibold">{item.name}</span>
              <span className="text-[15px]">{item.role}</span>
            </figcaption>
          </blockquote>
          <div className="relative w-28 h-28 border-4 border-primary rounded-full mt-8 before:content-[''] before:absolute before:top-0 before:-translate-y-3 before:rotate-45 before:bg-primary before:w-5 before:h-5 flex justify-center">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
        </figure>
      ))}
    </div>
  </section>
);

export default Testimonials;
