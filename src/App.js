// App.js
import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import "./App.css";

// YouTubeのURLから動画IDを抽出
function extractVideoId(url) {
  const match = url.match(/(?:v=|\/live\/|\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

// 🎤 おすすめ動画セクション
function FeaturedSection() {
  const [showAll, setShowAll] = useState(false);
  const featuredSongs = [
    {
      title: "名前のない怪物 - 音乃瀬奏（cover）",
      videoUrl: "https://youtu.be/45ZfAdZuaok",
      thumbnail: "https://img.youtube.com/vi/45ZfAdZuaok/hqdefault.jpg"
    },
    {
      title: "DAYBREAK FRONTLINE - 音乃瀬奏（cover）",
      videoUrl: "https://youtu.be/BWexRFqs3Wg",
      thumbnail: "https://img.youtube.com/vi/BWexRFqs3Wg/hqdefault.jpg"
    },
    {
      title: "My Dearest - 音乃瀬奏（cover）",
      videoUrl: "https://youtu.be/oxZeLM9rx7s",
      thumbnail: "https://img.youtube.com/vi/oxZeLM9rx7s/hqdefault.jpg"
    },
    {
      title: "奏 / スキマスイッチ - 音乃瀬奏（cover）",
      videoUrl: "https://youtu.be/VT1on_WaMzw",
      thumbnail: "https://img.youtube.com/vi/VT1on_WaMzw/hqdefault.jpg"
    },
    {
      title: "Bling-Bang-Bang-Born - 音乃瀬奏（cover）",
      videoUrl: "https://youtu.be/vFDysagoQw0",
      thumbnail: "https://img.youtube.com/vi/vFDysagoQw0/hqdefault.jpg"
    },
    {
      title: "青のすみか - 音乃瀬奏（cover）",
      videoUrl: "https://youtu.be/efF_c9D-R-A",
      thumbnail: "https://img.youtube.com/vi/efF_c9D-R-A/hqdefault.jpg"
    },
    {
      title: "青と夏 - 音乃瀬奏（cover）",
      videoUrl: "https://youtu.be/FnAk_ZGfvdw",
      thumbnail: "https://img.youtube.com/vi/FnAk_ZGfvdw/hqdefault.jpg"
    },
    {
      title: "快晴 - 音乃瀬奏（cover）",
      videoUrl: "https://youtu.be/YA7QcvdHk70",
      thumbnail: "https://img.youtube.com/vi/YA7QcvdHk70/hqdefault.jpg"
    },
    {
      title: "セプテンバーさん - 音乃瀬奏（cover）",
      videoUrl: "https://youtu.be/OHQ-npgd2Ok",
      thumbnail: "https://img.youtube.com/vi/OHQ-npgd2Ok/hqdefault.jpg"
    },
    {
      title: "Beyond the way - 音乃瀬奏＆Mori Calliope（cover）",
      videoUrl: "https://youtu.be/bYZOxUX_iso",
      thumbnail: "https://img.youtube.com/vi/bYZOxUX_iso/hqdefault.jpg"
    },
    {
      title: "怪獣の花唄 - 音乃瀬奏（cover）",
      videoUrl: "https://youtu.be/lpa-OXAukNg",
      thumbnail: "https://img.youtube.com/vi/lpa-OXAukNg/hqdefault.jpg"
    }
  ];

  const visible = showAll ? featuredSongs : featuredSongs.slice(0, 4);

  return (
    <section>
      <h2 className="underline-title">歌ってみた一覧</h2>
      <div className="grid">
      {visible.map((song, index) => (
        <a
          href={song.videoUrl}
          target="_blank"
          rel="noreferrer"
          key={index}
          style={{ textDecoration: "none", color: "inherit" }}
        >
    <div className="card">
      <img src={song.thumbnail} alt="サムネイル" />
      <div className="card-content">
        <p>{song.title}</p>
        <span style={{ color: "#f4b400", fontWeight: "bold" }}>
          YouTubeで見る
        </span>
      </div>
    </div>
  </a>
))}
      </div>
      <div style={{ textAlign: "center", marginTop: "1rem" }}>
  <button
    onClick={() => setShowAll(!showAll)}
    style={{
      padding: "0.6rem 1.2rem",
      borderRadius: "999px",
      backgroundColor: "#f4b400",
      color: "white",
      fontWeight: "bold",
      border: "none",
      cursor: "pointer",
      transition: "transform 0.2s ease"
    }}
    onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
    onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
  >
    {showAll ? "表示を減らす" : "もっと見る"}
  </button>
</div>
    </section>
  );
}

// 🎵 メインApp
function App() {
  const [songs, setSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/songs.csv")
      .then((res) => res.text())
      .then((text) => {
        Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => setSongs(result.data),
        });
      });
  }, []);

  const filteredSongs = songs.filter((song) => {
    const keyword = searchTerm.toLowerCase();
    return (
      song.曲名?.toLowerCase().includes(keyword) ||
      song.歌手名?.toLowerCase().includes(keyword) ||
      song.配信日?.toLowerCase().includes(keyword)
    );
  });

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">
          <span className="strong">音乃瀬奏ちゃん</span>の歌検索
        </h1>
        <p className="subtitle">歌枠で歌った曲をかんたん検索！</p>
        <input
          className="search-box"
          type="text"
          placeholder="曲名・アーティスト名で検索"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </header>

      {/* 🎤 検索してないときにおすすめ表示 */}
      {!searchTerm && songs.length > 0 && (
        <>
          <p style={{ textAlign: "center", color: "#888" }}>
            検索欄に入力して、奏ちゃんの歌った曲を探してみてね！
          </p>
          <FeaturedSection />
          <div className="social-icons">
          <a href="https://youtube.com/@OtonoseKanade" target="_blank" rel="noreferrer">
          <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/youtube.svg" alt="YouTube" />
          </a>
          <a href="https://twitter.com/otonosekanade" target="_blank" rel="noreferrer">
          <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/x.svg" alt="X" />
          </a>
          <a href="https://open.spotify.com/intl-ja/artist/2i1mag1k6qyZmTXpeZ34l0?si=HkLrkeSxS22lTwdZp1_mYQ" target="_blank" rel="noreferrer">
          <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/spotify.svg" alt="Spotify" />
          </a>
          <a href="https://www.tiktok.com/@otonosekanade_regloss" target="_blank" rel="noreferrer">
          <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/tiktok.svg" alt="TikTok" />
          </a>
          </div>
        </>
      )}

      {!songs.length && <p style={{ textAlign: "center" }}>読み込み中...</p>}

      <div className="grid">
        {searchTerm &&
          filteredSongs.map((song, index) => {
            const videoId = extractVideoId(song.YouTubeリンク);
            const thumbnail = videoId
              ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
              : "";

              return (
                <a
                  href={song.YouTubeリンク}
                  target="_blank"
                  rel="noreferrer"
                  key={index}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="card">
                    {thumbnail && <img src={thumbnail} alt="サムネイル" />}
                    <div className="card-content">
                      <p><strong>曲名:</strong> {song.曲名}</p>
                      <p><strong>アーティスト:</strong> {song.歌手名}</p>
                      <p><strong>配信日:</strong> {song.配信日}</p>
                      <p><strong>タイトル:</strong> {song.配信タイトル}</p>
                      <p><strong>再生時間:</strong> {song.再生時間}</p>
                      <span className="youtube-button" style={{ color: "#f4b400", fontWeight: "bold" }}>
                        YouTubeで見る
                      </span>
                    </div>
                  </div>
                </a>
              );
          })}
      </div>

      <footer className="footer">© 2025 奏ちゃんデータベース</footer>
    </div>
  );
}

export default App;
