// 'use client'

import Link from 'next/link';
import Image from 'next/image';
import JobPost from '../models/JobPost';

interface JobCardProps {
  jobPost: JobPost;
  pic: string;
  jobId: number;
}

const JobCard: React.FC<JobCardProps> = ({ jobPost, pic, jobId }) => {
  const title = jobPost.title
    .split(' ')
    .map((token) => token[0].toUpperCase() + token.slice(1))
    .join(' ');

  return (
    <Link href={`/detail/${jobId}`}>
      <div className="p-6 mt-7 border rounded-3xl bg-white grid grid-cols-10 gap-2 shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="rounded-full col-span-1 flex items-center justify-center">
          <Image src={pic} alt={title} width={60} height={60} className="rounded-full object-cover" />
        </div>
        <div className="col-span-9">
          <div className="mb-2">
            <h1 className="font-body text-dark-blue font-semibold text-lg">{title}</h1>
            <h2 className="text-grey-subtitle font-body text-sm">
              {jobPost.company}
              <span className="text-gray-500 text-2xl relative bottom-1">.</span>
              {jobPost.about.location}
            </h2>
          </div>
          <p className="font-body text-dark-blue text-sm">{jobPost.description}</p>
          <div className="mt-4 flex gap-2">
            <div className="border-r-2 pr-3">
              <span className="rounded-full border-transparent px-4 py-1 text-green-tag bg-green-tag bg-opacity-10 text-xs">
                In Person
              </span>
            </div>
            {jobPost.about.categories.slice(0, 2).map((category, index) => (
              <button
                key={index}
                className={`font-heading text-xs rounded-full border px-4 ${index === 0 ? 'border-my-yellow hover:bg-my-yellow hover:text-white text-my-yellow' : 'border-purple-tag hover:bg-purple-tag hover:text-white text-purple-tag'}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
