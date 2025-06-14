import SubwayMap from './components/SubwayMap';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full max-w-5xl">
        <h1 className="text-4xl font-bold mb-8 text-center">NYC Subway Map</h1>
        <div className="w-full aspect-[4/3] bg-white rounded-lg shadow-lg overflow-hidden">
          <SubwayMap />
        </div>
      </div>
    </main>
  );
}
