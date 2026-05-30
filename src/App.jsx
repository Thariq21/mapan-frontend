import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import SalaryInsights from './components/SalaryInsights';
import FeaturedCompanies from './components/FeaturedCompanies';
import RecentReviews from './components/RecentReviews';
import EksplorasiGaji from './components/EksplorasiGaji';
import Footer from './components/Footer';
import ReviewCv from './components/ReviewCv';

export default function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Handle smooth scrolling to target element after navigation/hash change
  useEffect(() => {
    if (currentHash && currentHash !== '#review-cv') {
      const id = currentHash.substring(1);
      // Wait for components to mount if switching views
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        const timeoutId = setTimeout(() => {
          const delayedElement = document.getElementById(id);
          if (delayedElement) {
            delayedElement.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
        return () => clearTimeout(timeoutId);
      }
    } else if (!currentHash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentHash]);

  const isReviewCv = currentHash === '#review-cv';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentHash={currentHash} />
      <main className="flex-1">
        {isReviewCv ? (
          <ReviewCv />
        ) : (
          <>
            <HeroSection />
            <SalaryInsights />
            <EksplorasiGaji />
            <FeaturedCompanies />
            <RecentReviews />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

