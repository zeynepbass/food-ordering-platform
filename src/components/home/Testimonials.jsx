import Image from "next/image";
import Title from "@/components/common/Title";
import { TESTIMONIALS } from "@/constants/content";

const Testimonials = () => (
  <section className="container py-16">
    <div className="text-center">
      <p className="eyebrow">Testimonials</p>
      <Title className="section-title mt-3">What our customers say</Title>
    </div>
    <div className="mt-10 grid gap-6 md:grid-cols-2">
      {TESTIMONIALS.map((item) => (
        <figure key={item.id} className="card flex flex-col p-6 sm:p-8">
          <blockquote className="flex-1 text-slate-700">“{item.text}”</blockquote>
          <figcaption className="mt-6 flex items-center gap-4">
            <Image
              src={item.image}
              alt=""
              width={48}
              height={48}
              className="h-12 w-12 rounded-full object-cover"
            />
            <span>
              <span className="block font-semibold text-secondary">{item.name}</span>
              <span className="block text-sm text-muted">{item.role}</span>
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  </section>
);

export default Testimonials;
