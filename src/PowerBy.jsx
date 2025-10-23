import React from "react";
import { BoltIcon } from '@heroicons/react/24/solid'; // ChatGPT Heroicon

const companies = [
  { key: 1, name: "Windows", icon: "fa-windows", color: "text-blue-500", bgco: "#eab308" },
  { key: 2, name: "React", icon: "fa-react", color: "text-blue-300", bgco: "#93c5fd" },
  { key: 3, name: "TailwindCss", icon: "fa-audible", color: "text-blue-500", bgco: "#3b82f6" },
  { key: 4, name: "Google Chrome", icon: "fa-chrome", color: "text-orange-500", bgco: "#f97316" },
  { key: 5, name: "XBOX", icon: "fa-xbox", color: "text-green-500", bgco: "#f97316" },
  { key: 6, name: "PLAYSTATION", icon: "fa-playstation", color: "text-gray-500", bgco: "#f97316" },
  { key: 7, name: "Unity", icon: "fa-unity", color: "text-black", bgco: "#f97316" },
  { key: 8, name: "Bootstrap", icon: "fa-bootstrap", color: "text-purple-500", bgco: "#f97316" },
  { key: 9, name: "ChatGPT", icon: <BoltIcon className="h-16 w-16 text-green-500 company-logo hover:scale-[2]" />, color: "text-green-500", bgco: "#10b981" },
];

const CompanyLogo = ({ icon, name, color }) => (
  <div className="flex items-center justify-center flex-col p-4">
    {typeof icon === 'string' ? (
      <i className={`fab ${icon} text-[60px] ${color} hover:scale-[2]`} />
    ) : (
      <div className={`${color}`}>{icon}</div>
    )}
    <h1 className={`mt-4 text-lg ${color} font-bold`}>{name}</h1>
  </div>
);

function PowerBy() {
  return (
    <div className="w-full bg-gray-50 overflow-hidden relative">
      <div className="flex items-center justify-center flex-col">
        <h2 className="text-3xl bg-white w-full text-center text-black py-2 font-semibold">
          Powered by
        </h2>
        <div className="overflow-hidden w-full relative flex items-center space-x-10 px-10 py-6 animate-marquee">
          {companies.map((comp) => (
            <div key={comp.key} className="company-logo">
              <CompanyLogo
                icon={comp.icon}
                name={comp.name}
                color={comp.color}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PowerBy;
