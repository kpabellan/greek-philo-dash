import Leaderboard from "../components/Leaderboard";
import Activities from "../components/Activities";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center pt-10">
      <Leaderboard />
      <Activities />
    </main>
  );
}
