// import React from "react";
// import "./Featured.css";
// import SectionTitle from "../../../components/SectionTitle/SectionTitle";

// const Featured = () => {
//   return (
//     <section className="featured-item text-[#fff] bg-fixed md:p-20 py-10">
//         <SectionTitle heading={'READy for unforgatable travel'} subHeading={'life remeber fun'}/>
//       <div className="bg-slate-500 bg-opacity-40 p-4 md:px-4 md:py-10">
//         <div className="md:flex justify-between items-center gap-8 md:pt-16 md:pb-20 md:px-36">
//           <div className="md:ml-10 md:w-[60%]">
//               <h2 className="text-3xl font-bold uppercase mb-2">
//                 READy for unforgatable travel. remeber us!
//               </h2>
//               <p className="mb-4">
//                 Embark on unforgettable journeys with us. Keep us in your
//                 memories as you explore the extraordinary!Embark on
//                 unforgettable journeys with us. Keep us in your memories as you
//                 explore the extraordinary!
//               </p>
//             </div>
//             <div>
//                 <p className="md:border-b-2 md:border-r-2 md:border-white md:shadow-xl hover:bg-white hover:text-neutral-900 "><button className="border-white border-2 px-8 py-2 mb-1 mr-1 font-bold text-lg uppercase">contact</button></p>
//             </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Featured;


import React from "react"; 
import { motion } from "framer-motion";  // Import motion from framer-motion
import "./Featured.css";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const Featured = () => {
  return (
    <section className="featured-item text-[#fff] bg-fixed md:p-20 py-10">
        <SectionTitle heading={'READy for unforgatable travel'} subHeading={'life remeber fun'}/>
      <div className="bg-slate-500 bg-opacity-40 p-4 md:px-4 md:py-10">
        <div className="md:flex justify-between items-center gap-8 md:pt-16 md:pb-20 md:px-36">
          <div className="md:ml-10 md:w-[60%]">
              <h2 className="text-3xl font-bold uppercase mb-2">
                READy for unforgatable travel. remeber us!
              </h2>
              <p className="mb-4">
                Embark on unforgettable journeys with us. Keep us in your
                memories as you explore the extraordinary!Embark on
                unforgettable journeys with us. Keep us in your memories as you
                explore the extraordinary!
              </p>
            </div>
            <div>
                <motion.div
                    animate={{
                        y: ["0px", "-15px", "0px"],  // Up and down animation effect
                    }}
                    transition={{
                        duration: 3,  // Duration of one cycle
                        repeat: Infinity,  // Infinite loop
                        repeatType: "loop",  // Loop it forever
                        ease: "easeInOut",  // Smooth easing
                    }}
                >
                    <p className="md:border-b-2 md:border-r-2 md:border-white md:shadow-xl hover:bg-white hover:text-neutral-900 "><button className="border-white border-2 px-8 py-2 mb-1 mr-1 font-bold text-lg uppercase">contact</button></p>
                </motion.div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Featured;

