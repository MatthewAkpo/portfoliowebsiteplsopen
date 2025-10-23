import React, { useState, useEffect, useMemo, useCallback } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Icon from "./icons-svg/carat-u-white.svg";
import d1 from './sasuke.jpg';
import d2 from './sasori.jpg';
import d3 from './kakashi.jpg';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper/modules";
import Picc from './Jane Doe.jpeg';
import Picc1 from './John Smith.jpeg';
import Picc2 from './Michael Brown.jpeg';
import Picc4 from './Alice.jpeg';
import PowerBy from './PowerBy';

const testimonials = [
  { id: 1, name: "Jane Doe", role: "Software Engineer at Google", feedback: "Matthew is a fantastic developer who always delivers high-quality work on time.", image: Picc },
  { id: 2, name: "John Smith", role: "Product Manager at Microsoft", feedback: "Working with Matthew has been a pleasure. His problem-solving skills are unmatched.", image: Picc1 },
  { id: 3, name: "Alice Johnson", role: "CTO at Amazon", feedback: "Matthew's dedication and attention to detail are truly remarkable.", image: Picc4 },
  { id: 4, name: "Michael Brown", role: "Freelancer", feedback: "Matthew's coding skills have been pivotal in my project's success.", image: Picc2 },
];

const experiences = [
  { id: 1, role: "Frontend Developer", company: "Bitxbase", duration: "Aug 2024 - Present", description: "Developed scalable and responsive web applications using React and Tailwind CSS." },
  { id: 2, role: "Backend Developer", company: "Bitxbase", duration: "Aug 2024 - Dec 2024", description: "Designed intuitive user interfaces and collaborated with developers to enhance user experiences." },
];

const slides = [d1, d2, d3];

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [Caret, setCaret] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [message,setMessage] = useState(false)
  const texts = useMemo(() => [
    "Welcome to My Portfolio",
    "Showcasing My Projects & Skills",
    "Wetin You Dey Wait For Scroll Na, Abi Na Here You Wan Dey"
  ], []);
  const closos =()=>{
    setMessage(false)
  }
  const typingSpeed = 100;
  const deletingSpeed = 100;
  const pauseDuration = 1000;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleTyping = () => {
      const currentPhrase = texts[index];
      if (!isDeleting) {
        setCurrentText(currentPhrase.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);

        if (charIndex === currentPhrase.length) {
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        setCurrentText(currentPhrase.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);

        if (charIndex === 0) {
          setIsDeleting(false);
          setIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }
      }
    };

    const typingTimer = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(typingTimer);
  }, [charIndex, isDeleting, texts, index]);

  useEffect(() => {
    const scroller = () => {
      if (window.scrollY > 100) {
        setCaret(true);
      } else {
        setCaret(false);
      }
    };

    const debouncedScroller = debounce(scroller, 100);
    window.addEventListener("scroll", debouncedScroller);

    return () => {
      window.removeEventListener("scroll", debouncedScroller);
    };
  }, []);



  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    
    setMessage(true)
  };

  const showSlide = (index) => {
    setCurrentSlide((index + slides.length) % slides.length);
  };

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="bg-gray-100">
      <Header />
      <Hero currentText={currentText} />
      <About />
      <Slider slides={slides} currentSlide={currentSlide} showSlide={showSlide} />
      <Skills />
      <Testimonials testimonials={testimonials} />
      <Experience experiences={experiences} />
      <Contact formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} />
      {message && <Message closos={closos}/>}
      {Caret && <ScrollToTopIcon scrollUp={scrollUp} />}
      <PowerBy/>
      <Footer />
    </div>
  );
}

const Header = () => (
  <header className="bg-blue-500 text-white py-4 shadow-lg">
    <div className="container mx-auto flex justify-between items-center">
      <h1 className="text-2xl font-bold">Matthew's Portfolio</h1>
      <nav>
        <ul className="flex space-x-4">
          <li><a href="#about" className="hover:text-gray-200">About</a></li>
          <li><a href="#slider" className="hover:text-gray-200">Projects</a></li>
          <li><a href="#skills" className="hover:text-gray-200">Skills</a></li>
          <li><a href="#contact" className="hover:text-gray-200">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>
);

const Hero = ({ currentText }) => (
  <section id="hero" className="relative bg-blue-600 text-white py-20 h-screen flex items-center justify-center chisom">
    <div className="container mx-auto text-center font-[cursive]">
      <h2 className="text-4xl font-bold">
        {currentText}
        <span className="cursor-blink">|</span>
      </h2>
      <p className='mt-3'>Showcasing My Projects, Skills, and Experience</p>
      <button className='mt-10'>
        <a href="/resume.pdf" download className="h-max bg-white mt-10 text-blue-600 px-6 py-3 rounded-lg shadow hover:bg-gray-200">
          Download Resume
        </a>
      </button>
    </div>
  </section>
);

