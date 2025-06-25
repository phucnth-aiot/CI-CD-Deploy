// components/RedisKeys.tsx
interface RedisKeysProps {
  keys: string[];
  onSelectKey: (key: string) => void;
}

export default function RedisKeys({ keys, onSelectKey }: RedisKeysProps) {
  return (
    <div className="grid gap-4">
      <h2 className="text-xl font-semibold">Danh sách Keys</h2>
      {keys.map(key => (
        <div key={key} className="p-4 border rounded shadow">
          <button
            onClick={() => onSelectKey(key)}
            className="text-blue-500 hover:underline"
          >
            {key}
          </button>
        </div>
      ))}
    </div>
  );
}