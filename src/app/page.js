"use client";

import { useState, useEffect } from "react";
import SearchForm from "./components/SearchForm";
import Leaderboard from "./components/Leaderboard";
import ClipCard from "./components/ClipCard";
import LinkedInTag from "./components/LinkedInTag";

export default function Home() {
  const [streamerName, setStreamerName] = useState("");
  const [clips, setClips] = useState([]);
  const [ratings, setRatings] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
  const CLIENT_SECRET = process.env.NEXT_PUBLIC_CLIENT_SECRET;
  const API_BASE_URL = "https://api.twitch.tv/helix";

  // Charger les notes depuis le localStorage
  useEffect(() => {
    const savedRatings = JSON.parse(localStorage.getItem("ratings")) || {};
    setRatings(savedRatings);
  }, []);

  // Sauvegarder les notes dans le localStorage
  useEffect(() => {
    localStorage.setItem("ratings", JSON.stringify(ratings));
  }, [ratings]);

  const getAccessToken = async () => {
    const response = await fetch("https://id.twitch.tv/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: "client_credentials",
      }),
    });
    const data = await response.json();
    return data.access_token;
  };

  const fetchClips = async () => {
    if (!streamerName) return alert("Veuillez entrer un nom de streamer.");
    setClips([]);
    setLoading(true);
    setError(null);
    localStorage.removeItem("rating");

    try {
      const ACCESS_TOKEN = await getAccessToken();

      const userResponse = await fetch(
        `${API_BASE_URL}/users?login=${streamerName}`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            "Client-Id": CLIENT_ID,
          },
        }
      );

      const userData = await userResponse.json();

      if (!userData.data || !userData.data.length) {
        setLoading(false);
        return setError("Streamer introuvable.");
      }

      const broadcasterId = userData.data[0].id;
      const clipsResponse = await fetch(
        `${API_BASE_URL}/clips?broadcaster_id=${broadcasterId}&first=10`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            "Client-Id": CLIENT_ID,
          },
        }
      );

      const clipsData = await clipsResponse.json();

      if (clipsData.data) {
        setClips(clipsData.data);
      } else {
        setError("Aucun clip trouvé pour ce streamer.");
      }
    } catch (error) {
      console.error("Erreur :", error);
      setError("Une erreur s'est produite lors du chargement des clips.");
    }

    setLoading(false);
  };

  const handleRating = (clipId, rating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [clipId]: rating,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-[#9146ff]">
        Notes tes clips Twitch
      </h1>

      <SearchForm
        streamerName={streamerName}
        setStreamerName={setStreamerName}
        onSearch={fetchClips}
        loading={loading}
      />

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      {showLeaderboard ? (
        <Leaderboard clips={clips} ratings={ratings} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {clips.map((clip) => (
            <ClipCard
              key={clip.id}
              clip={clip}
              rating={ratings[clip.id]}
              onRate={handleRating}
            />
          ))}
        </div>
      )}

      {clips.length > 0 && !showLeaderboard && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setShowLeaderboard(true)}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-[#9146ff] text-white px-4 py-2 rounded hover:bg-purple-600"
          >
            Terminer l'évaluation
          </button>
        </div>
      )}
      <LinkedInTag />
    </div>
  );
}
