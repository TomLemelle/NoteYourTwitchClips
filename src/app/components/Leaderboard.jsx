const Leaderboard = ({ clips, ratings }) => {
  const sortedClips = [...clips].sort(
    (a, b) => (ratings[b.id] || 0) - (ratings[a.id] || 0)
  );

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-center mb-4 text-[#9146ff]">
        Leaderboard
      </h2>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b text-left text-[#9146ff]">
                Rank
              </th>
              <th className="px-4 py-2 border-b text-left text-[#9146ff]">
                Clip
              </th>
              <th className="px-4 py-2 border-b text-left text-[#9146ff]">
                Creator
              </th>
              <th className="px-4 py-2 border-b text-left text-[#9146ff]">
                Note
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedClips.map((clip, index) => (
              <tr key={clip.id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border-b text-gray-500">
                  {index + 1}
                </td>
                <td className="px-4 py-2 border-b flex items-center">
                  <a
                    href={clip.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#9146ff] hover:underline flex items-center"
                  >
                    <img
                      src={clip.thumbnail_url}
                      alt={clip.title}
                      className="w-[100px] h-auto rounded mr-2"
                    />
                    {clip.title}
                  </a>
                </td>
                <td className="px-4 py-2 border-b text-gray-500">
                  {clip.creator_name}
                </td>
                <td className="px-4 py-2 border-b text-gray-500">
                  {ratings[clip.id] || "Non noté"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
