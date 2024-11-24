// import Image from "next/image";
import Hero from "@/components/Hero";
import MissionAndVision from "@/components/Misson&Vison";
import ProgramsOverview from "@/components/ProgramsOverview";
import LatestNewsOrUpdates from "@/components/LatestNewsOrUpdates";
import Layout from "@/components/Layout";
import Partners from "@/components/Partners";
export default function Home() {
  const getOfficeOnlineViewerUrl = (documentUrl) => {
    const encodedUrl = encodeURIComponent(documentUrl);
    return `https://view.officeapps.live.com/op/view.aspx?src=${encodedUrl}`;
  };

  return (
    <Layout>
      <Hero />
      <MissionAndVision />
      <ProgramsOverview />
      <Partners />      <LatestNewsOrUpdates />
    </Layout>
  );
}
