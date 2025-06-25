import { RedisAdmin } from '../../components/features/redis/RedisAdmin';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Redis Admin',
  description: 'Manage Redis cache and monitor performance',
};

export default function RedisAdminPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <RedisAdmin />
    </div>
  );
}
