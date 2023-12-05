import { useEffect, useState } from "react";

interface Question {
  question: string;
  options: string[];
}

const useFetch = (url: string): Question[] | null => {
  const [fetchData, setFetchData] = useState<Question[] | null>(null);

  useEffect(() => {
    const getFetchData = async () => {
      try {
        const response = await fetch(url);
        const data: Question[] = await response.json();
        setFetchData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (!fetchData) {
      getFetchData();
    }
  }, [url, fetchData]);

  return fetchData;
};

export default useFetch;
