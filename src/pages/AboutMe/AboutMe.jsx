import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom"; // Import Link from React Router

const AboutMe = () => {
  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen font-sans">
      <Helmet>
        <title>Assignment | About Us</title>
      </Helmet>
      {/* Back to Home Button */}
      <div className="absolute top-8 left-8 z-10">
        <Link to="/" className="text-[#fff] text-2xl">
          <FaArrowLeft />
        </Link>
      </div>

      {/* Header Section */}
      <header className="bg-blue-600 text-white py-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-semibold">Ifratul Jannat Ritu</h1>
          <p className="text-xl mt-2">Frontend Developer</p>
        </div>
      </header>

      {/* About Me Section */}
      <section className="py-16 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-blue-600">About Me</h2>
          <p className="text-lg mt-4">
            Hi! I'm Ifratul Jannat Ritu, a passionate Frontend Developer with
            expertise in web technologies. I have a background in science and am
            working on building beautiful, responsive websites and web
            applications. I've created several projects using technologies like
            React, Tailwind CSS, and JavaScript. My goal is to continuously
            improve my skills and deliver high-quality user experiences.
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 px-4 sm:px-8 bg-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-blue-600">My Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            <div className="project-card bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-2xl font-semibold">GadgetHaven</h3>
              <p className="text-gray-600 mt-2">
                An e-commerce platform for gadget sales.
              </p>
              <a
                href="https://github.com/yourusername/GadgetHaven"
                className="text-blue-600 mt-4 block"
              >
                View Project
              </a>
            </div>
            <div className="project-card bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-2xl font-semibold">Peddy Website</h3>
              <p className="text-gray-600 mt-2">
                A pet adoption website using API data and interactive features.
              </p>
              <a
                href="https://github.com/yourusername/PeddyWebsite"
                className="text-blue-600 mt-4 block"
              >
                View Project
              </a>
            </div>
            <div className="project-card bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-2xl font-semibold">TourBooking</h3>
              <p className="text-gray-600 mt-2">
                A tour booking platform with a dynamic UI.
              </p>
              <a
                href="https://github.com/yourusername/TourBooking"
                className="text-blue-600 mt-4 block"
              >
                View Project
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Developer Information Section */}
      <section className="py-16 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-blue-600">
            Developer Information
          </h2>
          <p className="text-lg mt-4">
            I have worked on several projects in the field of web development.
            My most notable projects include GadgetHaven, Peddy Website, and
            TourBooking. I enjoy collaborating on open-source projects and
            continuously learning new technologies. I'm excited to take on new
            challenges and make a positive impact through my work.
          </p>
          <p className="text-xl mt-6 font-semibold">Projects Created: 3+</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 sm:px-8 bg-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-blue-600">Contact</h2>
          <p className="text-lg mt-4">
            You can reach me via email or check out my social media profiles.
          </p>
          <div className="mt-8">
            <a
              href="mailto:your-email@example.com"
              className="text-blue-600 text-lg"
            >
              Email Me
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-4 text-center">
        <p>&copy; 2025 Ifratul Jannat Ritu. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutMe;
