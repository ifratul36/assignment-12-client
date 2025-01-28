import React from "react";
import umbre from "../../../assets/umbre.jpg";
import card from "../../../assets/card.jpg";
import earth from "../../../assets/earth.jpg";
import award from "../../../assets/award.jpg";
import { motion } from "framer-motion";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const Icon = () => {
  return (
    <div className="my-2 py-16 ">
      <SectionTitle
        heading={"Discover the possibilities"}
        subHeading={"million of attractions"}
      />
      <div className="md:flex justify-center items-center gap-6 p-8 py-6">
        <div className="text-start">
          <motion.div
            animate={{
              y: ["0px", "15px", "0px"], // Up and down animation effect
            }}
            transition={{
              duration: 3, // Duration of one cycle
              repeat: Infinity, // Infinite loop
              repeatType: "loop", // Loop it forever
              ease: "easeInOut", // Smooth easing
            }}
          >
            <img src={umbre} className="w-40 h-40" alt="" />
          </motion.div>

          <h2 className="text-xl font-semibold hover:text-red-600 py-2">
            Discover the possibilities
          </h2>
          <p className="text-lg font-light">
            With nearly half a million attractions, hotels & more. you're sure
            to find joy.
          </p>
        </div>
        <div className="text-start">
          <motion.div
            animate={{
              y: ["0px", "-15px", "0px"], // Up and down animation effect
            }}
            transition={{
              duration: 3, // Duration of one cycle
              repeat: Infinity, // Infinite loop
              repeatType: "loop", // Loop it forever
              ease: "easeInOut", // Smooth easing
            }}
          >
            <img src={card} className="w-40 h-40" alt="" />
          </motion.div>

          <h2 className="text-xl font-semibold hover:text-red-600 py-4">
            Enjoy deals & delights
          </h2>
          <p className="text-lg font-light">
            Quality activities. Great prices. Plus, earn credites to save more.
          </p>
        </div>
        <div className="text-start">
          <motion.div
            animate={{
              y: ["0px", "15px", "0px"], // Up and down animation effect
            }}
            transition={{
              duration: 3, // Duration of one cycle
              repeat: Infinity, // Infinite loop
              repeatType: "loop", // Loop it forever
              ease: "easeInOut", // Smooth easing
            }}
          >
            <img src={earth} className="w-40 h-40" alt="" />
          </motion.div>

          <h2 className="text-xl font-semibold hover:text-red-600 py-4">
            Exploring made easyt
          </h2>
          <p className="text-lg font-light">
            Book last minute, skip lines &amp ; get free cancellation for easier
            exploring.
          </p>
        </div>
        <div className="text-start">
          <motion.div
            animate={{
              y: ["0px", "-15px", "0px"], // Up and down animation effect
            }}
            transition={{
              duration: 3, // Duration of one cycle
              repeat: Infinity, // Infinite loop
              repeatType: "loop", // Loop it forever
              ease: "easeInOut", // Smooth easing
            }}
          >
            <img src={award} className="w-40 h-40" alt="" />
          </motion.div>
          <h2 className="text-xl font-semibold hover:text-red-600 py-4">
            Travel you can trust
          </h2>
          <p className="text-lg font-light">
            Read reviews & get reliable customer support . We're with you at
            every step.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Icon;
