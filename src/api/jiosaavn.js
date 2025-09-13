import axios from "axios";

const API = axios.create({
  baseURL: "https://jiosaavn-api.snehkr.in",
});

// 🔍 Search songs
export const searchSongs = (query) => API.get(`/search?query=${query}`);

// 🎵 Get song details
export const getSong = (id) => API.get(`/song?id=${id}`);

// 🔗 Get song from link
export const getSongFromLink = (url) => API.get(`/link?url=${url}`);

// 📝 Get lyrics
export const getLyrics = (id) => API.get(`/lyrics?id=${id}`);

// 💿 Search albums
export const searchAlbums = (query) => API.get(`/albumsearch?query=${query}`);

// 📀 Album details
export const getAlbum = (id) => API.get(`/album?id=${id}`);

// 📈 Trending songs
export const getTrending = (lang = "hindi") =>
  API.get(`/trending?lang=${lang}`);
