// pages/index.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    axios.get('http://localhost:3000/api/counter')
      .then(response => setCount(response.data.value))
      .catch(error => console.error('Error fetching counter:', error));
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold">
        Số lượt truy cập: {count !== null ? count : 'Loading...'}
      </h1>
    </div>
  );
}