'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import JobPost from '../../models/JobPost';
import Image from 'next/image';
import About from '../../components/About';

const JobDetailPage = ({params}:{params:{id:string}}) => {
  const [job, setJob] = useState<JobPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  

  useEffect(() => {
    if (!params.id) {
      console.error('Job ID is missing');
      setLoading(false);
      setError('Job ID is missing');
      return;
    }

    const fetchJob = async () => {
      try {
        console.log('Fetching job with ID:', params.id);
        const response = await axios.get(`https://akil-backend.onrender.com/opportunities/${params.id}`);
        setJob(response.data.data);  
        console.log('Job data set:', job);
      } catch (err) {
        console.error('Error fetching job details:', err);
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
  }, [params.id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!job) return <p>Job not found</p>;

  return (
    <main className="md:grid grid-cols-4 p-8">
      <section className="col-span-3 pr-12 py-12">
        <div className="mb-8">
          <h1 className="pl-8 mb-2 font-black font-heading text-xl text-dark-blue">Description</h1>
          <div className="pl-8 text-dark-blue font-body text-base">
            {job.description || 'No description available'}
          </div>
        </div>
        <div className="mb-8">
          <h1 className="font-bold pl-8 font-heading text-xl text-dark-blue">Responsibilities</h1>
          {job.responsibilities?.split('\n').map((responsibility, index) => (
            <li key={index} className="pl-8 list-none flex my-3 text-dark-blue font-body text-base">
              <Image className="flex items-center mr-2" src="/green-check.svg" alt="check-icon" width={16} height={16} />
              {responsibility}
            </li>
          ))}
        </div>
      </section>

      <aside className="col-span-1">
        <div className="border-b-2 flex flex-col gap-3 mb-3">
          <h2 className="font-bold mb-2 font-heading text-xl text-dark-blue">About</h2>

          <About
            title="Posted On"
            value={new Date(job.datePosted).toLocaleDateString()}
            icon="/plus-circle.svg"
          />
          <About
            title="Deadline"
            value={new Date(job.deadline).toLocaleDateString()}
            icon="/fireicon.svg"
          />
          <About
            title="Location"
            value={job.location.join(', ')}
            icon="/Icon-location.svg"
          />
          <About
            title="Start Date"
            value={new Date(job.startDate).toLocaleDateString()}
            icon="/calendar-start.svg"
          />
          <About
            title="End Date"
            value={new Date(job.endDate).toLocaleDateString()}
            icon="/calendar-check-icon.svg"
          />
        </div>
        <div className="border-b-2 mt-3 mb-3 pb-4">
          <h2 className="font-bold font-heading text-xl text-dark-blue">Categories</h2>
          <div className="flex gap-4 mt-4">
            {job.categories?.map((category, index) => (
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
            {job.requiredSkills?.map((skill, index) => (
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

