import type React from 'react';
import { useState, useEffect, useRef } from 'react';

interface CountdownProps {
  isComplete: boolean;
  onComplete: () => void;
}

// Hook for intersection observer
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, { threshold: 0.1, ...options });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [options]);

  return [ref, isIntersecting] as const;
};

const CountdownCircle: React.FC<CountdownProps> = ({ isComplete, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const radius = 40;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    if (!isComplete) {
      const timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer);
            setTimeout(onComplete, 100);
            return 100;
          }
          return prev + 100 / 150; // 1.5 seconds = 150 frames at 100fps
        });
      }, 10);

      return () => clearInterval(timer);
    }
  }, [isComplete, onComplete]);

  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <div className="text-center">
        <svg width="100" height="100" className="transform -rotate-90">
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="#1A1A1A"
            strokeWidth="3"
            fill="none"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="#FF0066"
            strokeWidth="3"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-100 ease-out"
          />
        </svg>
        <div className="font-bebas text-xs neon-pink mt-2">{Math.round(progress)}%</div>
      </div>
    </div>
  );
};

const Navigation: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
  return (
    <nav className={`fixed top-0 w-full z-40 nav-fade ${!isVisible ? 'hidden' : ''}`}>
      <div className="flex justify-between items-center p-6">
        <div className="flex items-center space-x-2">
          <span className="text-2xl neon-pink heartbeat">❤️</span>
          <span className="font-bebas text-xl neon-pink uppercase tracking-wider">Shopdiva</span>
        </div>

        <div className="hidden md:flex items-center space-x-8 font-medium text-sm uppercase tracking-wide">
          <button className="hover:neon-pink transition-colors duration-300 hover:scale-110 transform">Shop</button>
          <button className="hover:neon-pink transition-colors duration-300 hover:scale-110 transform">New Arrivals</button>
          <button className="hover:neon-pink transition-colors duration-300 hover:scale-110 transform">About</button>
          <button className="hover:neon-pink transition-colors duration-300 hover:scale-110 transform">Snapchat Updates</button>
        </div>

        <div className="flex items-center space-x-4">
          <a href="https://instagram.com" className="text-xl hover:neon-pink transition-colors duration-300">📷</a>
          <a href="https://snapchat.com" className="text-xl hover:neon-pink transition-colors duration-300">👻</a>
        </div>
      </div>
    </nav>
  );
};

const ScrollIndicator: React.FC = () => {
  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-30">
      <div className="w-1 h-20 bg-gradient-to-b from-transparent via-pink-500 to-transparent pulse-line" />
    </div>
  );
};

