import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import SalaryInsights from './components/SalaryInsights';
import FeaturedCompanies from './components/FeaturedCompanies';
import RecentReviews from './components/RecentReviews';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <SalaryInsights />
        <FeaturedCompanies />
        <RecentReviews />
      </main>
      <Footer />
    </div>
  );
}
