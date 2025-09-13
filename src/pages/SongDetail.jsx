import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getSong, getLyrics } from "../api/jiosaavn";
import { FaPlay, FaPause } from "react-icons/fa";
import { motion } from "framer-motion";

function SongDetail() {
  const { id } = useParams();
  const [song, setSong] = useState(null);
  const [lyrics, setLyrics] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    getSong(id).then((res) => setSong(res.data));
  }, [id]);

  const fetchLyrics = () => {
    getLyrics(id).then((res) => setLyrics(res.data.lyrics));
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  if (!song) return <p className="text-white text-center mt-20">Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-purple-900 p-6">
      {/* Song Cover */}
      <motion.img
        src={song.image}
        alt={song.title}
        className="w-80 h-80 rounded-xl shadow-2xl object-cover"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Song Info */}
      <h1 className="text-3xl font-bold mt-6 text-center text-white">{song.title}</h1>
      <p className="text-gray-300 text-lg mt-1 text-center">{song.primaryArtists}</p>

      {/* Audio Player */}
      <audio ref={audioRef} src={song.media_url} className="mt-4 w-full max-w-md" />

      {/* Play / Pause Button 3D */}
      <motion.button
        onClick={togglePlay}
        whileHover={{ scale: 1.1, y: -2, boxShadow: "0px 10px 20px rgba(0,0,0,0.4)" }}
        whileTap={{ scale: 0.95, y: 0, boxShadow: "0px 5px 10px rgba(0,0,0,0.3)" }}
        className="mt-6 px-8 py-3 rounded-full flex items-center gap-3 text-white font-semibold bg-gradient-to-br from-purple-600 to-purple-800 shadow-lg"
      >
        {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
        {isPlaying ? "Pause" : "Play"}
      </motion.button>

      {/* Show Lyrics Button 3D */}
     <motion.button
  onClick={fetchLyrics}
  whileHover={{
    scale: 1.08,
    y: -2,
    boxShadow: "0px 12px 24px rgba(0,0,0,0.35)",
  }}
  whileTap={{
    scale: 0.97,
    y: 0,
    boxShadow: "0px 6px 12px rgba(0,0,0,0.25)",
  }}
  className="mt-4 px-10 py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white font-semibold rounded-3xl shadow-xl hover:brightness-110 transition-all duration-300"
>
  Show Lyrics
</motion.button>


      {/* Lyrics Display */}
      {lyrics && (
        <pre className="mt-4 text-gray-200 whitespace-pre-wrap max-w-md text-center">{lyrics}</pre>
      )}
    </div>
  );
}

export default SongDetail;
