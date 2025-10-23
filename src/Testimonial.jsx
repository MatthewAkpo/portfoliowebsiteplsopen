import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay"; // Import autoplay styles
import { Pagination, Autoplay } from "swiper/modules"; // Import Autoplay module
import Picc from './Jane Doe.jpeg';
import Picc1 from './John Smith.jpeg';
import Picc2 from './Michael Brown.jpeg';
import Picc4 from './Alice.jpeg';

const testimonials = [
  {
    id: 1,
    name: "Jane Doe",
    role: "Software Engineer at Google",
    feedback: "Matthew is a fantastic developer who always delivers high-quality work on time.",
    image: Picc,
  },
  {
    id: 2,
    name: "John Smith",
    role: "Product Manager at Microsoft",
    feedback: "Working with Matthew has been a pleasure. His problem-solving skills are unmatched.",
    image: Picc1,
  },
  {
    id: 3,
    name: "Alice Johnson",
    role: "CTO at Amazon",
    feedback: "Matthew's dedication and attention to detail are truly remarkable.",
    image: Picc4, // Placeholder image
  },
  {
    id: 4,
    name: "Michael Brown",
    role: "Freelancer",
    feedback: "Matthew's coding skills have been pivotal in my project's success.",
    image: Picc2, // Placeholder image
  },
];

const Testimonial = () => {
  return (
    <section id="testimonials" className="py-12 bg-gray-100 dark:bg-gray-800">
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100">Testimonials</h2>
      <Swiper
        spaceBetween={30}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000, // 3 seconds delay
          disableOnInteraction: false, // Autoplay won't stop on user interaction
        }}
        modules={[Pagination, Autoplay]}
        className="container mx-auto mt-8"
      >
        {testimonials.map(({ id, name, role, feedback, image }) => (
          <SwiperSlide key={id}>
            <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg text-center">
              <img
                src={image}
                alt={name}
                className="w-20 h-20 mx-auto rounded-full mb-4"
              />
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">{name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
              <p className="mt-4 text-gray-600 dark:text-gray-300">{feedback}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonial;
