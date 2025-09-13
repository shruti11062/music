import { useState } from "react";
import { searchSongs, searchAlbums } from "../api/jiosaavn";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Search() {
  const [results, setResults] = useState({ songs: [], albums: [] });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (query) => {
    setLoading(true);
    try {
      const [songsRes, albumsRes] = await Promise.all([
        searchSongs(query),
        searchAlbums(query),
      ]);

      setResults({
        songs: songsRes.data.results || [],
        albums: albumsRes.data.results || [],
      });
    } catch (err) {
      console.error(err);
      setResults({ songs: [], albums: [] });
    }
    setLoading(false);
  };

  const handleListen = (id) => {
    navigate(`/song/${id}`);
  };

  const renderCard = (item) => (
    <motion.div
      key={item.id}
      whileHover={{ scale: 1.03 }}
      className="w-52 h-64 rounded-2xl shadow-lg cursor-pointer overflow-hidden bg-white"
    >
      {/* Image */}
      <div className="w-full h-36 relative">
        <img
          src={item.image}
          alt={item.title || item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col justify-between h-28 bg-white">
        <div>
          <h2 className="text-black font-semibold text-sm truncate">
            {item.title || item.name}
          </h2>
          {item.primaryArtists && (
            <p className="text-gray-800 text-xs truncate">
              {item.primaryArtists}
            </p>
          )}
        </div>

        {/* Listen Button */}
        <button
          onClick={() => handleListen(item.id)}
          className="mt-2 w-full bg-purple-600 hover:bg-purple-700 text-white text-sm py-1 rounded-lg font-medium transition"
        >
          Listen
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="p-6">
      <SearchBar onSearch={handleSearch} />

      {loading && <p className="text-center text-white mt-4">Loading...</p>}

      <h2 className="mt-6 text-xl font-semibold text-white">Songs</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-2">
        {results.songs.length > 0
          ? results.songs.map(renderCard)
          : !loading && <p className="text-white mt-2">No songs found</p>}
      </div>

      <h2 className="mt-6 text-xl font-semibold text-white">Albums</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-2">
        {results.albums.length > 0
          ? results.albums.map(renderCard)
          : !loading && <p className="text-white mt-2">No albums found</p>}
      </div>
    </div>
  );
}

export default Search;
