const SearchForm = ({ streamerName, setStreamerName, onSearch, loading }) => {
  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
      <input
        type="text"
        placeholder="Entrer le pseudo du streamer"
        className="w-full p-2 border rounded mb-4 text-[#9146ff]"
        value={streamerName}
        onChange={(e) => setStreamerName(e.target.value)}
      />
      <button
        onClick={onSearch}
        className="bg-[#9146ff] text-white w-full p-2 rounded hover:bg-purple-600"
      >
        {loading ? "Chargement..." : "Rechercher"}
      </button>
    </div>
  );
};

export default SearchForm;
