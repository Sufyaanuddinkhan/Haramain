// Umrah.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import meccaUmrah from '../assets/umrah/mecca-umrah.webp';
import { FaHome, FaInfoCircle, FaServicestack, FaPhoneAlt } from 'react-icons/fa';
const UmrahHero = () => {
  return (
    <div className="relative w-full h-[60vh] overflow-hidden rounded-b-3xl shadow-lg">
      <motion.img
        src={meccaUmrah}
        alt="Umrah Hero"
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="w-full h-full object-cover"
      />
      
      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white px-4">
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-4xl md:text-5xl font-bold"
        >
          Umrah Guide
        </motion.h1>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-4 text-lg md:text-xl max-w-2xl"
        >
          Step-by-step journey to complete your sacred Umrah rituals with peace and devotion.
        </motion.p>
      </div>
    </div>
  );
};



const umrahSteps = [
  {
    title: "Ihram & Niyyah",
    image: meccaUmrah,
    content: [
      "Enter the state of Ihram before reaching the Miqat.",
      "Make a sincere intention to perform Umrah.",
      "Men wear unstitched white garments, women wear modest dress."
    ]
  },
  {
    title: "Tawaf",
    image: meccaUmrah,
    content: [
      "Perform 7 circuits around the Kaaba starting from the Black Stone.",
      "Ensure you remain in a state of Wudu (ablution)."
    ]
  },
  {
    title: "Pray at Maqam Ibrahim",
    image: meccaUmrah,
    content: [
      "Offer 2 Rak’ahs behind Maqam Ibrahim.",
      "Drink Zamzam water after prayer."
    ]
  },
  {
    title: "Sa’i between Safa & Marwah",
    image: meccaUmrah,
    content: [
      "Walk 7 times between the hills of Safa and Marwah.",
      "Begin at Safa and end at Marwah, remembering Hajar’s devotion."
    ]
  },
  {
    title: "Halq or Taqsir",
    image: meccaUmrah,
    content: [
      "Men shave their heads (Halq) or shorten their hair (Taqsir).",
      "Women cut a small portion of their hair.",
      "This marks the end of Umrah."
    ]
  },
  {
    title: "Arrival at Masjid al-Haram",
    image: meccaUmrah,
    content: [
      "Arrive at the Masjid al-Haram and stand in awe of the Kaaba.",
      "Make Du'a for peace and blessings during your stay."
    ]
  },
  {
    title: "Dua at the Kaaba",
    image: meccaUmrah,
    content: [
      "Stand near the Kaaba and make personal supplications (Dua).",
      "It is recommended to pray for yourself, family, and the Ummah."
    ]
  },
  {
    title: "Drinking Zamzam Water",
    image: meccaUmrah,
    content: [
      "Drink Zamzam water after performing Tawaf and Sa'i.",
      "It is a sacred and blessed drink, providing spiritual nourishment."
    ]
  },
  {
    title: "Visit to Medina (Optional)",
    image: meccaUmrah,
    content: [
      "A visit to the Prophet’s Mosque (Masjid an-Nabawi) is optional but highly recommended.",
      "Offer prayers and seek blessings at the tomb of Prophet Muhammad (PBUH)."
    ]
  }
];


const menuItems = [
  { label: 'History', content: 'Detailed history content here.' },
  { label: 'Cultural & Spiritual Significance', content: 'Cultural and spiritual significance content here.' },
  { label: 'Grand Mosque', content: 'Grand Mosque content here.' },
  { label: 'Attractions', content: 'Attractions content here.' },
  { label: 'Holy Sites', content: 'Holy sites content here.' },
  { label: 'Getting to Makkah', content: 'Travel information content here.' },
];




const Umrah = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextStep();
    }, 6000);
    return () => clearInterval(interval);
  }, [currentStep]);

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % umrahSteps.length);
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + umrahSteps.length) % umrahSteps.length);
  };

  const goToStep = (index) => {
    setCurrentStep(index);
  };

  return (
    
    <div className="flex flex-col items-center justify-center">
      
      {/* Hero Section */}
      <UmrahHero />
      
      {/* Main Slider */}
      <div className="flex flex-col items-center justify-center p-6 w-full">
        <div className="relative w-full max-w-3xl h-[450px] overflow-hidden rounded-2xl shadow-2xl bg-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.8}
              onDragEnd={(event, info) => {
                if (info.offset.x < -100) {
                  nextStep();
                } else if (info.offset.x > 100) {
                  prevStep();
                }
              }}
              className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center p-6 cursor-grab"
            >
              <img
                src={umrahSteps[currentStep].image}
                alt={umrahSteps[currentStep].title}
                className="w-full h-52 object-cover rounded-lg mb-4"
              />
              <h2 className="text-2xl font-bold mb-2 text-center">{umrahSteps[currentStep].title}</h2>
              <ul className="text-gray-700 text-sm list-disc list-inside space-y-1">
                {umrahSteps[currentStep].content.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between w-full max-w-3xl mt-4 px-8">
          <button
            onClick={prevStep}
            className="bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300 transition"
          >
            Previous
          </button>
          <button
            onClick={nextStep}
            className="bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300 transition"
          >
            Next
          </button>
        </div>

        {/* Mini Thumbnail Slider */}
        <div className="flex overflow-x-auto w-full max-w-4xl mt-6 space-x-3 px-4 pb-2">
          {umrahSteps.map((step, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => goToStep(index)}
              className={`cursor-pointer flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-2 transition-all
                ${currentStep === index ? 'border-blue-500' : 'border-transparent'}
              `}
            >
              <img
                src={step.image}
                alt={step.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Umrah;


