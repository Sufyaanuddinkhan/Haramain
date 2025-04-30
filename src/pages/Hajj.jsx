import React, { useState, useRef, useEffect } from "react";
import { HeroSection } from "../components/PageComponent.jsx";

const hajjSteps = [
  { 
    title: "Step 1: Preparation and Intention (Niyyah)", 
    image: "/images/hajj/kaaba.jpg", 
    content: [
      "Before setting off, pilgrims should ensure they meet all financial, physical, and legal requirements for Hajj.",
      "It is advised to seek forgiveness, pay off debts, and reconcile with others before embarking on the journey.",
      "Pilgrims must intend niyyah to perform Hajj sincerely for Allah."
    ] 
  },
  { 
    title: "Step 2: Ihram", 
    image: "/images/hajj/ihram.jpg", 
    content: [
      "Ihram is a sacred state of purity that begins at designated Miqat points.",
      "Men wear two white, unstitched clothes; women wear modest attire.",
      "Talbiyah is recited: Labbayk Allahumma labbayk..."
    ] 
  },
  { 
    title: "Step 3: Prohibited Acts In Ihram", 
    image: "/images/hajj/prohibited_act.png", 
    content: [
      "Avoid shaving, cutting nails, perfume, marital relations, and conflict."
    ] 
  },
  { 
    title: "Step 4: Arrival in Makkah and Tawaf", 
    image: "/images/hajj/arrival_makkah.webp", 
    content: [
      "Perform Tawaf al-Qudum around the Kaaba.",
      "Offer two Rak’ahs of prayer near Maqam Ibrahim."
    ] 
  },
  { 
    title: "Step 5: Sa’i", 
    image: "/images/hajj/safa_marwa.jpg", 
    content: [
      "Walk seven times between Safa and Marwah, recalling Hajar's devotion."
    ] 
  },
  { 
    title: "Step 6: Travel to Mina", 
    image: "/images/hajj/travelling_Mina.webp", 
    content: [
      "Stay in tents in Mina for prayer and reflection."
    ] 
  },
  { 
    title: "Step 7: Day of Arafat", 
    image: "/images/hajj/arafat.jpg", 
    content: [
      "Stand in Arafat, seek forgiveness and listen to the Khutbah."
    ] 
  },
  { 
    title: "Step 8: Muzdalifah", 
    image: "/images/hajj/muzdalifah.jpeg", 
    content: [
      "Collect pebbles and sleep under the stars."
    ] 
  },
  { 
    title: "Step 9: Stoning", 
    image: "/images/hajj/al_jamarat.jpeg", 
    content: [
      "Throw pebbles at the pillars representing Satan."
    ] 
  },
  { 
    title: "Step 10: Shaving", 
    image: "/images/hajj/shaving_head.jpeg", 
    content: [
      "Men shave heads; women cut a small portion of hair."
    ] 
  },
  { 
    title: "Step 11: Tawaf al-Ifadah", 
    image: "/images/hajj/main_tawaf.jpg", 
    content: [
      "Perform Tawaf and Sa’i to complete major rites."
    ] 
  },
  { 
    title: "Step 12: Farewell Tawaf", 
    image: "/images/hajj/al_wada.jpeg", 
    content: [
      "Perform Tawaf al-Wada before departing Makkah."
    ] 
  }
];

// --- Scroll-triggered visibility hook ---
function useIsVisible(ref) {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return isVisible;
}

