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
    <div className="min-h-screen bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-6 sm:p-8 transition-all duration-500 hover:shadow-[0_0_20px_rgba(168,123,250,0.5)]">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 animate-pulse">
            Redis Admin
          </h1>
          <p className="text-sm text-gray-600 mt-2 font-medium">Nguyễn Thanh Hoàng Phúc</p>
        </div>

        {/* Key List */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-center text-purple-700 mb-4">Danh sách Keys</h2>
          <ul className="space-y-3 max-h-60 overflow-y-auto border-2 border-purple-300 rounded-xl p-4 bg-gradient-to-b from-purple-50 to-pink-50 key-list">
            {keys.map((k) => (
              <li
                key={k}
                className="cursor-pointer text-center text-purple-600 hover:text-white hover:bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                onClick={() => fetchKeyValue(k)}
              >
                {k}
              </li>
            ))}
          </ul>
        </div>

        {/* Form Section */}
        <div>
          <h2 className="text-xl font-semibold text-center text-purple-700 mb-4">Sửa / Thêm Key</h2>
          <div className="space-y-4 max-w-md mx-auto">
            <input
              placeholder="Nhập key"
              value={selectedKey}
              onChange={(e) => setSelectedKey(e.target.value)}
              className="block w-full border-2 border-purple-300 rounded-xl p-3 text-gray-700 bg-white/80 focus:outline-none focus:ring-4 focus:ring-purple-400 focus:border-purple-500 transition-all duration-300 placeholder-gray-400"
            />
            <input
              placeholder="Nhập value"
              value={keyValue}
              onChange={(e) => setKeyValue(e.target.value)}
              className="block w-full border-2 border-purple-300 rounded-xl p-3 text-gray-700 bg-white/80 focus:outline-none focus:ring-4 focus:ring-purple-400 focus:border-purple-500 transition-all duration-300 placeholder-gray-400"
            />
            <button
              onClick={addKey}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-purple-600 hover:to-pink-500 text-white font-semibold p-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Lưu
            </button>
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .key-list::-webkit-scrollbar {
          width: 10px;
        }
        .key-list::-webkit-scrollbar-track {
          background: #f3e8ff;
          border-radius: 8px;
        }
        .key-list::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #ec4899, #a78bfa);
          border-radius: 8px;
        }
        .key-list::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #db2777, #8b5cf6);
        }
      `}</style>
    </div>
  );
}
