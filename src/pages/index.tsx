import * as React from 'react';
import dynamic from 'next/dynamic';
import AOS from "aos";
import "aos/dist/aos.css";

const Layout = dynamic(() => import('@/components/layout'));
const AboutSection = dynamic(() => import('@/components/aboutSection'));
const CarouselSection = dynamic(() => import('@/components/carouselSection'));
const RoadmapSection = dynamic(() => import('@/components/roadmapSection'));
const PoweredBySection = dynamic(() => import('@/components/poweredBySection'));
const TeamSection = dynamic(() => import('@/components/teamSection'));
const FaqsSection = dynamic(() => import('@/components/faqsSection'));
const CommunitySection = dynamic(() => import('@/components/communitySection'));
const FooterSection = dynamic(() => import('@/components/footerSection'));

function Home() {

  React.useEffect(() => {
    AOS.init({ once: true });
    AOS.refresh();
  }, []);
  return (
    <Layout>
      <div className='sections h-full overflow-hidden text-slate-200 bg-black'>
        <AboutSection />
        <CarouselSection />
        <RoadmapSection />
        <PoweredBySection />
        <TeamSection />
        <FaqsSection />
        {/* <CommunitySection /> */}
      </div>
    </Layout>
  );
}
export default Home;
