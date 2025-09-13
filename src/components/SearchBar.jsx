import { useState } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-lg mx-auto bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden"
    >
      <input
        type="text"
        placeholder="Search for songs or albums..."
        className="flex-1 px-4 py-2 bg-transparent text-white outline-none"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        type="submit"
        className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
