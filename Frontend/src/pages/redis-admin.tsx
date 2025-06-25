// pages/redis-admin.tsx
import { useEffect, useState } from "react";

export default function RedisAdmin() {
  const [keys, setKeys] = useState<string[]>([]);
  const [selectedKey, setSelectedKey] = useState("");
  const [keyValue, setKeyValue] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/api/redis/keys`)
      .then((res) => res.json())
      .then(setKeys);
  }, []);

  const fetchKeyValue = async (k: string) => {
    const res = await fetch(`http://localhost:3000/api/redis/keys/${k}`);
    setSelectedKey(k);
    setKeyValue(await res.text());
  };
  const addKey = async () => {
    await fetch(`http://localhost:3000/api/redis`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: selectedKey, value: keyValue }),
    });
    alert("Thêm thành công!");
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 p-8">
      <div className="max-w-2xl mx-auto bg-white shadow-xl p-6 rounded-xl">
        <h1 className="text-2xl font-bold mb-4 text-purple-600">Redis Keys</h1>
        <ul className="space-y-1 mb-4 max-h-48 overflow-y-auto border p-2 rounded">
          {keys.map((k) => (
            <li
              key={k}
              className="cursor-pointer text-purple-700 hover:underline"
              onClick={() => fetchKeyValue(k)}
            >
              {k}
            </li>
          ))}
        </ul>

        <h2 className="text-xl mb-2 text-purple-700">Sửa / Thêm Key</h2>
        <input
          placeholder="Key"
          value={selectedKey}
          onChange={(e) => setSelectedKey(e.target.value)}
          className="block border p-2 mb-2 w-full rounded"
        />
        <input
          placeholder="Value"
          value={keyValue}
          onChange={(e) => setKeyValue(e.target.value)}
          className="block border p-2 mb-2 w-full rounded"
        />
        <button
          onClick={addKey}
          className="bg-purple-500 hover:bg-purple-600 text-white p-2 w-full rounded"
        >Lưu</button>
      </div>
    </div>
  );
}
