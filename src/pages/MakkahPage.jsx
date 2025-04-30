import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeroSection, ImageTextSection, ExpandableCard } from "../components/PageComponent";
import { FaMapMarkerAlt, FaMosque, FaKaaba, FaLandmark, FaStarOfDavid } from 'react-icons/fa';

import makkahBg from "../assets/makkah/masjid_al_jharam-nightview.jpg";
import makkahg from "../assets/makkah/oldmakkah.webp";
import clocktower from "../assets/makkah/clock_tower.jpg";

const menuItems = [
  { label: 'History', icon: <FaMapMarkerAlt /> },
  { label: 'Cultural & Spiritual Significance', icon: <FaMosque /> },
  { label: 'Grand Mosque', icon: <FaKaaba /> },
  { label: 'Attractions', icon: <FaLandmark /> },
  { label: 'Holy Sites', icon: <FaStarOfDavid /> },
];

const MakkahPage = () => {
  const [selected, setSelected] = useState('History');

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <HeroSection
        title="Welcome to Makkah!"
        subtitle="The sacred heart of Islam, home to the Kaaba"
        backgroundImage={makkahBg}
      />

      {/* Sticky Secondary Nav */}
      <motion.nav
        className="bg-yellow-200 w-full py-3 shadow sticky top-0 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-screen-xl mx-auto px-4">
          <ul className="flex flex-wrap justify-between text-gray-800 font-semibold">
            {menuItems.map((item, index) => (
              <motion.li
                key={index}
                className={`cursor-pointer px-2 py-1 flex items-center gap-2 ${
                  selected === item.label
                    ? 'border-b-4 border-yellow-500 text-yellow-700'
                    : 'hover:text-yellow-600'
                }`}
                onClick={() => setSelected(item.label)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.icon} {item.label}
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.nav>

      {/* Animated Content Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selected}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="px-4 py-6 bg-white shadow-inner max-w-screen-xl mx-auto"
        >
          {selected === 'History' && (
            <ImageTextSection
              title="History of Makkah"
              image={makkahg}
              description={`Makkah’s historical roots extend deep into ancient times...`}
              colorScheme="alt"
            />
          )}

          {selected === 'Cultural & Spiritual Significance' && (
            <ImageTextSection
              title="Cultural and Spiritual Influence"
              image={clocktower}
              description={`The influence of Makkah extends far beyond its geographical boundaries...`}
              reverse={true}
            />
          )}

          {selected === 'Grand Mosque' && (
            <section className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-center mb-4">The Grand Mosque of Makkah</h2>
              <p className="text-center mb-4">
                The Grand Mosque (Masjid al-Haram) is the largest mosque in the world and the holiest site in Islam...
              </p>
              <ImageTextSection
                image={makkahBg}
                description={
                  <div className="text-left mb-6">
                    <h3 className="text-xl font-semibold">Quick Facts</h3>
                    <ul className="list-disc list-inside mt-2">
                      <li>Capacity: 1 million+ people</li>
                      <li>Established in the 7th century</li>
                      <li>Home to the Kaaba, the most sacred structure in Islam</li>
                    </ul>
                  </div>
                }
              />
              <ExpandableCard title="Explore Masjid Al Haram" file="masjid-e-haram.json" />
            </section>
          )}

          {selected === 'Attractions' && (
            <ExpandableCard title="Attractions in Makkah" file="makkah_at.json" />
          )}

          {selected === 'Holy Sites' && (
            <ExpandableCard title="Holy Places in Makkah" file="makkah_hp.json" />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MakkahPage;