// --- Animated container for fade/slide-in ---
function AnimatedContainer({ children }) {
  const ref = useRef();
  const isVisible = useIsVisible(ref);
  return (
    <div
      ref={ref}
      className={`transform transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
    >
      {children}
    </div>
  );
}

function TimelineSection() {
  const steps = [
    {
      day: 'Dhul-Hijjah 8',
      title: 'Enter Ihram & Travel to Mina',
      text: 'Pilgrims don the Ihram garments and travel to the Mina encampment.'
    },
    {
      day: 'Dhul-Hijjah 9',
      title: 'Stand at Arafat',
      text: 'Spend the day at Arafat in prayer (the most important day of Hajj).'
    },
    {
      day: 'Night of 9th',
      title: 'Muzdalifah',
      text: 'Collect pebbles under the stars at Muzdalifah.'
    },
    {
      day: 'Dhul-Hijjah 10',
      title: 'Stoning & Sacrifice',
      text: 'Stone the Jamarat pillars, offer Qurbani, then shave/cut hair.'
    },
    {
      day: 'Dhul-Hijjah 10+',
      title: 'Tawaf & Sa’i',
      text: 'Perform Tawaf and Sa’i back in Mecca after the stoning rites.'
    },
    {
      day: 'Dhul-Hijjah 11–12',
      title: 'Final Days in Mina',
      text: 'Continue stoning ritual on the following days and conclude with Farewell Tawaf.'
    }
  ];

  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold mb-8 text-center">Pilgrimage Journey Timeline</h2>
      <div className="space-y-8 max-w-3xl mx-auto">
        {steps.map((step, idx) => (
          <AnimatedContainer key={idx}>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 mr-4 flex items-center justify-center bg-primary text-white rounded-full">
                {idx + 1}
              </div>
              <div>
                <p className="font-semibold">{step.day}: {step.title}</p>
                <p className="text-gray-700">{step.text}</p>
              </div>
            </div>
          </AnimatedContainer>
        ))}
      </div>
    </section>
  );
}

const HajjPage = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setSelectedCard(null);
      }
    };

    if (selectedCard) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedCard]);

  return (
    <div>
      <HeroSection
        title="Hajj – The Journey of a Lifetime"
        subtitle="Experience the sacred pilgrimage to the House of Allah"
        backgroundImage="/images/hajj/kaaba.jpg"
      />

      <div className="text-center bg-amber-50 py-10 px-6">
        <h2 className="text-3xl font-bold text-amber-900 mb-4 inline-block bg-yellow-300 px-6 py-2 rounded shadow">
          Step-by-Step Journey of Hajj
        </h2>
        <p className="text-lg text-coolGray-700 max-w-3xl mx-auto mt-4">
          Explore the sacred journey of Hajj through this visual guide. Each card below represents a meaningful step that every pilgrim undertakes, from the intention to the farewell. Click on any step to learn more.
        </p>
      </div>
      <TimelineSection />
      <div className="bg-gray-100 py-10 px-6">
        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          <button
            onClick={() => setStartIndex((prev) => (prev - 1 + hajjSteps.length) % hajjSteps.length)}
            className="text-4xl text-amber-700 hover:text-amber-900 transition duration-300"
          >
            ←
          </button>

          <div className="flex flex-wrap justify-center gap-6">
            {[0, 1, 2].map((offset) => {
              const step = hajjSteps[(startIndex + offset) % hajjSteps.length];
              return (
                <div
                  key={offset}
                  className="bg-white rounded-xl shadow-lg w-72 h-96 cursor-pointer hover:scale-105 transition duration-300"
                  onClick={() => setSelectedCard(step)}
                >
                  <img src={step.image} alt={step.title} className="w-full h-48 object-cover rounded-t-xl" />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-center">{step.title}</h3>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => setStartIndex((prev) => (prev + 1) % hajjSteps.length)}
            className="text-4xl text-amber-700 hover:text-amber-900 transition duration-300"
          >
            →
          </button>
        </div>
      </div>

      <div className="text-center bg-amber-50 py-10 px-6">
        <h2 className="text-3xl font-bold text-amber-900 mb-4 inline-block bg-yellow-300 px-6 py-2 rounded shadow">
          Final Thoughts
        </h2>
        <p className="text-lg text-coolGray-700 max-w-3xl mx-auto mt-4">
          Hajj is a deeply spiritual journey requiring patience, endurance, and sincerity. Completing Hajj with devotion results in immense rewards, including the forgiveness of all past sins. May Allah accept the Hajj of all pilgrims in 2025. Ameen!
        </p>
      </div>

      {selectedCard && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center px-4">
          <div
            ref={modalRef}
            className="bg-white rounded-xl shadow-2xl max-w-4xl w-full p-6 md:p-10 relative"
          >
            <button
              className="absolute top-4 right-6 text-gray-500 hover:text-black text-2xl"
              onClick={() => setSelectedCard(null)}
            >
              ×
            </button>

            <img
              src={selectedCard.image}
              alt={selectedCard.title}
              className="w-full h-64 md:h-[30rem] object-cover rounded-md mb-6"
            />
            <h2 className="text-2xl md:text-4xl font-bold mb-4">{selectedCard.title}</h2>

            {Array.isArray(selectedCard.content) ? (
              <ul className="list-disc pl-6 text-gray-700 text-lg md:text-xl leading-relaxed">
                {selectedCard.content.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-700 text-lg md:text-xl">{selectedCard.content}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HajjPage;
