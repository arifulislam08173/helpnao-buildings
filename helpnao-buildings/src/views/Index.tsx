import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedBuildings } from '@/components/home/FeaturedBuildings';
import { PopularAreas } from '@/components/home/PopularAreas';
import { CTASection } from '@/components/home/CTASection';
import { OngoingProjectSection } from '@/components/home/OngoingProjectSection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturedBuildings />
      <OngoingProjectSection />
      <PopularAreas />
      <CTASection />
    </Layout>
  );
};
export default Index;
