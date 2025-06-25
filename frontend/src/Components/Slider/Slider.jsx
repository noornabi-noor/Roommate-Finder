import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { auth } from "../../Pages/Firebase/firebase.init";
import RoommateCard from "../SliderCard/SliderCard";

const Slider = () => {
  const [roommates, setRoommates] = useState([]);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoommates = async () => {
      try {
        const res = await fetch(
          "https://roommate-finder-server-rouge.vercel.app/roommates"
        );
        const data = await res.json();
        const latestNine = data.slice(-9).reverse();
        setRoommates(latestNine);
      } catch (err) {
        console.error("Failed to fetch roommates:", err);
      }
    };

    fetchRoommates();
  }, []);

  const handleSeeMore = (id) => {
    if (!user) {
      toast.warn("Please log in to view roommate details.");
      navigate("/login");
    } else {
      navigate(`/roommate/${id}`);
    }
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 ">
      <div className="flex flex-col items-center text-center mb-8">
        <h2 className="text-3xl font-bold mb-2 text-primary">
          Find Your New Roommate
        </h2>
        <p>Some amazing people are looking for a roommate like you!</p>
      </div>

      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={4000}
        keyBoardControl={true}
        showDots={true}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        partialVisible={false}      
        centerMode={true}         
        containerClass="carousel-container"
        itemClass="px-12"
      >
        {roommates.map((roommate) => (
          <div
            key={roommate._id}
            className="cursor-pointer  px-2" 
            onClick={() => handleSeeMore(roommate._id)}
          >
            <div className="mx-3">
              <RoommateCard roommate={roommate} />
            </div>
            
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Slider;
