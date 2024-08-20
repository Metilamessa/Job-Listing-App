'use client';

import { useState, useEffect } from 'react';
import JobPost from '../../models/JobPost';

export const useFetchJobs = () => {
  const [jobs, setJobs] = useState<JobPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('https://akil-backend.onrender.com/opportunities/search');
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        const data = await response.json();
        
        console.log('Fetched Data:', data);

        if (Array.isArray(data.data)) {
          setJobs(data.data);  
        } else {
          console.error('Data is not an array:', data);
          setError('Unexpected data format');
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return { jobs, loading, error };
};
