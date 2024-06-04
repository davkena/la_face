// pages/results/[id].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import ResultForm from '../../components/ResultForm';

const EditResultPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchResult = async () => {
        try {
          const response = await axiosInstance.get(`/results/${id}/`);
          setResult(response.data);
        } catch (error) {
          console.error('Failed to fetch result:', error);
        }
      };

      fetchResult();
    }
  }, [id]);

  const handleSuccess = () => {
    router.push('/results');
  };

  return result ? <ResultForm result={result} onSuccess={handleSuccess} /> : <p>Loading...</p>;
};

export default EditResultPage;