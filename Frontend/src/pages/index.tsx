// pages/index.tsx
import { useEffect, useState } from "react";

export default function Home() {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    fetch(`http://localhost:3000/api/counter`)
      .then((res) => res.json())
      .then((data) => setCount(data.value));
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white rounded-xl shadow-xl p-8 text-center">
        <h1 className="text-3xl font-bold mb-2 text-blue-600">Số lượt truy cập</h1>
        <p className="text-6xl text-blue-500">{count}</p>
      </div>
    </main>
  );
}
