import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-black/40 backdrop-blur-md px-6 py-4 flex justify-between items-center shadow-lg">
      <h1 className="text-2xl font-bold text-purple-400">🎶 Music Player</h1>
      <div className="flex gap-6 text-gray-200">
        <Link to="/" className="hover:text-purple-400 transition">Home</Link>
        <Link to="/search" className="hover:text-purple-400 transition">Search</Link>
      </div>
    </nav>
  );
}

export default Navbar;
