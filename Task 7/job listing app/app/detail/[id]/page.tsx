'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import JobPost from '../../models/JobPost';
import Image from 'next/image';
import About from '../../components/About';

const JobDetailPage = () => {
  const [job, setJob] = useState<JobPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  useEffect(() => {
    if (!id) return;

    const fetchJob = async () => {
      try {
        const response = await axios.get(`https://akil-backend.onrender.com/opportunities/${id}`);
        setJob(response.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!job) return <p>Job not found</p>;

  return (
    <main className="md:grid grid-cols-4 p-8">
      <section className="col-span-3 pr-12 py-12">
        <div className="mb-8">
          <h1 className="pl-8 mb-2 font-black font-heading text-xl text-dark-blue">Description</h1>
          <div className="pl-8 text-dark-blue font-body text-base">
            {job.description}
          </div>
        </div>
        <div className="mb-8">
          <h1 className="font-bold pl-8 font-heading text-xl text-dark-blue">Responsibilities</h1>
          {job.responsibilities.map((responsibility, index) => (
            <li key={index} className="pl-8 list-none flex my-3 text-dark-blue font-body text-base">
              <Image className="flex items-center mr-2" src="/check-icon.svg" alt="check-icon" width={16} height={16} />
              {responsibility}
            </li>
          ))}
        </div>
        <div className="mb-8">
          <h1 className="font-bold pl-8 font-heading text-xl text-dark-blue">Ideal Candidate</h1>
          <ul className="ml-14 list-disc text-balance mt-2">
            <li className="font-body items-center text-base font-bold text-dark-blue mb-1">
              {job.ideal_candidate.age === 'Any' ? (
                <span>{job.ideal_candidate.age} age, </span>
              ) : (
                <span>Young ({job.ideal_candidate.age})</span>
              )}
              {job.ideal_candidate.gender === 'Any' ? (
                <span>{job.ideal_candidate.gender} gender </span>
              ) : (
                job.ideal_candidate.gender
              )}
              {job.title}
            </li>
            {job.ideal_candidate.traits.map((trait, index) => (
              <li key={index} className="font-body font-normal text-base mb-1">
                {trait}
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-8">
          <h1 className="font-bold pl-8 font-heading text-xl text-dark-blue">When & where</h1>
          <div className="pl-6 font-body font-normal text-base flex items-center gap-4 mt-2">
            <div className="w-10 h-10 flex justify-center items-center border rounded-3xl bg-white">
              <Image src="/location-icon.svg" alt="icon" width={24} height={24} />
            </div>
            {job.when_where}
          </div>
        </div>
      </section>

      <aside className="col-span-1">
        <div className="border-b-2 flex flex-col gap-3 mb-3">
          <h2 className="font-bold mb-2 font-heading text-xl text-dark-blue">About</h2>

          <About
            title="Posted On"
            value={job.about.posted_on}
            icon="/plus-icon.svg"
          />
          <About
            title="Deadline"
            value={job.about.deadline}
            icon="/fire-icon.svg"
          />
          <About
            title="Location"
            value={job.about.location}
            icon="/location-icon.svg"
          />
          <About
            title="Start Date"
            value={job.about.start_date}
            icon="/calendar-start-icon.svg"
          />
          <About
            title="End Date"
            value={job.about.end_date}
            icon="/calendar-check-icon.svg"
          />
        </div>
        <div className="border-b-2 mt-3 mb-3 pb-4">
          <h2 className="font-bold font-heading text-xl text-dark-blue">Categories</h2>
          <div className="flex gap-4 mt-4">
            {job.about.categories.map((category, index) => (
              <div
                key={index}
                className={`rounded-full border-transparent px-4 py-1 ${index % 2 === 0 ? 'text-orange bg-orange' : 'text-green bg-green'} bg-opacity-10`}
              >
                {category}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-3">
          <h2 className="font-bold font-heading text-xl text-dark-blue">Required Skills</h2>
          <div className="flex gap-2 mt-2 flex-wrap">
            {job.about.required_skills.map((skill, index) => (
              <div
                key={index}
                className="rounded-full border-transparent px-4 py-1 text-purple-tag bg-purple-tag bg-opacity-10"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </aside>
    </main>
  );
};

export default JobDetailPage;
