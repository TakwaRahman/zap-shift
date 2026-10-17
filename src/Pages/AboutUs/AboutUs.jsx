import { useState } from "react";

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState("story");

  const content = {
    story: `We started with a simple promise — to make parcel delivery fast, reliable, and stress-free. Over the years, our commitment to real-time tracking, efficient logistics, and customer-first service has made us a trusted partner for thousands. Whether it's a personal gift or a time-sensitive business delivery, we ensure it reaches its destination — on time, every time.`,

    mission: `Our mission is to simplify parcel delivery through innovative technology and dependable logistics. We strive to provide the best customer experience with speed, transparency, and reliability.`,

    success: `Over the years, we have successfully delivered millions of parcels across the country. Our growing network and dedicated team have earned the trust of thousands of customers.`,

    team: `Behind every successful delivery is a passionate team of professionals working around the clock. From customer support to logistics experts, every member contributes to our success.`,
  };

  return (
    <section className="max-w-7xl mx-auto bg-white rounded-3xl p-10 shadow-sm">
      {/* Heading */}
      <h2 className="text-5xl font-bold text-[#083344]">About Us</h2>

      <p className="text-gray-500 mt-4 max-w-3xl leading-8">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle. From personal packages to business shipments — we deliver on
        time, every time.
      </p>

      <div className="divider my-8"></div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-8 text-xl">
        <button
          onClick={() => setActiveTab("story")}
          className={`pb-2 ${
            activeTab === "story"
              ? "font-bold text-lime-700 border-b-2 border-lime-700"
              : "text-gray-500"
          }`}
        >
          Story
        </button>

        <button
          onClick={() => setActiveTab("mission")}
          className={`pb-2 ${
            activeTab === "mission"
              ? "font-bold text-lime-700 border-b-2 border-lime-700"
              : "text-gray-500"
          }`}
        >
          Mission
        </button>

        <button
          onClick={() => setActiveTab("success")}
          className={`pb-2 ${
            activeTab === "success"
              ? "font-bold text-lime-700 border-b-2 border-lime-700"
              : "text-gray-500"
          }`}
        >
          Success
        </button>

        <button
          onClick={() => setActiveTab("team")}
          className={`pb-2 ${
            activeTab === "team"
              ? "font-bold text-lime-700 border-b-2 border-lime-700"
              : "text-gray-500"
          }`}
        >
          Team & Others
        </button>
      </div>

      {/* Content */}
      <div className="mt-10 space-y-6 text-gray-600 leading-9 text-lg">
        <p>{content[activeTab]}</p>
        <p>{content[activeTab]}</p>
        <p>{content[activeTab]}</p>
      </div>
    </section>
  );
};

export default AboutUs;