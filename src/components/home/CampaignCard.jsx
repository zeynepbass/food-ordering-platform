import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

const CampaignCard = ({ campaign }) => (
  <article className="flex items-center gap-5 rounded-3xl bg-secondary p-5 text-white sm:gap-6 sm:p-6">
    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl ring-4 ring-primary/80 sm:h-32 sm:w-32">
      <Image
        src={campaign.image}
        alt=""
        fill
        sizes="128px"
        className="object-cover"
      />
    </div>
    <div>
      <h3 className="font-display text-xl font-semibold sm:text-2xl">{campaign.title}</h3>
      <p className="mt-1 text-white/70">
        <span className="text-3xl font-bold text-primary">{campaign.discount}%</span> off
      </p>
      <Link href="/menu" className="btn btn-sm btn-primary mt-3">
        Order now <FiArrowRight aria-hidden="true" />
      </Link>
    </div>
  </article>
);

export default CampaignCard;
