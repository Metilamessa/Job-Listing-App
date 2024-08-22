import React from 'react';
import Image from 'next/image';

interface AboutProps {
  title: string;
  value: string;
  icon: string;
}

const About: React.FC<AboutProps> = ({ title, value, icon }) => {
  return (
    <div className="flex items-center gap-4 mb-4">
      <div className="w-6 h-6 flex items-center justify-center">
        <Image src={icon} alt={`${title} icon`} width={24} height={24} />
      </div>
      <div>
        <h3 className="font-bold text-sm text-gray-700">{title}</h3>
        <p className="text-sm text-gray-500">{value}</p>
      </div>
    </div>
  );
};

export default About;
