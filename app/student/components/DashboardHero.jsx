"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

export default function DashboardHero() {
  const heroImages = [
    { src: "/learn2.jpg", alt: "Learn and grow your skills" },
    { src: "/learn1.jpg", alt: "Track your progress easily" },
    { src: "/learn3.jpg", alt: "Achieve your goals faster" },
  ];

  const [currentImage, setCurrentImage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState(0);

  const nextImage = useCallback(() => {
    setCurrentImage((prev) => (prev + 1) % heroImages.length);
  }, [heroImages.length]);

  const prevImage = () => {
    setCurrentImage(
      (prev) => (prev - 1 + heroImages.length) % heroImages.length,
    );
  };

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval);
  }, [isPlaying, nextImage]);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 80 : -80,
      opacity: 0,
      scale: 1.05,
      filter: "blur(4px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
    },
    exit: (direction) => ({
      x: direction > 0 ? -80 : 80,
      opacity: 0.2,
      scale: 1.03,
      filter: "blur(3px)",
    }),
  };

  const handleNext = () => {
    setDirection(1);
    nextImage();
  };
  const handlePrev = () => {
    setDirection(-1);
    prevImage();
  };

  const goToImage = (index) => {
    setCurrentImage(index);
  };

  return (
    <section
      className="relative min-h-[40vh] md:min-h-[60vh] overflow-hidden rounded-3xl shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background images */}
      <div className="absolute inset-0">
        <AnimatePresence mode="sync" initial={false} custom={direction}>
          <motion.div
            key={currentImage}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 2, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={heroImages[currentImage].src}
              alt={heroImages[currentImage].alt}
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-black/50" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide controls */}
      <button
        onClick={handlePrev}
        className={`absolute left-6 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-white" />
      </button>
      <button
        onClick={handleNext}
        className={`absolute right-6 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-white" />
      </button>

      {/* Play/Pause */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className={`absolute top-4 right-4 md:top-6 md:right-6 z-30 p-2 rounded-full backdrop-blur-md border border-white/20 transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        } ${isPlaying ? "bg-white/20 hover:bg-white/30" : "bg-black/50 hover:bg-black/60"}`}
      >
        {isPlaying ? (
          <Pause className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
        ) : (
          <Play className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
        )}
      </button>

      {/* Hero text */}
      <div className="relative z-20 flex items-center justify-center min-h-[40vh] md:min-h-[60vh] px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-2 md:mb-4">
            Welcome to Your Dashboard
          </h1>
          <p className="text-white/90 text-base md:text-lg">
            Track your subjects, progress, and achievements in one place
          </p>
        </motion.div>
      </div>

      {/* Image indicators */}
      <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToImage(index)}
            className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-300 ${
              index === currentImage
                ? "bg-white scale-125"
                : "bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