const About = () => (
  <section id="about" className="py-16 bg-gray-100">
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">About Me</h2>
      <p className="text-center text-gray-600 max-w-2xl mx-auto">I'm Matthew, a passionate developer with expertise in web development and a love for creating seamless user experiences. My work combines creativity, functionality, and attention to detail to produce outstanding results.</p>
    </div>
  </section>
);

const Slider = ({ slides, currentSlide, showSlide }) => (
  <section id="slider" className="relative bg-gray-200 py-16 h-max">
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Featured Projects</h2>
      <div className="slider flex overflow-hidden relative h-[50cap]">
        {slides.map((slide, index) => (
          <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
            <img src={slide} alt={`Project ${index + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button onClick={() => showSlide(currentSlide - 1)} className="px-4 py-2 bg-blue-500 text-white rounded-lg mx-2">Prev</button>
        <button onClick={() => showSlide(currentSlide + 1)} className="px-4 py-2 bg-blue-500 text-white rounded-lg mx-2">Next</button>
      </div>
    </div>
  </section>
);

const Skills = () => (
  <section id="skills" className="py-16 bg-gray-100">
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Skills</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
        <Skill icon="fab fa-html5" color="text-orange-500" name="HTML" />
        <Skill icon="fab fa-css3-alt" color="text-blue-500" name="CSS" />
        <Skill icon="fab fa-js-square" color="text-yellow-500" name="JavaScript" />
        <Skill icon="fab fa-react" color="text-blue-300" name="React" />
        <Skill icon="fab fa-css" color="text-blue-300" name="TailWind Css" />
      </div>
    </div>
  </section>
);

const Skill = ({ icon, color, name }) => (
  <div>
    <i className={`${icon} text-4xl ${color}`}></i>
    <h3 className="text-xl font-bold mt-4">{name}</h3>
  </div>
);

const Testimonials = ({ testimonials }) => (
  <section id='testimonial' className='py-12 bg-gray-100'>
    <h2 className="text-3xl font-bold text-center text-gray-900">
      <Swiper
        spaceBetween={30}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Pagination, Autoplay]}
        className='p-6 bg-white'
      >
        {testimonials.map((test) => (
          <SwiperSlide key={test.id}>
            <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg text-center">
              <img src={test.image} alt={test.name} className="w-20 h-20 mx-auto rounded-full mb-4" />
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">{test.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{test.role}</p>
              <p className="mt-4 text-gray-600 dark:text-gray-300">{test.feedback}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </h2>
  </section>
);

const Experience = ({ experiences }) => (
  <section id='experience' className='py-10 bg-gray-200'>
    <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100">Experience</h2>
    <div className='bg-gray-200 py-10'>
      {experiences.map((exp) => (
        <div key={exp.id} className='bg-white rounded-lg shadow-lg m-10 p-10'>
          <h2 className='font-extrabold text-[20px] font-[cursive]'>{exp.company}</h2>
          <h2>{exp.duration}</h2>
          <h2>{exp.role}</h2>
          <h2>{exp.description}</h2>
        </div>
      ))}
    </div>
  </section>
);

const Contact = ({ formData, setFormData, handleSubmit }) => (
  <section id="contact" className="py-16 bg-blue-600 text-white">
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Contact Me</h2>
      <form className="max-w-lg mx-auto space-y-4 text-blue-600" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-white">Name</label>
          <input type="text" id="name" className="w-full px-4 py-2 rounded-lg" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
          <input type="email" id="email" className="w-full px-4 py-2 rounded-lg" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-white">Message</label>
          <textarea id="message" rows="4" className="w-full px-4 py-2 rounded-lg" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required></textarea>
        </div>
        <button type="submit" className="bg-white text-blue-600 px-6 py-3 rounded-lg shadow hover:bg-gray-200">Send</button>
      </form>
    </div>
  </section>
);

const ScrollToTopIcon = ({ scrollUp }) => (
  <div className="bg-black p-2 h-10 w-10 flex fixed z-10 bottom-5 right-5 cursor-pointer rounded-full transition-opacity duration-500" onClick={scrollUp}>
    <img src={Icon} alt="Scroll to top" />
  </div>
);

const Message = ({closos})=>(
  <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
  <div className="bg-white p-6 rounded-lg">
    <div className="text-2xl font-bold">Sent!</div>
    <div className="mt-4">Thanks For The Feedback!</div>
    <button
      className="mt-4 bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
    >
      Rate The Developers
    </button>
    <button
      className="mt-4 bg-blue-500 text-white p-3 ml-4 rounded-md hover:bg-blue-600"
      onClickCapture={closos}
    >
      Go Back
    </button>
  </div>
</div>
)

const Footer = () => (
  <footer className="bg-gray-800 text-white py-4">
    <div className="container mx-auto text-center">
      <p>&copy; 2024 Matthew. All rights reserved.</p>
    </div>
  </footer>
);



export default App;