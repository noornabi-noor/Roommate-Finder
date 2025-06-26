import React from 'react';
import { Slide } from 'react-awesome-reveal';
import handshake from '../../assets/handshake.png';
import scam from '../../assets/scam.png';
import saveTime from '../../assets/timeSave.png';

const cardData = [
  {
    title: "Matching Lifestyles",
    description:
      "Find roommates that fit your preferences and lifestyle with personalized search results curated by our matching algorithm.",
    image: handshake,
  },
  {
    title: "Scam & Spam Free",
    description:
      "A.I. and human vetted profiles. We keep the scammers out, and allow real people to connect safely on our platform with secure in-app messaging.",
    image: scam,
  },
  {
    title: "Save Time",
    description:
      "Connect with potential roommates that are relevant and have a mutual intent. Refine and filter out any that are not a good fit. Chat with just those that matter.",
    image: saveTime,
  },
];

const Card = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5 px-4 items-stretch">
      {cardData.map((card, index) => (
        <Slide key={index} direction="up" cascade damping={0.2}>
          <div
            className="flex flex-col gap-4 bg-base-200 p-8 items-center text-center rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 h-full"
          >
            <img className="w-16 h-16 object-contain " src={card.image} alt={card.title} />
            <h2 className="font-bold text-xl text-primary">{card.title}</h2>
            <p className="text-gray-500 text-sm flex-grow">{card.description}</p>
          </div>
        </Slide>
      ))}
    </div>
  );
};

export default Card;
