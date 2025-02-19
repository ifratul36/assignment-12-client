import React from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const WebsiteOverview = () => {
  return (
    <section className=" py-12 px-6 md:px-16">
      <div className="max-w-7xl mx-auto text-center">
        <SectionTitle heading={'To Our website'} subHeading={'welcome'} />
        <p className="text-gray-600 text-lg mb-8">
          Discover everything you need to know about our platform and how it can
          benefit you. Watch the video below to learn more!
        </p>
        <div className="relative w-full max-w-5xl mx-auto rounded-lg overflow-hidden shadow-lg" style={{ height: "400px" }}>
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/Xj4E0Zry6K4?rel=0&modestbranding=1&iv_load_policy=3"
            title="Website Overview Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default WebsiteOverview;
