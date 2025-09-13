import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getAlbum } from "../api/jiosaavn";

function AlbumDetail() {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    getAlbum(id).then((res) => setAlbum(res.data));
  }, [id]);

  if (!album) return <p className="p-6 text-gray-400">Loading...</p>;

  return (
    <div className="p-6">
      <div className="flex gap-6 mb-6">
        <img
          src={album.image}
          alt={album.title}
          className="w-60 h-60 object-cover rounded-xl shadow-lg"
        />
        <div>
          <h1 className="text-3xl font-bold text-white">{album.title}</h1>
          <p className="text-gray-300">{album.primaryArtists}</p>
        </div>
      </div>
      <h2 className="text-xl font-semibold mb-4">Songs</h2>
      <ul className="space-y-2">
        {album.songs.map((song) => (
          <li
            key={song.id}
            className="bg-white/10 p-3 rounded-lg flex justify-between"
          >
            <span>{song.title}</span>
            <Link
              to={`/song/${song.id}`}
              className="text-purple-400 hover:underline"
            >
              View
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AlbumDetail;
