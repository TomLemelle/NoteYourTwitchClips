const ClipCard = ({ clip, rating, onRate }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <a href={clip.url} target="_blank" rel="noopener noreferrer">
        <img
          src={clip.thumbnail_url}
          alt={clip.title}
          className="rounded mb-2"
        />
      </a>
      <h3 className="font-bold text-sm text-[#9146ff]">{clip.title}</h3>
      <p className="text-gray-500 text-xs">
        Créé par {clip.creator_name} • {clip.view_count} vues
      </p>
      {/* Section de notation */}
      <div className="mt-4 flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => onRate(clip.id, star)}
            className={`text-2xl ${
              rating >= star ? "text-[#9146ff]" : "text-gray-300"
            }`}
          >
            ★
          </button>
        ))}
      </div>
      <p className="text-gray-500 text-xs mt-2">
        Note actuelle : {rating || "Non noté"}
      </p>
    </div>
  );
};

export default ClipCard;
