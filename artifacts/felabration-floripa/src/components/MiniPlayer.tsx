import { useState } from "react";

const TRACKS = [
  "Zombie, Fela Kuti",
  "Water No Get Enemy, Fela Kuti",
  "Sorrow Tears and Blood, Fela Kuti",
  "Lady, Fela Kuti",
  "Expensive Shit, Fela Kuti",
  "Shuffering and Shmiling, Fela Kuti",
  "Afrobeat Floripa, DJ Shrine",
  "Ilha Groove, Batuke Coletivo",
];

export default function MiniPlayer() {
  const [playing, setPlaying] = useState(false);
  const [track, setTrack] = useState(0);

  const prev = () => setTrack((t) => (t - 1 + TRACKS.length) % TRACKS.length);
  const next = () => setTrack((t) => (t + 1) % TRACKS.length);

  return (
    <div className="mini-player" data-testid="mini-player">
      <div className="eq-bars">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`eq-bar ${playing ? "playing" : ""}`}
            style={{ animationDelay: `${i * 0.07}s` }}
          />
        ))}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: "0.65rem",
            color: "var(--fela-gold)",
            fontWeight: 700,
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            marginBottom: "2px",
          }}
        >
          {playing ? "▶ TOCANDO" : "◼ PARADO"}
        </div>
        <div
          style={{
            fontSize: "0.78rem",
            color: "var(--fela-white)",
            fontWeight: 500,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          data-testid="player-track-name"
        >
          {TRACKS[track]}
        </div>
      </div>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <button
          onClick={prev}
          data-testid="player-prev"
          style={{
            background: "none",
            border: "none",
            color: "var(--fela-muted)",
            cursor: "pointer",
            fontSize: "0.9rem",
            padding: "4px",
            transition: "color 0.2s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.color = "var(--fela-gold)")}
          onMouseOut={(e) => (e.currentTarget.style.color = "var(--fela-muted)")}
        >
          ⏮
        </button>
        <button
          onClick={() => setPlaying((p) => !p)}
          data-testid="player-play"
          style={{
            background: "var(--fela-gold)",
            border: "none",
            color: "#0A0A0A",
            cursor: "pointer",
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            fontSize: "0.85rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            transition: "transform 0.2s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          {playing ? "⏸" : "▶"}
        </button>
        <button
          onClick={next}
          data-testid="player-next"
          style={{
            background: "none",
            border: "none",
            color: "var(--fela-muted)",
            cursor: "pointer",
            fontSize: "0.9rem",
            padding: "4px",
            transition: "color 0.2s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.color = "var(--fela-gold)")}
          onMouseOut={(e) => (e.currentTarget.style.color = "var(--fela-muted)")}
        >
          ⏭
        </button>
      </div>
    </div>
  );
}
