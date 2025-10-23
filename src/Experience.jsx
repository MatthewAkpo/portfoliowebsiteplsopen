import React from "react";

const experiences = [
  {
    id: 1,
    role: "Frontend Developer",
    company: "Bitxbase",
    duration: "Aug 2024 - Present",
    description: "Developed scalable and responsive web applications using React and Tailwind CSS.",
  },
  {
    id: 2,
    role: "Backend Developer",
    company: "Bitxbase",
    duration: "Aug 2024 - Dec 2024",
    description: "Designed intuitive user interfaces and collaborated with developers to enhance user experiences.",
  },
];

const Experience = () => {
  return (
    <section id="experience" className="py-12 bg-gray-50 dark:bg-gray-900">
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100">Experience</h2>
      <div className="container mx-auto mt-8 space-y-6">
        {experiences.map(({ id, role, company, duration, description }) => (
          <div
            key={id}
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">{role}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{company} | {duration}</p>
            <p className="mt-4 text-gray-700 dark:text-gray-300">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
