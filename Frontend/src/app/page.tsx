import { CounterDisplay } from '../components/features/counter/CounterDisplay';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to our fullstack application',
};

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">
          Welcome to My Fullstack App
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          A modern web application built with Next.js, FastAPI, and Redis. 
          Experience the power of full-stack development with real-time features.
        </p>
      </div>
      
      <div className="mb-12">
        <CounterDisplay />
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
          <div className="text-3xl mb-4">⚡</div>
          <h3 className="text-lg font-semibold mb-2">Fast Performance</h3>
          <p className="text-gray-600">Built with Next.js for optimal performance and SEO</p>
        </div>
        <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
          <div className="text-3xl mb-4">🔄</div>
          <h3 className="text-lg font-semibold mb-2">Real-time Updates</h3>
          <p className="text-gray-600">Live data synchronization with Redis backend</p>
        </div>
        <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
          <div className="text-3xl mb-4">🛠️</div>
          <h3 className="text-lg font-semibold mb-2">Modern Stack</h3>
          <p className="text-gray-600">TypeScript, Tailwind CSS, and best practices</p>
        </div>
      </div>
    </div>
  );
}
