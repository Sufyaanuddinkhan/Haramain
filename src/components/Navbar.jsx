import React, { useEffect, useState } from "react";
import { NavLink , useLocation} from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    isActive ? "text-yellow-500 underline" : "hover:text-yellow-400";

  const toggleMenu = () => setIsOpen(!isOpen);

const location = useLocation();
useEffect(() => {
  window.scrollTo(0, 0); // Scroll to top on route change
}, [location.pathname]);

  return (
    <nav className="bg-black bg-opacity-80 shadow-md sticky top-0 z-50 ">
      <div className="w-full px-6 py-4 flex justify-between items-center">
        {/* Logo on the left */}
        <img src="images/DarkLogocUT.PNG" alt="Logo" className="h-20 block w-auto rounded-4xl" />
        {/* <p className="text-white text-3xl mt-2">NextStop:Harmain</p> */}

        {/* Desktop Links in center */}
        <ul className="hidden md:flex gap-9 mr-120 text-white font-medium text-xl mx-auto leading-none">
          {["Home", "Makkah", "Madina", "Hajj", "Umrah","Packages", "About"].map((link) => (
            <motion.li
              key={link}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <NavLink to={`/${link.toLowerCase()}`} className={navLinkClass}>
                {link}
              </NavLink>
            </motion.li>
          ))}
        </ul>

        {/* Contact Us button on the right
        <div className="hidden md:block">
          <button className="text-white hover:scale-110 transition-transform">
            Contact Us
          </button>
        </div> */}

        {/* Mobile Hamburger Icon */}
        <div className="md:hidden text-white">
          <button onClick={toggleMenu}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className="md:hidden px-6 pb-4"
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? 0 : "-100%" }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        {isOpen && (
          <ul className="flex flex-col gap-4 text-white font-medium">
            {["Home", "Makkah", "Madina", "Hajj", "Umrah","Packages", "About"].map((link) => (
              <motion.li
                key={link}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <NavLink
                  to={`/${link.toLowerCase()}`}
                  className={navLinkClass}
                  onClick={toggleMenu}
                >
                  {link}
                </NavLink>
              </motion.li>
            ))}
          </ul>
        )}
      </motion.div>
    </nav>
  );
};

export default Navbar;
