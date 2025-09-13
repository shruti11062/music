import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function SongCard({ song }) {
  const navigate = useNavigate();

  const handleListen = () => {
    navigate(`/song/${song.id}`);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="w-44 h-72 rounded-2xl shadow-lg cursor-pointer overflow-hidden bg-white"
    >
      {/* Cover Image */}
      <div className="w-full h-40 relative">
        <img
          src={song.image}
          alt={song.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info Section */}
      <div className="p-3 flex flex-col justify-between h-32 bg-white">
        <div>
          {/* Song Title */}
          <h2 className="text-black font-semibold text-sm truncate">
            {song.title}
          </h2>

          {/* Singer Name */}
          {song.primaryArtists && (
            <p className="text-gray-800 text-xs truncate">{song.primaryArtists}</p>
          )}

          {/* Release Year */}
          {song.year && (
            <p className="text-gray-500 text-xs mt-1">Released: {song.year}</p>
          )}
        </div>

        {/* Listen Button */}
        <button
          onClick={handleListen}
          className="mt-2 w-full bg-purple-600 hover:bg-purple-700 text-white text-sm py-1 rounded-lg font-medium transition"
        >
          Listen
        </button>
      </div>
    </motion.div>
  );
}

export default SongCard;
