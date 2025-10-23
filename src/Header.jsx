import React, { useState, useEffect } from 'react';


const Header = () => {
  const [ham, setHam] = useState("🔽");
  const [header,setHeader] = useState(true);
  const [showModal, setShowmodal] = useState(false);
  const [showModal2, setShowmodal2] = useState(false);
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme : 'light'; // Default to light mode if no saved theme
  });

  const [invertMode, setInvertMode] = useState(false); // New state to manage invert mode

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark'); // Apply dark mode
      document.documentElement.classList.remove('invert'); // Ensure invert is off when dark mode is enabled
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark'); // Remove dark mode
      document.documentElement.classList.remove('invert'); // Ensure invert is off when light mode is enabled
    }


    // Apply invert mode
    if (invertMode) {
      document.documentElement.classList.add('invert');
    } else {
      document.documentElement.classList.remove('invert');
    }

    // Save the theme and invert mode settings to localStorage
    localStorage.setItem('theme', theme);
    localStorage.setItem('invertMode', invertMode ? 'true' : 'false');

  }, [theme, invertMode]);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 200) {
        setHeader(true); // Show caret after scrolling 200px
      } else {
        setHeader(false); // Hide caret when near the top
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const toggleMenu = () => {
    setHam(ham === "🔽" ? "🔼" : "🔽");
    setShowmodal2(showModal2 === true ? false : true);
  };

  const openModal = () => {
    setShowmodal(true);
  };

  const closeModal = () => {
    setShowmodal(false);
  };

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('light');
    }
  };

  const toggleInvertMode = () => {
    setInvertMode(!invertMode);
  };

  return (
    <header className="bg-blue-500 text-white py-4 z-10 fixed top-0 w-full box-border">
     {header&&( <nav className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Matthew's Portfolio</h1>
        <button className="active:scale-75 font-semibold font-[cursive] transition text-4xl md:hidden" onClick={toggleMenu}>{ham}</button>
        <ul className="hidden space-x-8 md:flex">
          <li><a href="#about" className="hover:text-yellow-400">About</a></li>
          <li><a href="#skills" className="hover:text-yellow-400">Skills</a></li>
          <li><a href="#projects" className="hover:text-yellow-400">Projects</a></li>
          <li><a href="#contact" className="hover:text-yellow-400">Contact</a></li>
          <li><a href="#personal" className="hover:text-yellow-400">Personal Info</a></li>
        </ul>
        <div className="flex items-center space-x-4">
          <button onClickCapture={openModal}>
            <i className="fab fa-whmcs scale-[2] cursor-pointer active:scale-75"></i>
          </button>
        </div>
      </nav>)}
      {showModal2 && (
        <div className="bg-gray-800 h-[200px] flex justify-center items-center text-black flex-col fixed w-full transition-transform md:hidden">
          <li><a href="#about" className="text-white font-bold hover:text-yellow-400">About</a></li>
          <li><a href="#skills" className="text-white font-bold hover:text-yellow-400">Skills</a></li>
          <li><a href="#projects" className="text-white font-bold hover:text-yellow-400">Projects</a></li>
          <li><a href="#contact" className="text-white font-bold hover:text-yellow-400">Contact</a></li>
          <li><a href="#personal" className="text-white font-bold hover:text-yellow-400">Personal Info</a></li>
        </div>
      )}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center text-black">
          <div className="bg-white p-6 rounded-lg flex flex-col items-center">
            <div className="text-2xl font-bold">Coming Soon!</div>
            <div className="mt-4">More exciting features including settings will be introduced soon. Manage this contrast first.</div>
            <button
              className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600"
              onClick={toggleTheme}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <button
              className="mt-4 p-2 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600"
              onClick={toggleInvertMode}
            >
              {invertMode ? 'Normal' : 'Invert Colors'}
            </button>
            <button
              className="mt-4 bg-red-500 text-white p-3 ml-4 rounded-md hover:bg-red-600"
              onClick={closeModal}
            >
              Go back
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
