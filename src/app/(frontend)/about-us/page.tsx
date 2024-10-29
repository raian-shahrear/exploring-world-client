/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import aboutUSBanner from "@/assets/about-us/about-us-banner.jpg";
import Image from "next/image";
import { BiSolidLabel } from "react-icons/bi";
import { GoGoal } from "react-icons/go";

const AboutUs = () => {
  return (
    <div>
      <div>
        <Image
          src={aboutUSBanner}
          alt="banner"
          width={500}
          height={500}
          className="w-full h-[600px] object-cover rounded-xl"
        />
      </div>
      <div className="mt-10">
        <h2 className="text-xl font-semibold flex items-center gap-1">
          <BiSolidLabel /> About Us
        </h2>
        <p className="text-sm mt-4">
          Welcome to our travel community, where every journey finds its voice!
          Our platform is a space for travelers from all around the globe to
          share their unique experiences, hidden gems, and unforgettable
          stories. We believe that travel is more than just destinations-it’s
          about the people we meet, the lessons we learn, and the memories we
          create along the way. Whether you’ve explored bustling cities, hiked
          through serene mountains, or discovered local traditions, this is the
          place to share your adventures. Post your travel stories, read about
          others’ journeys, and leave comments to connect with fellow travelers.
          We’re here to inspire, inform, and help each other dream big and
          travel far.
        </p>
      </div>
      <div className="mt-10">
        <h2 className="text-xl font-semibold flex items-center gap-1"><GoGoal /> Our Mission</h2>
        <p className="text-sm mt-4">
          Our mission is to connect and inspire a global community of travelers
          by creating a space where stories, experiences, and insights can be
          shared openly. We believe that every journey has something valuable to
          offer, whether it’s uncovering hidden gems, embracing new cultures, or
          finding beauty in the unexpected. Our platform is dedicated to
          fostering authentic connections among travelers, encouraging
          exploration, and promoting a deeper understanding of the world around
          us. Through storytelling and shared experiences, we aim to spark
          curiosity, bridge cultural divides, and support each other in making
          travel more meaningful. Together, we’re building a supportive, diverse
          community where anyone, from first-time adventurers to seasoned
          explorers, can find inspiration and guidance for their next journey.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
