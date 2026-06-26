import { useEffect } from "react";

interface Artist {
  name: string;
  genre: string;
  img: string;
  bio: string;
  time: string;
  stage: string;
  day: string;
}

interface Props {
  artist: Artist | null;
  onClose: () => void;
}

export default function ArtistModal({ artist, onClose }: Props) {
  useEffect(() => {
    if (artist) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [artist]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className={`modal-overlay ${artist ? "open" : ""}`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      data-testid="artist-modal"
    >
      {artist && (
        <div className="modal-card">
          {/* Polaroid image */}
          <div style={{ position: "relative" }}>
            <img
              src={artist.img}
              alt={artist.name}
              style={{
                width: "100%",
                height: "280px",
                objectFit: "cover",
                filter: "contrast(1.15) saturate(0.8)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(20,20,20,0.9) 0%, transparent 50%)",
              }}
            />
            <button
              onClick={onClose}
              data-testid="modal-close"
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "rgba(0,0,0,0.7)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "var(--fela-white)",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                cursor: "pointer",
                fontSize: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ✕
            </button>
            <div
              style={{
                position: "absolute",
                bottom: "16px",
                left: "20px",
              }}
            >
              <span
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "2rem",
                  letterSpacing: "1px",
                  color: "var(--fela-white)",
                  display: "block",
                }}
              >
                {artist.name}
              </span>
              <span
                style={{
                  fontSize: "0.8rem",
                  color: "var(--fela-gold)",
                  fontWeight: 600,
                }}
              >
                {artist.genre}
              </span>
            </div>
          </div>
          <div style={{ padding: "24px" }}>
            <div
              style={{
                display: "flex",
                gap: "12px",
                marginBottom: "16px",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  padding: "6px 14px",
                  background: "rgba(255,215,0,0.1)",
                  border: "1px solid rgba(255,215,0,0.2)",
                  borderRadius: "50px",
                  color: "var(--fela-gold)",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                }}
              >
                🕐 {artist.time}
              </span>
              <span
                style={{
                  padding: "6px 14px",
                  background: "rgba(0,240,255,0.08)",
                  border: "1px solid rgba(0,240,255,0.15)",
                  borderRadius: "50px",
                  color: "var(--fela-cyan)",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                }}
              >
                {artist.stage}
              </span>
              <span
                style={{
                  padding: "6px 14px",
                  background: "rgba(230,57,43,0.1)",
                  border: "1px solid rgba(230,57,43,0.2)",
                  borderRadius: "50px",
                  color: "var(--fela-red)",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                }}
              >
                Dia {artist.day}
              </span>
            </div>
            <p style={{ color: "var(--fela-muted)", lineHeight: 1.7, fontSize: "0.95rem" }}>
              {artist.bio}
            </p>
            <div
              style={{
                marginTop: "20px",
                paddingTop: "16px",
                borderTop: "1px solid rgba(255,255,255,0.08)",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span style={{ color: "var(--fela-gold)", fontSize: "0.8rem", fontWeight: 600 }}>
                ENTRADA 100% GRATUITA • 23 · 24 · 25 OUT 2026 · FLORIANÓPOLIS
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
