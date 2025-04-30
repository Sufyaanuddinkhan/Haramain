import React from "react";
import { motion } from 'framer-motion';

import {Card,Hero,PopupAd} from "../components/PageComponent";
import makkahImg from "../assets/makkah/masjid_al_jharam-nightview2.jpg";
import makkahHero from '../assets/makkah/masjid_al_jharam-nightview2.jpg';
import madinaImg from "../assets/madina.jpeg";
 const HeroSections = () => {
  return ( 
    <Hero
    backgroundImage={makkahHero}
    title="Explore the beauty and spirituality of Makkah & Madina"
    description="Your comprehensive guide to exploring Makkah and Madinah, the two holiest cities in Islam."
  
  />

  )}   


const ExploreSection = () => {
  return (
<div>
<section className="py-12 px-4 md:px-12 bg-gray-50">
  <h2 className="text-3xl font-bold text-center mb-10">Explore Our Site</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
      <Card
        image={makkahImg}
        title="Makkah"
        description="The sacred city of Makkah, home to the Kaaba and Masjid al-Haram."
        link="/makkah"
      />
      <Card 
        image={madinaImg}
        title="Madina"
        description="City of the Prophet (PBUH), home to Masjid al-Nabawi and rich Islamic history."
        link="/madina"
      />
        <Card
        image={makkahImg}
        title="Umrah"
        description="The sacred city of Makkah, home to the Kaaba and Masjid al-Haram."
        link="/makkah"
      />
            <Card
        image={makkahImg}
        title="Hajj"
        description="The sacred city of Makkah, home to the Kaaba and Masjid al-Haram."
        link="/makkah"
      />
  </div>


</section>
</div>  
  );
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, duration: 0.6, ease: "easeOut" },
  }),
};

const HeartSoulSection = () => {
  return (
    <section className="bg-gradient-to-br from-white to-gray-100 py-16 px-4">
      <motion.div
        className="max-w-5xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2 className="text-4xl font-bold text-gray-800 mb-6">
          Makkah & Madina — The Heart and Soul of Islam
        </motion.h2>

        <motion.p
          className="text-lg text-gray-600 max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          If <span className="font-semibold text-gray-800">Makkah</span> is the{" "}
          <span className="italic text-red-600">Heart</span> of Islam, where the
          message began, then{" "}
          <span className="font-semibold text-gray-800">Madina</span> is the{" "}
          <span className="italic text-green-600">Soul</span>, where it blossomed with peace, love, and unity.
        </motion.p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-10">
          {[{
            title: "Makkah – The Heart",
            items: [
              "✨ Birthplace of Prophet Muhammad (PBUH)",
              "📖 Where the first revelation was received",
              "🏛️ Home of the Kaaba – Qibla for all Muslims",
              "🕋 Center of Hajj and Tawheed",
            ],
          },
          {
            title: "Madina – The Soul",
            items: [
              "🌇 City of the Prophet’s Hijrah (migration)",
              "🕌 Home of Masjid an-Nabawi",
              "❤️ Symbol of peace, mercy, and unity",
              "🌹 Final resting place of Prophet Muhammad (PBUH)",
            ],
          }].map((card, index) => (
            <motion.div
              key={card.title}
              className="bg-white rounded-2xl shadow p-6 border border-gray-200 w-full max-w-md text-left cursor-pointer"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover={{
                scale: 1.05,
                y: -8,
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              }}
              viewport={{ once: true }}
              custom={index}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                {card.title}
              </h3>
              <ul className="text-gray-600 space-y-2 text-sm">
                {card.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};




// const SubscribeSection = () => {
//   return (
//       <section className="py-16 bg-white">
//         <div className="max-w-md mx-auto text-center px-4">
//           <h3 className="text-2xl font-semibold mb-4 text-gray-800">Stay Updated</h3>
//           <p className="text-gray-600 mb-6">Subscribe to our newsletter for pilgrimage tips and updates.</p>
//           <form className="flex flex-col sm:flex-row gap-4">
//             <input
//               type="email"
//               placeholder="Your email address"
//               className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-600"
//             />
//             <motion.button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-md"
//               whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
//             >Subscribe</motion.button>
//           </form>
//         </div>
//       </section>
//   );
// }; 
function QuoteSection() {
  return (
    <section className="py-16 bg-gray-50 text-center">
      <blockquote className="max-w-3xl mx-auto italic text-xl text-gray-800">
        “(The performance of) Umra is an expiation for the sins committed
        (between it and the previous one). And the reward of Hajj Mabrur
        (the one accepted by Allah) is nothing except Paradise.”
        <span className="block mt-4 font-semibold">
          – Prophet Muhammad (صلى الله عليه وسلم)
        </span>
      </blockquote>
    </section>
  );
}
export const HomePage = () => {
  return (
    <div>
      <PopupAd />
      <HeroSections />
      <QuoteSection />
      <ExploreSection />
      <HeartSoulSection />
     
    </div>
  );
}