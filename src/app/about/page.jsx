import Layout from "@/components/Layout";
import IntroductionHistory from "@/components/IntroductionHistory";
import LeadershipTeam from "@/components/LeadershipTeam";
import GlobalLocalPresence from "@/components/GlobalLocalPresence";
import OurRecognitions from "@/components/OurRecognitions";

export default function About() {
 

  return (
    <Layout>
      <IntroductionHistory />      
      <GlobalLocalPresence />
      <OurRecognitions />
    </Layout>
  );
}
