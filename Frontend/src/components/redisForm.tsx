// components/RedisForm.tsx
import { useState } from 'react';

interface RedisFormProps {
  onAddKey: (key: string, value: string) => void;
}

export default function RedisForm({ onAddKey }: RedisFormProps) {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (key && value) {
      onAddKey(key, value);
      setKey('');
      setValue('');
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Thêm Redis Key</h2>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Key"
          className="p-2 border rounded"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Value"
          className="p-2 border rounded"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Thêm Key
        </button>
      </div>
    </div>
  );
}