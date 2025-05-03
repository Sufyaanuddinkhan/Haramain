import React, { useState, useRef, useEffect } from "react";
import {
  Hero,
  ImageTextSection,
  Card,
  PlacesCards,
  ContactUs,
  EnquiryForm
} from "../components/PageComponent";

// Use public image
const banner = "/images/umrah/about2.jpg";

const packagesData = [
  {
    image: "/images/umrah/umrahstd.jpg",
    title: "Umrah Package – Standard",
    description:
      "7-day stay, 3-star hotel, guided ziyarah, transportation included.",
  },
  {
    image: "/images/umrah/umrahpre.webp",
    title: "Umrah Package – Premium",
    description:
      "10-day stay, 5-star hotel near Haram, VIP services, and meals.",
  },
  {
    image: "/images/hajj1/hajjstd.jpg",
    title: "Hajj Package – Economy",
    description:
      "Economical Hajj with group guidance, 14 days, shared rooms.",
  },
  {
    image: "/images/hajj1/hajjpre.jpg",
    title: "Hajj Package – Deluxe",
    description:
      "Luxury accommodation, private transport, scholar-led journey.",
  },
];

// Scroll-triggered visibility hook
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

// Animated fade-in container
function AnimatedContainer({ children }) {
  const ref = useRef();
  const isVisible = useIsVisible(ref);
  return (
    <div
      ref={ref}
      className={`transform transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      {children}
    </div>
  );
}

// Testimonials component
function TestimonialsSection() {
  const testimonials = [
    {
      name: "Dr. Sara Zubia",
      quote:
        "Thank you, Dr Mohamed, Um Ibrahim and Ibrahim, for all your efforts throughout our Hajj. We had a wonderful experience alhamdu lil Illah. We genuinely felt we were travelling with our family. We could not ask for more.",
    },
    {
      name: "Mustafa Abass",
      quote:
        "London group arrived safely alhamdulillah. Jazakallah Mohammed ben Othman and everyone else… had a hajj mabroor and return home safely, start a new beautiful life with baraka from Allah swt.",
    },
    {
      name: "Zakariya Aways",
      quote:
        "Guys, it was a pleasure meeting you all and blessed to have done Hajj at a young age… Truly a great experience for me.",
    },
  ];

  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold mb-8 text-center">Testimonials</h2>
      <div className="space-y-8 max-w-3xl mx-auto">
        {testimonials.map((t, i) => (
          <AnimatedContainer key={i}>
            <blockquote className="bg-white p-6 border-l-4 border-primary">
              <p className="italic">“{t.quote}”</p>
              <footer className="mt-2 text-right font-semibold">
                – {t.name}
              </footer>
            </blockquote>
          </AnimatedContainer>
        ))}
      </div>
    </section>
  );
}

// Team section
function TeamSection() {
  const team = [
    {
      name: "Sufiyan Khan",
      title: "TL",
      img: "https://via.placeholder.com/150",
    },
    {
      name: "Sameer",
      title: "Web Developer",
      img: "https://via.placeholder.com/150",
    },
    {
      name: "Hafeez",
      title: "Backend Developer",
      img: "https://via.placeholder.com/150",
    },
    {
      name: "Muzzamil",
      title: "Application Architect",
      img: "https://via.placeholder.com/150",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <h2 className="text-3xl font-bold mb-8 text-center">Meet Our Team</h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {team.map((m, i) => (
          <AnimatedContainer key={i}>
            <div className="text-center">
              <img
                src={m.img}
                alt={m.name}
                className="mx-auto w-32 h-32 rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
              />
              <h3 className="mt-4 text-xl font-semibold">{m.name}</h3>
              <p className="text-gray-600">{m.title}</p>
            </div>
          </AnimatedContainer>
        ))}
      </div>
    </section>
  );
}

// Filter data
const umrahPackages = packagesData.filter((pkg) =>
  pkg.title.toLowerCase().includes("umrah")
);
const hajjPackages = packagesData.filter((pkg) =>
  pkg.title.toLowerCase().includes("hajj")
);

// Main component
function Aboutus() {
  return (
    <>
      <Hero
        title="Reconnect with Your Faith, Let Us Guide You"
        description="Begin your sacred journey with confidence, comfort, and care."
        backgroundImage={banner}
      />

      <ImageTextSection
        title="About Us"
        description="At Next Stop: Haramain, we believe every pilgrimage should be spiritually fulfilling and stress-free. 
        We provide personalized Umrah and Hajj packages designed to cater to your spiritual and travel needs. 
        Our mission is to simplify your journey so you can focus on your faith."
        colorScheme="alt"
      />

      <div className="bg-gray-100 py-12 px-4 md:px-12 text-center">
        <h2 className="text-3xl font-bold mb-8">Our Vision & Mission</h2>
        <div className="flex md:flex justify-center gap-6 flex-wrap">
          <Card
            title="Our Vision"
            description="To be the leading provider of spiritually enriching, hassle-free journeys to Makkah and Madinah."
            link="#"
          />
          <Card
            title="Our Mission"
            description="To offer personalized pilgrimage packages with a focus on customer satisfaction, safety, and a transformative spiritual experience."
            link="#"
          />
        </div>
      </div>

      <div className="bg-gray-100 py-12 px-4 md:px-12 flex flex-col items-center space-y-12">
        <div className="text-center w-full max-w-7xl">
          <PlacesCards places={umrahPackages} title="Umrah Packages" />
        </div>
        <div className="text-center w-full max-w-7xl">
          <PlacesCards places={hajjPackages} title="Hajj Packages" />
        </div>
      </div>
      <EnquiryForm packageId="umrah2095"/>
      <TestimonialsSection />
      <TeamSection />
      <ContactUs />
{window.scrollTo(0, 0)}

    </>
  );
}

export default Aboutus;
