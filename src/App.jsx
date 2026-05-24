import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import SalaryInsights from './components/SalaryInsights';
import FeaturedCompanies from './components/FeaturedCompanies';
import RecentReviews from './components/RecentReviews';
import EksplorasiGaji from './components/EksplorasiGaji';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <SalaryInsights />
        <EksplorasiGaji />
        <FeaturedCompanies />
        <RecentReviews />
      </main>
      <Footer />
    </div>
  );
}
