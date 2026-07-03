import { useRef, useEffect, useState, useCallback } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

export default function CCTVCard({ cam }) {
  const videoNodeRef = useRef(null);
  const playerRef = useRef(null);
  const [status, setStatus] = useState(cam.status);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!videoNodeRef.current || playerRef.current) return;

    const player = videojs(videoNodeRef.current, {
      controls: true,
      muted: true,
      autoplay: true,
      preload: "auto",
      fill: true,
      responsive: true,
      sources: [{ src: cam.stream, type: "application/x-mpegURL" }],
    });

    player.on("error", () => {
      setStatus("offline");
      setHasError(true);
    });

    playerRef.current = player;

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [cam.stream]);

  const handleRefresh = useCallback(() => {
    setHasError(false);
    setStatus(cam.status);

    if (playerRef.current) {
      playerRef.current.dispose();
      playerRef.current = null;
    }

    if (videoNodeRef.current) {
      videoNodeRef.current.removeAttribute("data-setup");
      videoNodeRef.current.innerHTML = "";
    }

    setTimeout(() => {
      if (!videoNodeRef.current) return;
      const player = videojs(videoNodeRef.current, {
        controls: true,
        muted: true,
        autoplay: true,
        preload: "auto",
        fill: true,
        responsive: true,
        sources: [{ src: cam.stream, type: "application/x-mpegURL" }],
      });
      player.on("error", () => {
        setStatus("offline");
        setHasError(true);
      });
      playerRef.current = player;
    }, 100);
  }, [cam.stream, cam.status]);

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-border transition-all duration-200 hover:-translate-y-0.5 hover:border-primary group">
      {hasError ? (
        <div className="w-full flex flex-col items-center justify-center bg-placeholder text-text-dim" style={{ aspectRatio: "4/3" }}>
          <i className="fas fa-video-slash text-3xl mb-2"></i>
          <span className="text-sm">Stream tidak tersedia</span>
          <button
            onClick={handleRefresh}
            className="mt-3 px-3 py-1 text-xs bg-accent rounded-md text-white hover:bg-primary transition-colors"
          >
            <i className="fas fa-redo mr-1"></i>Coba Lagi
          </button>
        </div>
      ) : (
        <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
          <video
            ref={videoNodeRef}
            className="video-js vjs-big-play-centered vjs-fill"
          />

          {/* Top overlay: Lokasi + Status */}
          <div className="absolute top-0 left-0 right-0 z-10 p-2 bg-gradient-to-b from-black/70 to-transparent pointer-events-none">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-1.5">
                <span
                  className={`w-2 h-2 rounded-full shrink-0 ${
                    status === "online" ? "bg-online" : "bg-offline"
                  }`}
                />
                <span className="text-[0.7rem] font-semibold text-white truncate max-w-[180px]">
                  {cam.nama_segment}
                </span>
              </div>
              <span className="text-[0.6rem] text-white/60 font-mono shrink-0">
                {cam.lat.toFixed(4)}, {cam.lon.toFixed(4)}
              </span>
            </div>
          </div>

          {/* Bottom overlay: Status badge */}
          <div className="absolute bottom-0 left-0 right-0 z-10 p-2 bg-gradient-to-t from-black/70 to-transparent pointer-events-none">
            <div className="flex justify-between items-end">
              <span
                className={`text-[0.6rem] font-bold px-1.5 py-0.5 rounded uppercase ${
                  status === "online"
                    ? "bg-online/20 text-online"
                    : "bg-offline/20 text-offline"
                }`}
              >
                {status}
              </span>
              <span className="text-[0.55rem] text-white/50">
                <i className="fas fa-video mr-1"></i>LIVE
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
