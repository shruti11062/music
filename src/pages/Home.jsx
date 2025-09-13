import { useEffect, useState } from "react";
import { getTrending } from "../api/jiosaavn";
import SongCard from "../components/SongCard";

function Home() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    getTrending("hindi").then((res) => {
     console.log(res.data); // check the keys
    setSongs(res.data.results || []); // ✅ use correct key
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-4">🔥 Trending Songs</h1>
      <div className="grid grid-cols-2 md:grid-cols-5  gap-3">
        {songs.map((song, idx) => (
          <SongCard key={idx} song={song} />
        ))}
      </div>
    </div>
  );
}

export default Home;
