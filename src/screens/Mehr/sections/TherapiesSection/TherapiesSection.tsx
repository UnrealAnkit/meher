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
    activeImage: "/therapies-programs-2.png"
  },
  {
    id: 2,
    title: "Diagnostics",
    description: "State-of-the-art diagnostic services utilizing advanced technology for accurate health evaluations and early detection of potential health concerns.",
    defaultImage: "/Therapies-Programs.png",
    activeImage: "/therapies-programs-3.jpg"
  },
  {
    id: 3,
    title: "Naturopathy Treatments",
    description: "Holistic naturopathy treatments that harness the healing power of nature, promoting natural healing and overall wellness through traditional methods.",
    defaultImage: "/Therapies-Programs.png",
    activeImage: "/therapies-programs-4.jpg"
  },
  {
    id: 4,
    title: "Emotional Wellness",
    description: "Comprehensive emotional wellness programs designed to nurture mental health, reduce stress, and promote emotional balance through therapeutic approaches.",
    defaultImage: "/Therapies-Programs.png",
    activeImage: "/therapies-programs-2.png"
  },
  {
    id: 5,
    title: "Creative Therapies",
    description: "Innovative creative therapy sessions that combine artistic expression with healing, helping you discover new ways to express, heal, and grow.",
    defaultImage: "/Therapies-Programs.png",
    activeImage: "/therapies-programs-3.jpg"
  }
];

const TherapiesSection: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const navigate = useNavigate();

  return (
    <section className="relative w-full bg-white py-20">
      <div className="max-w-[1440px] mx-auto">
        <h2 className="text-center [font-family:'Poppins',Helvetica] font-semibold text-[#ab4b28] text-[40px] tracking-[0] leading-5 mb-16">
          THERAPIES & PROGRAMS
        </h2>
        
        <div className="relative w-full h-[500px] overflow-hidden">
          {/* Background Image Layer */}
          <div className="absolute inset-0">
            {/* Default Image */}
            <img
              src="/Therapies-Programs.png"
              alt="Background"
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                hoveredCard === null ? 'opacity-100' : 'opacity-0'
              }`}
            />
            
            {/* Active Images */}
            {therapyData.map((therapy) => (
              <img
                key={therapy.id}
                src={therapy.activeImage}
                alt={therapy.title}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                  hoveredCard === therapy.id ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
            
            <div className="absolute inset-0 bg-black bg-opacity-40" />
          </div>

          {/* Interactive Sections */}
          <div className="relative h-full flex">
            {therapyData.map((therapy, index) => (
              <div
                key={therapy.id}
                className="relative flex-1 h-full cursor-pointer group"
                onMouseEnter={() => setHoveredCard(therapy.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Vertical Divider */}
                {index > 0 && (
                  <div className="absolute left-0 top-0 w-[1px] h-full bg-white/30" />
                )}

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4">
                  <motion.h3 
                    className="text-white text-2xl font-semibold mb-4 relative z-10"
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
                        className="text-white text-sm leading-relaxed max-w-md"
                      >
                        {therapy.description}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Arrow */}
                  <motion.div
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ 
                      opacity: hoveredCard === therapy.id ? 1 : 0,
                      y: hoveredCard === therapy.id ? 0 : 10
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <svg 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      className="text-white"
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

                {/* Hover Effect */}
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

        {/* Explore Programs Button */}
        <div className="flex justify-center mt-12">
          <Button
            onClick={() => navigate('/programs')}
            className="w-[314px] h-11 bg-[#ab4b28] hover:bg-[#8f3e21] rounded-[60px] [font-family:'Poppins',Helvetica] font-bold text-white text-xl tracking-[0.50px] leading-[22px]"
          >
            EXPLORE PROGRAMS
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TherapiesSection;