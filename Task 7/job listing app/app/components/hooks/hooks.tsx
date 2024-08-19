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
        const data: JobPost[] = await response.json();
        setJobs(data);
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
