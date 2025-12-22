import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../../../components/ui/button';
import { useNavigate } from 'react-router-dom';

interface TherapyCard {
  id: number;
  title: string;
  description: string;
  defaultImage: string;
  activeImage: string;
}

const therapyData: TherapyCard[] = [
  {
    id: 1,
    title: "Medical Consultations",
    description: "Expert medical consultations with experienced healthcare professionals, providing comprehensive health assessments and personalized treatment plans.",
    defaultImage: "/Therapies-Programs.png",
    activeImage: "https://meher.b-cdn.net/Medical%20Consultations-min.jpg"
  },
  {
    id: 2,
    title: "Diagnostics",
    description: "State-of-the-art diagnostic services utilizing advanced technology for accurate health evaluations and early detection of potential health concerns.",
    defaultImage: "/Therapies-Programs.png",
    activeImage: "https://meher.b-cdn.net/Diagnostics-min.jpg"
  },
  {
    id: 3,
    title: "Naturopathy Treatments",
    description: "Holistic naturopathy treatments that harness the healing power of nature, promoting natural healing and overall wellness through traditional methods.",
    defaultImage: "/Therapies-Programs.png",
    activeImage: "https://meher.b-cdn.net/Naturopathy%20Treatmentscopy-min-min.jpg"
  },
  {
    id: 4,
    title: "Emotional Wellness",
    description: "Comprehensive emotional wellness programs designed to nurture mental health, reduce stress, and promote emotional balance through therapeutic approaches.",
    defaultImage: "/Therapies-Programs.png",
    activeImage: "https://meher.b-cdn.net/Emotional%20Wellness-min-min.JPG"
  },
  {
    id: 5,
    title: "Creative Therapies",
    description: "Innovative creative therapy sessions that combine artistic expression with healing, helping you discover new ways to express, heal, and grow.",
    defaultImage: "/Therapies-Programs.png",
    activeImage: "https://meher.b-cdn.net/Creative%20Therapies-min-min.jpg"
  }
];

const TherapiesSection: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    // Only preload the default image, let others load on demand
    const preloadDefaultImage = () => {
      const img = new Image();
      img.onload = () => setIsLoaded(true);
      img.onerror = () => setIsLoaded(true); // Show default even if image fails
      img.src = '/Therapies-Programs.png';
    };

    preloadDefaultImage();
  }, []);

  return (
    <section className="relative w-full bg-[#f9d2a3] py-10 sm:py-14 md:py-16 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
        <h2 className="text-center [font-family:'Poppins',Helvetica] font-light text-black text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] xl:text-[40px] tracking-[0] leading-[28px] sm:leading-[32px] md:leading-[36px] lg:leading-[40px] mb-8 sm:mb-12 md:mb-14 lg:mb-16">
          THERAPIES & PROGRAMS
        </h2>
        
        <div className="relative w-full h-[600px] sm:h-[650px] md:h-[480px] lg:h-[500px] overflow-hidden">
           
           <div className="absolute inset-0">
             {isLoaded && (
               <>
                 
                 <motion.div
                   className="absolute inset-0"
                   initial={false}
                   animate={{ opacity: hoveredCard === null ? 1 : 0 }}
                   transition={{ duration: 0.2 }}
                 >
                   <img
                     src="/Therapies-Programs.png"
                     alt="Background"
                     className="w-full h-full object-cover"
                     loading="eager"
                     decoding="async"
                   />
                 </motion.div>

                 {therapyData.map((therapy) => (
                   <motion.div
                     key={therapy.id}
                     className="absolute inset-0"
                     initial={false}
                     animate={{ opacity: hoveredCard === therapy.id ? 1 : 0 }}
                     transition={{ duration: 0.2 }}
                   >
                     <img
                       src={therapy.activeImage}
                       alt={therapy.title}
                       className="w-full h-full object-cover"
                       loading="lazy"
                       decoding="async"
                     />
                   </motion.div>
                 ))}
               </>
             )}
             
             <div className="absolute inset-0 bg-black bg-opacity-40" />
          </div>

          <div className="relative h-full flex flex-col md:flex-row">
            {therapyData.map((therapy, index) => (
              <div
                key={therapy.id}
                className="relative flex-1 h-full min-h-[120px] sm:min-h-[130px] md:min-h-0 cursor-pointer group"
                onMouseEnter={() => setHoveredCard(therapy.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => setHoveredCard(hoveredCard === therapy.id ? null : therapy.id)}
              >
                
                {index > 0 && (
                  <div className="hidden md:block absolute left-0 top-0 w-[1px] h-full bg-white/30" />
                )}
                
                {index > 0 && (
                  <div className="md:hidden absolute top-0 left-0 w-full h-[1px] bg-white/30" />
                )}

                <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-2 sm:p-3 md:p-4">
                  <motion.h3 
                    className="text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-semibold mb-1 sm:mb-2 md:mb-4 relative z-10 px-1"
                    animate={{ 
                      y: hoveredCard === therapy.id ? -10 : 0,
                      transition: { duration: 0.3, ease: "easeInOut" }
                    }}
                  >
                    {therapy.title}
                  </motion.h3>
                  
                  <AnimatePresence mode="wait">
                    {hoveredCard === therapy.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="text-white text-[10px] sm:text-xs md:text-sm leading-relaxed max-w-md px-2"
                      >
                        {therapy.description}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.div
                    className="absolute bottom-2 sm:bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ 
                      opacity: hoveredCard === therapy.id ? 1 : 0,
                      y: hoveredCard === therapy.id ? 0 : 10
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <svg 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      className="text-white sm:w-6 sm:h-6"
                    >
                      <path 
                        d="M7 14L12 9L17 14" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>
                </div>

                <motion.div
                  className="absolute inset-0 bg-black"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: hoveredCard === therapy.id ? 0 : 
                            hoveredCard === null ? 0 : 0.1 
                  }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-8 sm:mt-10 md:mt-12">
          <Button
            onClick={() => navigate('/learning')}
            className="w-full sm:w-[280px] md:w-[300px] lg:w-[314px] h-10 sm:h-11 bg-[#f9d2a3] hover:bg-[#f5c88f] border border-black rounded-[60px] [font-family:'Poppins',Helvetica] font-light text-black text-base sm:text-lg md:text-xl tracking-[0.50px] leading-[20px] sm:leading-[22px]"
          >
            EXPLORE PROGRAMS
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TherapiesSection;