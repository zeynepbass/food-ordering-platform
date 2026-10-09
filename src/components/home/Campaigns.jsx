import CampaignCard from "@/components/home/CampaignCard";
import { CAMPAIGNS } from "@/constants/content";

const Campaigns = () => (
  <section aria-label="Campaigns" className="container grid gap-5 py-14 md:grid-cols-2">
    {CAMPAIGNS.map((campaign) => (
      <CampaignCard key={campaign.id} campaign={campaign} />
    ))}
  </section>
);

export default Campaigns;
