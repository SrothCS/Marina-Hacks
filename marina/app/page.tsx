'use client';
import React from 'react';
import Spline from '@splinetool/react-spline/next';
import { useRouter } from 'next/navigation';

const ASLLandingPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900">
      <section className="min-h-screen flex flex-col items-center justify-start pt-8 p-4 relative">
        {/* Hero Text - Further reduced top padding and bottom margin */}
        <div className="text-center mb-4 z-10">
          <h1 className="text-7xl font-bold text-white mb-4">
            Learn ASL
          </h1>
          <p className="text-2xl text-purple-200 max-w-2xl mx-auto">
            Master American Sign Language through interactive 3D demonstrations
          </p>
        </div>

        {/* Spline 3D Model - Significantly increased height */}
        <div className="w-full max-w-5xl h-[500px] mb-8 relative z-0">
          <Spline
            scene="https://prod.spline.design/cRk3icxeUpZ7BtvS/scene.splinecode"
            className="w-full h-full rounded-xl"
          />
        </div>

        {/* Buttons Container */}
        <div className="flex gap-8 z-10">
          <button
            onClick={() => router.push('/learning')}
            className="px-10 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-lg font-semibold transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
          >
            Start Learning
          </button>

          <button
            onClick={() => router.push('/practice')}
            className="px-10 py-4 bg-transparent border-2 border-purple-400 text-purple-200 hover:bg-purple-800/30 rounded-xl text-lg font-semibold transform hover:scale-105 transition-all duration-200"
          >
            Practice Signs
          </button>
        </div>
      </section>
    </div>
  );
};

export default ASLLandingPage;