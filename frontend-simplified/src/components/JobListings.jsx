import { useState, useEffect } from 'react';
import JobListing from './JobListing';
import Spinner from './Spinner';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const JobListings = ({ isHome = false }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token'); // Retrieve the token from local storage

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/jobs/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        });
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.log('Error fetching data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <section className='bg-blue-50 px-4 py-10'>
      <div className='container-xl lg:container m-auto'>
        <h2 className='text-3xl font-bold text-indigo-500 mb-6 text-center'>
          {isHome ? 'Recent Jobs' : 'Browse Jobs'}
        </h2>

        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jobs.length === 0 ? (
              <p>No jobs available at the moment.</p>
            ) : (
              jobs.map((job) => (
                <JobListing key={job.id} job={job} />
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
};
export default JobListings;
