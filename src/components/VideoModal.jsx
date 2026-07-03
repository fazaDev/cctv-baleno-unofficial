import { useRef, useEffect } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

export default function VideoModal({ cam, onClose }) {
  const videoNodeRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (!cam || !videoNodeRef.current || playerRef.current) return;

    const player = videojs(videoNodeRef.current, {
      controls: true,
      muted: false,
      autoplay: true,
      preload: "auto",
      fill: true,
      responsive: true,
      sources: [{ src: cam.stream, type: "application/x-mpegURL" }],
    });

    playerRef.current = player;

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [cam]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!cam) return null;

  return (
    <div
      className="fixed inset-0 bg-black/85 z-[200] flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-surface rounded-2xl w-full max-w-[900px] overflow-hidden border border-border">
        <div className="flex justify-between items-center px-5 py-4 border-b border-border">
          <h3 className="text-sm font-semibold text-white">{cam.nama_segment}</h3>
          <button
            onClick={onClose}
            className="text-text-muted text-2xl leading-none hover:text-primary transition-colors"
          >
            &times;
          </button>
        </div>

        <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
          <video
            ref={videoNodeRef}
            className="video-js vjs-big-play-centered vjs-fill"
          />
        </div>

        <div className="px-5 py-3 text-xs text-text-muted border-t border-border">
          Lat: {cam.lat} | Lon: {cam.lon}
        </div>
      </div>
    </div>
  );
}
