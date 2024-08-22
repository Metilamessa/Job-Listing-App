'use client';

import React from 'react';
import JobCard from '../components/JobCard';
import { useFetchJobs } from '../components/hooks/hooks';

const JobListPage = () => {
  const { jobs, loading, error } = useFetchJobs();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <main className="pl-8 sm:pl-12 lg:pl-28 pr-10 sm:pr-20 lg:pr-72 py-16">
      <div className="flex justify-between">
        <hgroup>
          <h1 className="font-black text-3xl font-heading text-dark-blue">Opportunities</h1>
          <p className="text-gray-500 mt-2">Showing {jobs.length} results</p>
        </hgroup>
        <div className="flex items-center gap-2">
          <p className="text-gray-400 font-body font-medium">Sort by: </p>
          <select className="bg-white w-36 focus:border-collapse font-body font-medium" name="sortby" id="choice">
            <option defaultValue="most-relevant" value="most-relevant">Most relevant</option>
            <option value="latest">Latest</option>
            <option value="popular">Popular</option>
          </select>
        </div>
      </div>
      <section>
        {Array.isArray(jobs) && jobs.length > 0 ? (
          jobs.map((job) => (
            <JobCard
              key={job.id}
              jobPost={job}
              pic={job.logoUrl || '/im2.webp'}
              jobId={job.id}
            />
          ))
        ) : (
          <p>No jobs available</p>
        )}
      </section>
    </main>
  );
};

export default JobListPage;
