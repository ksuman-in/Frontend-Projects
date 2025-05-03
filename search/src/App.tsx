import { useEffect, useState } from "react";
import "./App.css";

interface Book {
  id: number;
  title: string;
  formats: {
    "image/jpeg": string;
  };
  summaries: string[];
}

function App() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const debounce = (func: (...args: any[]) => void, delay: number) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let timeOut: any | null = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return function (...args: any[]) {
      if (timeOut) clearTimeout(timeOut);
      timeOut = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    if (value === "") {
      fetchResults();
    } else {
      fetchResults(value);
    }
  };

  const fetchResults = async (searchValue?: string) => {
    setIsLoading(true);
    const url = searchValue
      ? `http://gutendex.com/books?search=${searchValue}`
      : `http://gutendex.com/books`;
    const response = await fetch(url);
    const data = await response.json();
    setIsLoading(false);
    setResults(data.results);
  };

  useEffect(() => {
    fetchResults();
  }, []);
  return (
    <div className="screen-h-100 flex flex-col items-center justify-center w-max-[80vw]">
      <div className="flex flex-col bg-gray-500 p-6 rounded-lg shadow-lg w-[400px] items-center">
        <h1 className="text-4xl text-white font-bold mb-4">Search Bar</h1>
        <input
          type="text"
          placeholder="Search..."
          onChange={debounce(handleSearch, 500)}
          className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white-200"
        />
      </div>
      <div className="flex flex-col items-center w-full bg-gray-500 p-6 rounded-lg shadow-lg mt-4">
        <h2 className="text-2xl text-white mt-4">Search Results</h2>
        {isLoading ? (
          <div className="flex items-center justify-center w-full h-32">
            <svg
              className="animate-spin h-10 w-10 text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 1a11 11 0 1 0 11 11A11.012 11.012 0 0 0 12 1zm0 20a9 9 0 1 1 9-9A9.01 9.01 0 0 1 12 21z"
              />
            </svg>
          </div>
        ) : (
          <ul className="flex flex-wrap gap-2 p-10 list-disc list-inside mt-2">
            {/* Card view with image avatar name and descripttion */}
            {results?.length > 0 ? (
              results?.map((result: Book, index) => {
                const imageUrl = result.formats["image/jpeg"];
                const description = result.summaries[0]?.slice(0, 100) + "...";
                return (
                  <li
                    key={`${result.id}-${index}`}
                    className="flex-grow flex-[23%] flex-col items-center bg-gray-300 p-4 rounded-lg shadow-md mb-2 list-none"
                  >
                    <div className="flex flex-col items-center">
                      <img
                        src={imageUrl}
                        alt={result.title}
                        className="w-24 h-24 rounded-full mb-2"
                      />
                      <h3 className="text-lg font-semibold">{result.title}</h3>
                      <p className="text-gray-600">{description}</p>
                    </div>
                  </li>
                );
              })
            ) : (
              <li className="flex-grow flex-[25%] flex-col items-center bg-gray-300 p-4 rounded-lg shadow-md mb-2 list-none">
                <div className="flex flex-col items-center">
                  <h3 className="text-lg font-semibold">No results found</h3>
                  <p className="text-gray-600">Please try again</p>
                </div>
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
