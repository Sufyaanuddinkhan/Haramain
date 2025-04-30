import React, { useEffect, useMemo, useState } from "react";
import { Button, FormLabel, TextField, TextareaAutosize } from "@mui/material";
import { Link } from "react-router-dom";
// import { HiOutlineMail } from "react-icons/hi"; // Icon for email
import { motion } from "framer-motion";  // Import Framer Motion for animations
 
import { useNavigate } from "react-router-dom";
//MAKKAH AND MADINA herosection
export const HeroSection = ({ title, subtitle, backgroundImage }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const heroHeight = typeof window !== "undefined" ? window.innerHeight * 0.8 : 600; // fallback for SSR
  const cappedScroll = Math.min(scrollY, heroHeight);
  const translateY = cappedScroll;
  const opacity = 1 - cappedScroll / heroHeight;

  return (
    <motion.div
      className="relative h-[80vh] bg-cover bg-center text-white overflow-hidden"
      style={{ backgroundImage: `url(${backgroundImage})` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="absolute inset-0 bg-black/50 z-0" />

      {/* Parallax scroll effect text */}
      <div
        className="absolute top-10 left-1/2 z-10 max-w-3xl w-[90%] text-center px-4"
        style={{
          transform: `translate(-50%, ${translateY}px)`,
          opacity,
        }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        <p className="text-lg md:text-xl">{subtitle}</p>
      </div>
    </motion.div>
  );
};
//homepage card
export const Card = ({
  image,
  title,
  description,
  link,
  minHeight = "min-h-[100px]",
}) => {
  return (
    <Link to={link} className="w-full sm:w-[300px] md:w-[350px] lg:w-[400px]">
      <motion.div
        className={`bg-white shadow-lg rounded-2xl overflow-hidden transition-all h-[300px]`}
        whileHover={{
          scale: 1.05,
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
          borderRadius: "12px",
        }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {image && (
          <motion.img
            src={image}
            alt={title}
            className="w-full h-48 object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}
        <div className={`p-4 ${minHeight}`}>
          <motion.h3
            className="text-xl font-semibold mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {title}
          </motion.h3>
          <motion.p
            className="text-gray-600 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {description}
          </motion.p>
        </div>
      </motion.div>
    </Link>
  );
};
//hero without scroll
export const Hero = ({
  backgroundImage,
  title,
  description,
  buttonText,
  buttonLink,
}) => {
  return (
    <section
      className="bg-cover bg-center min-h-[70vh] md:min-h-[80vh] flex items-end justify-start text-white"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="bg-black bg-opacity-50 p-6 md:p-8 rounded-xl m-4">
        <h2 className="text-2xl md:text-4xl font-bold mb-4">{title}</h2>
        <p className="text-base md:text-lg mb-6">{description}</p>
        {buttonText && buttonLink && (
          <a
            href={buttonLink}
            className="bg-yellow-600 text-white px-5 py-2 md:px-6 md:py-3 rounded-md font-semibold hover:bg-black transition duration-300"
          >
            {buttonText}
          </a>
        )}
      </div>
    </section>
  );
};
//section for displaying an image and text side by side
export const ImageTextSection = ({
  image = null,
  title = null,
  description,
  reverse = false,
  colorScheme = "default",
}) => {
  const hasImage = !!image;

  const bgColor =
    colorScheme === "alt"
      ? "bg-gray-900 text-white"
      : "bg-white text-gray-800";

  const textColor = colorScheme === "alt" ? "text-white" : "text-gray-800";

  const flexDirection = hasImage
    ? reverse
      ? "md:flex-row-reverse"
      : "md:flex-row"
    : "flex-col";

  return (
    <motion.section
      className={`px-6 py-10 ${bgColor}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      {title && (
        <h2
          className={`text-3xl font-bold mb-6 ${
            hasImage ? "text-center" : "text-left"
          } ${textColor}`}
        >
          {title}
        </h2>
      )}

      <div
        className={`flex flex-col ${hasImage ? flexDirection : ""} items-center gap-8`}
      >
        {hasImage && (
          <motion.div
            className="w-full md:w-2/5"
            initial={{ opacity: 0, x: reverse ? 100 : -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img
              src={image}
              alt={title || "Image"}
              className="w-full object-cover rounded-xl shadow-md max-h-[500px]"
            />
          </motion.div>
        )}

        <motion.div
          className={`h-full flex items-center justify-center ${
            hasImage ? "w-full md:w-3/5" : "w-full"
          }`}
          initial={{ opacity: 0, x: reverse ? -100 : 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p
            className={`leading-relaxed text-justify ${textColor} whitespace-normal`}
          >
            {description}
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};
  

//placecards used in aboutus page
export const PlacesCards = ({ title, places }) => {
  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold mb-8 text-center">{title}</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {places.map((place, index) => (
          <Card
            key={index}
            image={place.image}
            title={place.title}
            description={place.description}
            link={place.link || "#"}
          />
        ))}
      </div>
    </div>
  );
};
//Json Cards 

export const ExpandableCard = ({ title, file }) => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedPlace, setExpandedPlace] = useState(null);

  useEffect(() => {
    fetch(`/data/${file}`) // Corrected fetch path
      .then((res) => res.json())
      .then((data) => {
        setPlaces(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(`Failed to fetch from ${file}:`, err);
        setLoading(false);
      });
  }, [file]);

  useEffect(() => {
    const handleResize = () => {
      const root = document.documentElement;
      if (window.innerWidth < 640) root.style.setProperty("--grid-cols", "1");
      else if (window.innerWidth < 768) root.style.setProperty("--grid-cols", "2");
      else root.style.setProperty("--grid-cols", "3");
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) {
    return <div className="text-center py-12 text-lg">Loading places...</div>;
  }

  return (
    <section className="py-12 px-4 md:px-12 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-10">{title}</h2>
      <div
        className="grid gap-8 justify-items-center"
        style={{
          gridTemplateColumns: `repeat(var(--grid-cols, 1), minmax(0, 1fr))`,
        }}
      >
        {places.map((place) => (
          <div
            key={place.id}
            className="bg-white shadow-md rounded-xl overflow-hidden cursor-pointer transition-transform hover:scale-105 duration-300 w-full max-w-sm"
            onClick={() => setExpandedPlace(place)}
          >
            <img src={place.image} alt={place.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{place.title}</h3>
              <p className="text-gray-600 text-sm">{place.shortDescription}</p>
            </div>
          </div>
        ))}
      </div>

      {expandedPlace && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center"
          onClick={() => setExpandedPlace(null)}
        >
          <div
            className="relative bg-white w-[90%] md:w-[70%] max-h-[90vh] overflow-y-auto rounded-xl shadow-lg p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 left-4 bg-gray-200 text-gray-800 px-3 py-1 rounded"
              onClick={() => setExpandedPlace(null)}
            >
              ← Back
            </button>

            <img
              src={expandedPlace?.heroImage}
              alt={expandedPlace.title}
              className="rounded-lg mb-6 w-full object-cover max-h-80"
            />
            <h2 className="text-3xl font-bold mb-4">{expandedPlace.title}</h2>
            <p className="text-gray-700 leading-relaxed mb-6">{expandedPlace.fullDescription}</p>
            <p className="text-gray-700 leading-relaxed mb-6">{expandedPlace.fullDescription2}</p>
            <p className="text-gray-700 leading-relaxed mb-6">{expandedPlace.fullDescription3}</p>
            <p className="text-gray-700 leading-relaxed mb-6">{expandedPlace.fullDescription4}</p>
            <p className="text-gray-700 leading-relaxed mb-6">{expandedPlace.fullDescription5}</p>
            {expandedPlace.gallery?.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Gallery</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {expandedPlace.gallery.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`${expandedPlace.title} ${idx + 1}`}
                      className="rounded-lg object-cover w-full h-40 hover:scale-105 transition-transform"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

// Contact Us Form
export const ContactUs = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-6 bg-white shadow-xl rounded-lg">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          Contact Us
        </h2>

        <form action="#" method="POST">
          {/* Name field */}
          <div className="mb-6">
            <FormLabel htmlFor="name" className="mb-2 block text-gray-800">
              Your Name
            </FormLabel>
            <TextField
              id="name"
              name="name"
              placeholder="John Doe"
              type="text"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>

          {/* Phone number field */}
          <div className="mb-6">
            <FormLabel htmlFor="phone" className="mb-2 block text-gray-800">
              Phone Number
            </FormLabel>
            <TextField
              id="phone"
              name="phone"
              placeholder="123-456-7890"
              type="tel"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>

          {/* Email field */}
          <div className="mb-6">
            <FormLabel htmlFor="email" className="mb-2 block text-gray-800">
              Your Email
            </FormLabel>
            <TextField
              id="email"
              name="email"
              placeholder="name@company.com"
              type="email"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>

          {/* Message field */}
          <div className="mb-6">
            <FormLabel htmlFor="message" className="mb-2 block text-gray-800">
              Your Message
            </FormLabel>
            <TextareaAutosize
              id="message"
              name="message"
              placeholder="Your message..."
              rows={4}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>

          {/* Submit button */}
          <Button
            type="submit"
            className="w-full py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition duration-300"
          >
            Send Message
          </Button>
        </form>


      </div>
    </div>
  );
};
//popup ad

export  function PopupAd() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 2000); // 2 sec delay
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-center relative">
        <button
          onClick={() => setShow(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-2">Special Umrah Discount!</h2>
        <p className="text-gray-700 mb-4">
          Book now and get up to <strong>15% off</strong> on all Umrah packages.
        </p>
        <a
          href="/packages"
          className="inline-block bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark"
        >
          View Packages
        </a>
      </div>
    </div>
  );
}
