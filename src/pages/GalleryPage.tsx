import { useState, useEffect, useRef } from "react";
import { NavbarSection } from "../screens/Mehr/sections/NavbarSection";
import { FooterSection } from "../screens/Mehr/sections/FooterSection";
import { X } from "lucide-react";

interface GalleryImage {
  src: string;
  alt: string;
}

const galleryImages: GalleryImage[] = [
  { src: "https://meher.b-cdn.net/Frame%2013.png", alt: "MEHR Gallery Image 1" },
  { src: "https://meher.b-cdn.net/Frame%2021.png", alt: "MEHR Gallery Image 2" },
  { src: "https://meher.b-cdn.net/Frame%2022.png", alt: "MEHR Gallery Image 3" },
  { src: "https://meher.b-cdn.net/Frame%2017.png", alt: "MEHR Gallery Image 4" },
  { src: "https://meher.b-cdn.net/Frame%2018.png", alt: "MEHR Gallery Image 5" },
  { src: "https://meher.b-cdn.net/Frame%2019.png", alt: "MEHR Gallery Image 6" },
  { src: "https://meher.b-cdn.net/Frame%2020.png", alt: "MEHR Gallery Image 7" },
  { src: "https://meher.b-cdn.net/Frame%2013%20(1).png", alt: "MEHR Gallery Image 8" },
  { src: "https://meher.b-cdn.net/Frame%2021%20(1).png", alt: "MEHR Gallery Image 9" },
  { src: "https://meher.b-cdn.net/Frame%2022%20(1).png", alt: "MEHR Gallery Image 10" },
];

export const GalleryPage = (): JSX.Element => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Auto-advance slideshow every 3 seconds on mobile
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
    }, 3000);
    
    return () => clearInterval(timer);
  }, [galleryImages.length]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    imageRefs.current.forEach((ref) => {
      if (!ref) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("animate-fadeInSlide");
              entry.target.classList.remove("opacity-0");
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: "0px 0px -50px 0px",
        }
      );

      observer.observe(ref);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = "unset";
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      handleCloseModal();
    }
  };

  useEffect(() => {
    if (selectedImage) {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setSelectedImage(null);
          document.body.style.overflow = "unset";
        }
      };
      window.addEventListener("keydown", handleEscape);
      return () => {
        window.removeEventListener("keydown", handleEscape);
        document.body.style.overflow = "unset";
      };
    }
  }, [selectedImage]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <NavbarSection />

      {/* Hero Section */}
      <div className="mx-auto w-full max-w-[1440px]">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 bg-[#FFDAB9] flex items-center justify-start pl-4 md:pl-16 pt-8 md:pt-0 pb-32 md:pb-24">
            <div className="max-w-[570px] text-left">
              <h1 className="text-[#A0522D] text-[32px] md:text-[48px] lg:text-[64px] font-normal leading-tight [font-family:'Poppins']">
                GALLERY
              </h1>
            </div>
          </div>
          <div className="flex-1">
            <img 
              src="/About us card.png"
              alt="MEHR Gallery" 
              className="w-full h-[300px] md:h-[500px] object-cover"
            />
          </div>
        </div>
      </div>

      {/* Gallery Content Section */}
      <div className="flex flex-col gap-4 md:gap-8 py-8 md:py-16 px-4 md:px-0">
        {/* Mobile Slideshow */}
        <div className="md:hidden relative w-full h-[400px] rounded-2xl overflow-hidden mb-6">
          <div className="relative w-full h-full">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
                onClick={() => handleImageClick(image)}
              >
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="w-full h-full object-cover cursor-pointer"
                />
              </div>
            ))}
          </div>
          
          {/* Slide indicators */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide 
                    ? 'bg-white w-6' 
                    : 'bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop Grid Layout */}
        <div className="hidden md:flex flex-col gap-4 md:gap-8">
          {/* First Row */}
          <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8">
            {galleryImages.slice(0, 3).map((image, index) => (
              <div
                key={index}
                ref={(el) => (imageRefs.current[index] = el)}
                className="opacity-0 flex justify-center cursor-pointer transform transition-transform duration-300 hover:scale-105"
                onClick={() => handleImageClick(image)}
              >
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="w-full max-w-full h-auto object-contain rounded-lg shadow-md"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          {/* Second Row */}
          <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8">
            {galleryImages.slice(3, 7).map((image, index) => (
              <div
                key={index + 3}
                ref={(el) => (imageRefs.current[index + 3] = el)}
                className="opacity-0 flex justify-center cursor-pointer transform transition-transform duration-300 hover:scale-105"
                onClick={() => handleImageClick(image)}
              >
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="w-full max-w-full h-auto object-contain rounded-lg shadow-md"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          {/* Third Row */}
          <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8">
            {galleryImages.slice(7, 10).map((image, index) => (
              <div
                key={index + 7}
                ref={(el) => (imageRefs.current[index + 7] = el)}
                className="opacity-0 flex justify-center cursor-pointer transform transition-transform duration-300 hover:scale-105"
                onClick={() => handleImageClick(image)}
              >
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="w-full max-w-full h-auto object-contain rounded-lg shadow-md"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Image Popup Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4 animate-fadeIn"
          onClick={handleCloseModal}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          <div
            className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors duration-200 bg-black bg-opacity-50 rounded-full p-2"
              aria-label="Close modal"
            >
              <X size={32} />
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}

      <FooterSection />
    </div>
  );
};
