import Image from "next/image";
import Link from "next/link";
import { MdShoppingCart } from "react-icons/md";
import Title from "@/components/common/Title";

const CampaignCard = ({ campaign }) => (
  <div className="bg-secondary flex-1 rounded-md py-5 px-[15px] flex items-center gap-x-4">
    <div className="relative md:w-44 md:h-44 w-36 h-36 border-[5px] border-primary rounded-full overflow-hidden">
      <Image
        src={campaign.image}
        alt={campaign.title}
        fill
        className="object-cover hover:scale-105 transition-all"
      />
    </div>
    <div className="text-white">
      <Title addClass="text-2xl">{campaign.title}</Title>
      <div className="font-dancing my-1">
        <span className="text-[40px]">{campaign.discount}%</span>
        <span className="text-sm inline-block ml-1">Off</span>
      </div>
      <Link href="/menu" className="btn-primary flex items-center gap-x-2">
        Order Now <MdShoppingCart size={20} />
      </Link>
    </div>
  </div>
);

export default CampaignCard;
