import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import Blob from "../assets/blob.svg";
import HeroPng from "../assets/hero.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; 

const fadeUp = (delay = 0) => ({
  initial: {
    opacity: 0,
    y: 50,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      duration: 0.5,
      delay,
      ease: "easeInOut",
    },
  },
});

const Home = () => {
  const navigate = useNavigate(); 

  const handleFindClick = () => {
    navigate("/time");
  };

  return (
    <section className="relative bg-gradient-to-r from-[#000428] to-[#004e92] overflow-hidden min-h-screen text-white">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 min-h-[600px] px-6">
        <div className="flex flex-col justify-center items-center py-8 md:py-0 relative z-20 ml-8 md:ml-12"> {/* Centered items */}
          <div className="text-center space-y-8 lg:max-w-[450px]">
            <motion.h1
              variants={fadeUp(0.6)}
              initial="initial"
              animate="animate"
              className="text-3xl lg:text-5xl font-bold leading-snug"
            >
              Find your <span className="text-secondary">lectures</span> and{" "}
              <span className="text-secondary">labs</span>
            </motion.h1>

            <motion.p
              variants={fadeUp(0.8)}
              initial="initial"
              animate="animate"
              className="text-lg lg:text-xl font-semibold text-yellow-300" 
            >
              Faculty of Technology, University of Sri Jayawardhenapura
            </motion.p>

            <motion.div
              variants={fadeUp(1)}
              initial="initial"
              animate="animate"
              className="flex justify-center"
            >
              <button
                onClick={handleFindClick} 
                className="flex items-center gap-2 bg-[#ffffff] text-[#004e92] text-lg font-semibold px-6 py-3 rounded-lg transition duration-300 hover:bg-[#004e92] hover:text-white hover:shadow-lg"
              >
                Find
                <IoIosArrowRoundForward className="text-2xl group-hover:translate-x-2 group-hover:-rotate-45 duration-300" />
              </button>
            </motion.div>
          </div>
        </div>

        <div className="flex justify-center items-center relative mr-4 md:mr-8"> 
          <motion.img
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
            src={HeroPng}
            alt="Hero"
            className="w-[300px] md:w-[400px] xl:w-[500px] relative z-10 drop-shadow-lg"
          />
          <motion.img
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
            src={Blob}
            alt="Blob Background"
            className="absolute -bottom-32 w-[800px] md:w-[1200px] z-0 hidden md:block"
          />
        </div>
      </div>
    </section>
  );
};

export default Home;
