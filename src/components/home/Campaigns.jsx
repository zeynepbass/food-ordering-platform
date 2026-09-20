import CampaignCard from "@/components/home/CampaignCard";
import { CAMPAIGNS } from "@/constants/content";

const Campaigns = () => (
  <section className="flex justify-between container mx-auto py-20 gap-6 flex-wrap">
    {CAMPAIGNS.map((campaign) => (
      <CampaignCard key={campaign.id} campaign={campaign} />
    ))}
  </section>
);

export default Campaigns;
