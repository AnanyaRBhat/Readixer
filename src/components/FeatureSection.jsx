import React from "react";
import Handwriting from "../assets/undraw_notebook_8ihb.svg";
import DigitalText from "../assets/undraw_typing_gcve.svg";
import LongNotes from "../assets/undraw_books_wxzz.svg";
import Summary from "../assets/undraw_online-organizer_1kdy.svg";

export default function FeatureSection() {
  return (
    <section className="pt-6 pb-12 bg-white dark:bg-gray-900 text-center font-[Cambria] text-gray-800 dark:text-gray-100 transition-colors duration-300">
      {/* Intro Section */}
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left: Welcome + Highlights */}
        <div>
          <h2 className="text-5xl font-bold text-purple-700 dark:text-purple-400 mb-4 tracking-wide">
            Welcome to{" "}
            <span className="text-black dark:text-white">Readixer</span>
          </h2>

          {/* Highlighted / Center Justified Text */}
          <div className="text-lg text-gray-800 dark:text-gray-100 text-justify space-y-4">
            <p className="font-semibold text-purple-700 dark:text-purple-400">
              ✍️ Say goodbye to messy handwritten notes.
            </p>
            <p className="font-semibold text-purple-700 dark:text-purple-400">
              📚 Long documents? We give you key insights in seconds.
            </p>
            <p>
              No stress, no hassle — just upload and let Readixer do the magic.
            </p>
          </div>
        </div>

        {/* Right: What We Do Box */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <h3 className="text-2xl font-semibold mb-3 text-purple-600 dark:text-purple-400">
            What We Do
          </h3>
          <p className="text-lg text-gray-800 dark:text-gray-100 leading-relaxed">
            ✍️ Convert your handwritten notes to digital text
            <br />
            📄 Summarize long documents into key insights
            <br />
            <span className="font-bold text-purple-700 dark:text-purple-300">
              📤 All with a single upload. Two powerful tools, one smart
              platform.
            </span>
          </p>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="flex flex-col items-center gap-10 px-4">
        {/* Handwriting Conversion */}
        <div className="bg-[#f3e8ff] dark:bg-[#3b2a5d] border border-violet-300 dark:border-violet-700 text-gray-800 dark:text-gray-100 w-full max-w-5xl py-8 px-6 rounded-2xl flex flex-col md:flex-row justify-between items-center shadow-md hover:scale-[1.01] transition">
          <div className="flex items-center space-x-5 mb-4 md:mb-0">
            <img src={Handwriting} alt="Handwriting" className="h-20" />
            <span className="text-3xl">➡️</span>
            <img src={DigitalText} alt="DigitalText" className="h-20" />
          </div>
          <h3 className="text-2xl font-semibold tracking-wide text-center md:text-left">
            Handwriting Conversion
          </h3>
        </div>

        {/* Document Summarization */}
        <div className="bg-[#f3e8ff] dark:bg-[#3b2a5d] border border-violet-300 dark:border-violet-700 text-gray-800 dark:text-gray-100 w-full max-w-5xl py-8 px-6 rounded-2xl flex flex-col md:flex-row justify-between items-center shadow-md hover:scale-[1.01] transition">
          <h3 className="text-2xl font-semibold tracking-wide text-center md:text-left mb-4 md:mb-0">
            Document Summarization
          </h3>
          <div className="flex items-center space-x-5">
            <img src={LongNotes} alt="Long Notes" className="h-20" />
            <span className="text-3xl">➡️</span>
            <img src={Summary} alt="Summary" className="h-20" />
          </div>
        </div>
      </div>
    </section>
  );
}
