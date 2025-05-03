import React, { useEffect, useMemo, useState } from "react";
import { Button, FormLabel, TextField, TextareaAutosize, Box, Typography, Paper } from "@mui/material";
import { Link } from "react-router-dom";
// import { HiOutlineMail } from "react-icons/hi"; // Icon for email
import { motion } from "framer-motion";  // Import Framer Motion for animations
const API_URL = import.meta.env.VITE_API_URL;
import { Formik, Form, Field, ErrorMessage,useFormik} from "formik";
import * as Yup from "yup";
// import TextareaAutosize from "react-textarea-autosize";
// import { Button } from "@/components/ui/button";
// import { FormLabel } from "@/components/ui/label";
// import { TextField } from "@/components/ui/textfield";
//MAKKAH AND MADINA herosection

export const HeroSection = ({
  title,
  subtitle,
  backgroundImage,
  hadithText,
  hadithSource,
}) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const heroHeight = typeof window !== "undefined" ? window.innerHeight * 0.8 : 600;
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

      <div
        className="absolute top-10 left-1/2 z-10 max-w-3xl w-[90%] text-center px-4"
        style={{
          transform: `translate(-50%, ${translateY}px)`,
          opacity,
        }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        <p className="text-lg md:text-xl">{subtitle}</p>

        {/* Dynamic Hadith Section */}
        {hadithText && (
          <div className="mt-8 bg-white/30 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg">
            <p className="text-sm md:text-base italic text-white leading-relaxed">
              “{hadithText}”
              {hadithSource && (
                <span className="text-sm block mt-2 text-gray-200">– {hadithSource}</span>
              )}
            </p>
          </div>
        )}
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
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    fetch(`/data/${file}`) // Corrected fetch path
      .then((res) => res.json())
      .then((data) => {
        setPlaces(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(`Failed to fetch from API:`, err);
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

  const expandedPlace = expandedIndex !== null ? places[expandedIndex] : null;

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
        {places.map((place, index) => (
          <div
            key={place.id}
            className="bg-white shadow-md rounded-xl overflow-hidden cursor-pointer transition-transform hover:scale-105 duration-300 w-full max-w-sm"
            onClick={() => setExpandedIndex(index)}
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
          onClick={() => setExpandedIndex(null)}
        >
          <div
            className="relative bg-white w-[90%] md:w-[70%] max-h-[90vh] overflow-y-auto rounded-xl shadow-lg p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Back Button */}
            <button
              className="absolute top-4 left-4 bg-gray-200 text-gray-800 px-3 py-1 rounded"
              onClick={() => setExpandedIndex(null)}
            >
              ← Back
            </button>

            {/* Next/Previous Buttons */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                disabled={expandedIndex <= 0}
                onClick={() => setExpandedIndex((prev) => prev - 1)}
                className={`px-3 py-1 rounded ${expandedIndex <= 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-gray-800'}`}
              >
                ← Prev
              </button>
              <button
                disabled={expandedIndex >= places.length - 1}
                onClick={() => setExpandedIndex((prev) => prev + 1)}
                className={`px-3 py-1 rounded ${expandedIndex >= places.length - 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-gray-800'}`}
              >
                Next →
              </button>
            </div>

            {/* Modal Content */}
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
  const initialValues = {
    name: "",
    phone: "",
    email: "",
    message: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    phone: Yup.string()
      .matches(/^[0-9\-+() ]*$/, "Invalid phone number")
      .required("Phone number is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    message: Yup.string().required("Message is required"),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      // Use the environment variable for dynamic URL
      const baseUrl = import.meta.env.VITE_API_URL;
  
      const response = await fetch(`${baseUrl}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert(data.message || "Your message has been sent successfully!");
        resetForm(); // Clear form
      } else {
        alert(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setSubmitting(false); // Enable submit button again
    }
  };
  
  
  
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-6 bg-white shadow-xl rounded-lg">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          Contact Us
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ touched, errors }) => (
            <Form>
              {/* Name */}
              <div className="mb-6">
                <FormLabel htmlFor="name" className="mb-2 block text-gray-800">
                  Your Name
                </FormLabel>
                <Field
                  as={TextField}
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-4 py-2"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              {/* Phone */}
              <div className="mb-6">
                <FormLabel htmlFor="phone" className="mb-2 block text-gray-800">
                  Phone Number
                </FormLabel>
                <Field
                  as={TextField}
                  id="phone"
                  name="phone"
                  placeholder="123-456-7890"
                  type="tel"
                  className="w-full border border-gray-300 rounded-md px-4 py-2"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              {/* Email */}
              <div className="mb-6">
                <FormLabel htmlFor="email" className="mb-2 block text-gray-800">
                  Your Email
                </FormLabel>
                <Field
                  as={TextField}
                  id="email"
                  name="email"
                  placeholder="name@company.com"
                  type="email"
                  className="w-full border border-gray-300 rounded-md px-4 py-2"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              {/* Message */}
              <div className="mb-6">
                <FormLabel htmlFor="message" className="mb-2 block text-gray-800">
                  Your Message
                </FormLabel>
                <Field
                  as={TextareaAutosize}
                  id="message"
                  name="message"
                  placeholder="Your message..."
                  rows={4}
                  className="w-full border border-gray-300 rounded-md px-4 py-2"
                />
                <ErrorMessage
                  name="message"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              <Button
                type="submit"
                className="w-full py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition duration-300"
              >
                Send Message
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};



//Enquiry Form
export const EnquiryForm = ({ packageId }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      packageId: packageId || '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      phone: Yup.string()
        .matches(/^[0-9]{10}$/, 'Phone must be 10 digits')
        .required('Phone is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL;
        const res = await fetch(`${baseUrl}/enquiry`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });
        if (res.ok) {
          alert('Enquiry submitted successfully!');
          resetForm();
        } else {
          alert('Failed to submit enquiry.');
        }
      } catch (error) {
        alert('Something went wrong.');
        console.error(error);
      }
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Paper elevation={3} sx={{ p: 3, borderRadius: 3, maxWidth: 400, mx: 'auto' }}>
        <Typography variant="h6" gutterBottom>
          Enquire Now
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Your Name"
            margin="normal"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />

          <TextField
            fullWidth
            id="phone"
            name="phone"
            label="Phone Number"
            margin="normal"
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />

          <TextField
            fullWidth
            id="package"
            name="package"
            label="Package ID"
            margin="normal"
            value={formik.values.packageId}
            disabled
          />

          <Box mt={2}>
            <Button color="primary" variant="contained" fullWidth type="submit">
              Submit
            </Button>
          </Box>
        </form>
      </Paper>
    </motion.div>
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
