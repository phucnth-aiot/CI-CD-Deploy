import { Loading } from '@/components/ui';

export default function LoadingPage() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <Loading size="lg" text="Loading..." />
    </div>
  );
}
