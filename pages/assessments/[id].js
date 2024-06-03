// pages/tests/[id].js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import TestForm from "../../components/AssessmentForm";

const EditTestPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [test, setTest] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchTest = async () => {
        try {
          const response = await axiosInstance.get(`/tests/${id}/`);
          setTest(response.data);
        } catch (error) {
          console.error("Failed to fetch test:", error);
        }
      };

      fetchTest();
    }
  }, [id]);

  const handleSuccess = () => {
    router.push("/tests");
  };

  return test ? (
    <TestForm test={test} onSuccess={handleSuccess} />
  ) : (
    <p>Loading...</p>
  );
};

export default EditTestPage;
