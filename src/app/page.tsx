import Hero from "./Hero";
import ShopBySilhouette from "./ShopBySilhouette";
import EditorialPanel from "./EditorialPanel";
import CampaignSection from "./CampaignSection";
import GuidedSelection from "./GuidedSelection";

export default function Home() {
  return (
    <>
      <Hero />
      <ShopBySilhouette />
      <EditorialPanel />
      <CampaignSection />
      <GuidedSelection />
    </>
  );
}
