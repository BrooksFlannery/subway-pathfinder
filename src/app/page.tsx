import SubwayGame from './components/SubwayGame';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">NYC Subway Pathfinder</h1>
        <SubwayGame />
      </div>
    </main>
  );
}