const HeroSection: React.FC<{ showContent: boolean }> = ({ showContent }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className={`absolute inset-0 bg-cover bg-center ${showContent ? 'zoom-effect' : ''}`}
        style={{
          backgroundImage: 'url("https://ugc.same-assets.com/xtq9Z7bzfvmlQ6FkCIcdKkee1C00xsUj.jpeg")',
        }}
      >
        {/* Overlay - reduced opacity for better image visibility */}
        <div className="absolute inset-0 bg-black bg-opacity-10" />
      </div>

      {/* Content */}
      {showContent && (
        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
          <h1 className="hero-title font-bold text-6xl md:text-7xl lg:text-8xl neon-pink text-stroke-gold mb-6 fade-in drop-shadow-2xl">
            Urban. Unapologetic. Yours.
          </h1>

          <p className="hero-subtitle text-xl md:text-2xl gold font-light mb-12 fade-in-delay drop-shadow-lg">
            Launching May 16, 2025 – Stay tuned for exclusive drops.
          </p>

          {/* CTA Buttons */}
          <div className="space-y-6 md:space-y-0 md:space-x-6 md:flex md:justify-center fade-in-delay">
            <button className="cta-button bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-300 gold-glow">
              Join the Waitlist
            </button>
          </div>

          {/* Secondary CTAs */}
          <div className="mt-16 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 fade-in-delay">
            <button className="cta-button bg-pink-600 hover:bg-pink-500 text-white font-semibold py-3 px-6 rounded-lg neon-glow">
              View Snapchat Drops
            </button>
            <button className="cta-button bg-black hover:bg-gray-900 gold text-yellow-400 font-semibold py-3 px-6 rounded-lg border border-yellow-400">
              Explore Collection
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

const NewArrivals: React.FC = () => {
  const [sectionRef, isVisible] = useIntersectionObserver();

  // Product images array with real streetwear items
  const productImages = [
    "https://ugc.same-assets.com/HlXB1cBz4lk3iFJP_qqRWcVCcZEBhLOt.jpeg", // Neon graphic tee
    "https://ugc.same-assets.com/9SJyTmN6C7c2UXJTq6dS7MDQ-chO60tE.jpeg", // Dark art tee
    "https://ugc.same-assets.com/1Enzr3yAp_dRjkI13sqzRjuJWrt67r1D.jpeg", // Streetwear hoodie
    "https://ugc.same-assets.com/PyUppEJov4Xi0tAxvru58eh2vpxV29l7.jpeg", // Black sweatshirt
    "https://ugc.same-assets.com/KRGvrOPuoqL7PDA4JqQYs65NYCb-SMV6.jpeg", // Vintage neon tee
    "https://ugc.same-assets.com/O3KOTHMG_-EPKZgAhsTsz3QCvqfy0EVA.jpeg"  // Streetwear jacket
  ];

  const productTypes = [
    "Neon Graphic Tee",
    "Dark Art Tee",
    "Oversized Hoodie",
    "Essential Crewneck",
    "Vintage Skate Tee",
    "Tech Bomber Jacket"
  ];

  return (
    <section ref={sectionRef} className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className={`font-bebas text-5xl md:text-6xl gradient-text text-center mb-16 ${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
          New Arrivals
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((item, index) => (
            <div
              key={item}
              className={`product-card group cursor-pointer ${isVisible ? 'fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-gray-900 aspect-square rounded-lg overflow-hidden mb-4 relative">
                <div className="product-overlay absolute inset-0 bg-gradient-to-br from-pink-600/20 to-yellow-400/20 opacity-0 transition-opacity duration-300" />
                <img
                  src={productImages[index]}
                  alt={`Limited Edition ${productTypes[index]} #${item}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-pink-600 text-white px-2 py-1 rounded text-xs font-bold">
                  LIMITED
                </div>
              </div>
              <h3 className="font-semibold text-lg mb-2">Limited Edition {productTypes[index]} #{item}</h3>
              <p className="text-gray-400 mb-3">Urban streetwear collection</p>
              <p className="gold font-bold text-xl">${[79, 89, 94, 84, 74, 99][index]}.99</p>
            </div>
          ))}
        </div>

        <div className={`text-center mt-12 ${isVisible ? 'fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
          <button className="cta-button bg-pink-600 hover:bg-pink-500 text-white font-semibold py-4 px-8 rounded-lg text-lg neon-glow">
            Snapchat First Access
          </button>
        </div>
      </div>
    </section>
  );
};

const BrandStory: React.FC = () => {
  const [sectionRef, isVisible] = useIntersectionObserver();

  return (
    <section ref={sectionRef} className="py-20 px-6 bg-gray-900/50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className={`font-bebas text-5xl md:text-6xl neon-pink mb-12 ${isVisible ? 'slide-in-left' : 'opacity-0'}`}>
          Our Story
        </h2>

        <div className={`space-y-8 text-lg leading-relaxed ${isVisible ? 'slide-in-right' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
          <p className="text-gray-300">
            Born from the streets, shaped by rebellion. Shopdiva emerged from the underground skate scene,
            where style meets substance and every piece tells a story of urban authenticity.
          </p>

          <p className="text-gray-300">
            We're not just another fashion brand – we're a movement. A collective of skaters, artists,
            and dreamers who refuse to conform to the ordinary.
          </p>

          <blockquote className="text-2xl gold italic font-light border-l-4 border-pink-600 pl-6 my-12">
            "Fashion should move with you, not against you. Every stitch, every design,
            every piece we create is made for those who dare to be different."
            <cite className="block text-base text-gray-400 mt-4 not-italic">- Founder, Shopdiva</cite>
          </blockquote>
        </div>

        <div className={`mt-12 ${isVisible ? 'fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
          <button className="cta-button bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-4 px-8 rounded-lg text-lg gold-glow">
            Meet the Team
          </button>
        </div>
      </div>
    </section>
  );
};

const LaunchCountdown: React.FC = () => {
  const [sectionRef, isVisible] = useIntersectionObserver();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date('2025-05-16T00:00:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Social Feed Mockup */}
          <div className={`${isVisible ? 'slide-in-left' : 'opacity-0'}`}>
            <h3 className="font-bebas text-3xl neon-pink mb-8">Follow Our Journey</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((post, index) => (
                <div
                  key={post}
                  className="bg-gray-900 p-4 rounded-lg flex items-center space-x-4 hover:bg-gray-800 transition-colors duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center">
                    📷
                  </div>
                  <div>
                    <p className="font-semibold">@shopdiva_official</p>
                    <p className="text-gray-400 text-sm">Behind the scenes at our latest photoshoot...</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Countdown Timer */}
          <div className={`text-center ${isVisible ? 'slide-in-right' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
            <h3 className="font-bebas text-4xl gold mb-8">Launch Countdown</h3>
            <div className="grid grid-cols-4 gap-4">
              {Object.entries(timeLeft).map(([unit, value], index) => (
                <div
                  key={unit}
                  className="bg-black border border-pink-600 rounded-lg p-4 hover:border-gold transition-colors duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-3xl font-bold neon-pink">{value}</div>
                  <div className="text-sm uppercase text-gray-400">{unit}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  const [footerRef, isVisible] = useIntersectionObserver();

  return (
    <footer ref={footerRef} className="bg-gray-900 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 ${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <span className="text-3xl neon-pink heartbeat">❤️</span>
              <span className="font-bebas text-2xl neon-pink uppercase tracking-wider">Shopdiva</span>
            </div>
            <p className="text-gray-400 mb-4">
              Urban streetwear that moves with your style. Born from skate culture, designed for rebels.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" className="text-xl hover:neon-pink transition-colors duration-300">📷</a>
              <a href="https://snapchat.com" className="text-xl hover:neon-pink transition-colors duration-300">👻</a>
              <a href="https://tiktok.com" className="text-xl hover:neon-pink transition-colors duration-300">🎵</a>
              <a href="https://youtube.com" className="text-xl hover:neon-pink transition-colors duration-300">📺</a>
            </div>
          </div>

          {/* Shop Section */}
          <div className={`${isVisible ? 'slide-in-left' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>
            <h4 className="font-bebas text-lg gold mb-4 uppercase">Shop</h4>
            <ul className="space-y-2 text-gray-400">
              <li><button className="hover:neon-pink transition-colors duration-300 text-left">New Arrivals</button></li>
              <li><button className="hover:neon-pink transition-colors duration-300 text-left">Skate Collection</button></li>
              <li><button className="hover:neon-pink transition-colors duration-300 text-left">Streetwear</button></li>
              <li><button className="hover:neon-pink transition-colors duration-300 text-left">Accessories</button></li>
              <li><button className="hover:neon-pink transition-colors duration-300 text-left">Limited Drops</button></li>
            </ul>
          </div>

          {/* Company Section */}
          <div className={`${isVisible ? 'slide-in-left' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            <h4 className="font-bebas text-lg gold mb-4 uppercase">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><button className="hover:neon-pink transition-colors duration-300 text-left">About Us</button></li>
              <li><button className="hover:neon-pink transition-colors duration-300 text-left">Our Story</button></li>
              <li><button className="hover:neon-pink transition-colors duration-300 text-left">Careers</button></li>
              <li><button className="hover:neon-pink transition-colors duration-300 text-left">Press</button></li>
              <li><button className="hover:neon-pink transition-colors duration-300 text-left">Contact</button></li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className={`${isVisible ? 'slide-in-right' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
            <h4 className="font-bebas text-lg gold mb-4 uppercase">Stay Updated</h4>
            <p className="text-gray-400 mb-4 text-sm">
              Get exclusive drops and behind-the-scenes content straight to your inbox.
            </p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-black border border-gray-600 rounded text-white placeholder-gray-400 focus:border-pink-600 focus:outline-none transition-colors duration-300"
              />
              <button className="w-full cta-button bg-pink-600 hover:bg-pink-500 text-white font-semibold py-2 px-4 rounded neon-glow">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Launch Banner */}
        <div className={`bg-gradient-to-r from-pink-600/20 to-yellow-400/20 rounded-lg p-6 mb-8 text-center ${isVisible ? 'fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
          <h3 className="font-bebas text-2xl md:text-3xl gradient-text mb-2">
            May 16, 2025 - The Revolution Begins
          </h3>
          <p className="text-gray-300 mb-4">
            Join the waitlist for exclusive early access to our launch collection
          </p>
          <button className="cta-button bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-3 px-6 rounded-lg gold-glow">
            Join Waitlist Now
          </button>
        </div>

        {/* Bottom Footer */}
        <div className={`border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center ${isVisible ? 'fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.5s' }}>
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 Shopdiva. All rights reserved. Made with ❤️ for the streets.
          </div>
          <div className="flex space-x-6 text-sm text-gray-400">
            <button className="hover:neon-pink transition-colors duration-300">Privacy Policy</button>
            <button className="hover:neon-pink transition-colors duration-300">Terms of Service</button>
            <button className="hover:neon-pink transition-colors duration-300">Size Guide</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

const App: React.FC = () => {
  const [showContent, setShowContent] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setNavVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleCountdownComplete = () => {
    setShowContent(true);
  };

  return (
    <div className="bg-black text-white min-h-screen">
      {!showContent && (
        <CountdownCircle isComplete={showContent} onComplete={handleCountdownComplete} />
      )}

      <Navigation isVisible={navVisible} />
      <ScrollIndicator />

      <HeroSection showContent={showContent} />
      <NewArrivals />
      <BrandStory />
      <LaunchCountdown />
      <Footer />
    </div>
  );
};

export default App;
