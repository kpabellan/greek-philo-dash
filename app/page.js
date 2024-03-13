import Leaderboard from "../components/Leaderboard";
import Activities from "../components/Activities";
import Photos from "../components/Photos";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center pt-10">
      <Leaderboard />
      <Photos />
      <Activities />
    </main>
  );
}
