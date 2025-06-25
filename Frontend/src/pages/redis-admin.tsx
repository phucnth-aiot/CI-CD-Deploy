// pages/redis-admin.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import RedisForm from '../components/redisForm';
import RedisKeys from '../components/redisKey';

export default function RedisAdmin() {
  const [keys, setKeys] = useState<string[]>([]);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [keyValue, setKeyValue] = useState<string | null>(null);

  useEffect(() => {
    fetchKeys();
  }, []);

  const fetchKeys = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/redis/keys');
      setKeys(response.data);
    } catch (error) {
      console.error('Error fetching Redis keys:', error);
    }
  };

  const fetchKeyValue = async (key: string) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/redis/keys/${key}`);
      setKeyValue(response.data);
      setSelectedKey(key);
    } catch (error) {
      console.error('Error fetching key value:', error);
    }
  };

  const addRedisKey = async (key: string, value: string) => {
    try {
      await axios.post('http://localhost:3000/api/redis', { key, value });
      fetchKeys();
    } catch (error) {
      console.error('Error adding Redis key:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Redis Admin</h1>
      <RedisForm onAddKey={addRedisKey} />
      <RedisKeys keys={keys} onSelectKey={fetchKeyValue} />
      {selectedKey && keyValue && (
        <div className="mt-4 p-4 border rounded">
          <h3 className="text-lg font-semibold">Key: {selectedKey}</h3>
          <p>Value: {keyValue}</p>
        </div>
      )}
    </div>
  );
}