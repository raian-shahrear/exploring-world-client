import aboutUSBanner from "@/assets/about-us/about-us-banner.jpg";
import Image from "next/image";
import { BiSolidLabel } from "react-icons/bi";
import { GoGoal } from "react-icons/go";
import { RiTeamFill } from "react-icons/ri";
import { ourTeam } from "./_constant/aboutUs.const";

export const metadata = {
  title: "Exploring World - About Us",
  description: "Welcome to about us page.",
  keywords: "about us, mission, team",
};

const AboutUs = () => {
  return (
    <div>
      <div>
        <Image
          src={aboutUSBanner}
          alt="banner"
          width={500}
          height={500}
          unoptimized
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
        <h2 className="text-xl font-semibold flex items-center gap-1">
          <GoGoal /> Our Mission
        </h2>
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
      <div className="mt-10">
        <h2 className="text-xl font-semibold flex items-center gap-1">
          <RiTeamFill /> Meet People
        </h2>
        <p className="text-sm mt-4">
          Meet our team of passionate travel enthusiasts and dedicated tech
          experts! Together, we work around the clock to ensure a safe, smooth,
          and inspiring experience on our platform. From fixing bugs and
          moderating posts to enhancing user interactions, our mission is to
          create a vibrant, positive space for sharing global travel adventures.
        </p>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {ourTeam?.map((team) => (
            <div key={team?._id} className="shadow-lg rounded-md">
              <div>
                <Image
                  src={team?.img}
                  alt="team"
                  width={100}
                  height={100}
                  unoptimized
                  className="w-full h-96 sm:h-64 object-top object-cover rounded-tl-md rounded-tr-md"
                />
              </div>
              <div className="p-3">
                <p className="font-bold text-gray-900">{team?.name}</p>
                <p className="font-semibold text-sm text-gray-500 mb-2">
                  {team?.designation}
                </p>
                <p className="text-sm text-gray-900">{team?.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
