import Link from 'next/link';
import { Button } from '@/components/ui';
import { ROUTES } from '@/constants';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
      <p className="text-gray-600 mb-8 max-w-md">
        The page you are looking for might have been removed, had its name changed, 
        or is temporarily unavailable.
      </p>
      <Link href={ROUTES.HOME}>
        <Button>Go Home</Button>
      </Link>
    </div>
  );
}
