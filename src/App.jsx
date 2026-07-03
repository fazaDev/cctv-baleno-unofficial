import { useState, useEffect, useCallback, useMemo } from "react";
import Header from "./components/Header";
import CCTVGrid from "./components/CCTVGrid";
import CCTVMap from "./components/CCTVMap";
import VideoModal from "./components/VideoModal";
import { CCTV_DATA } from "./data/cctvData";

const REFRESH_INTERVAL = 5 * 60 * 1000;

export default function App() {
  const [currentView, setCurrentView] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [modalCamera, setModalCamera] = useState(null);
  const [updateTime, setUpdateTime] = useState(
    new Date().toLocaleTimeString("id-ID", { timeZone: "Asia/Jakarta" })
  );

  const filteredCameras = useMemo(() => {
    if (!searchQuery) return CCTV_DATA;
    const q = searchQuery.toLowerCase();
    return CCTV_DATA.filter((cam) =>
      cam.nama_segment.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const onlineCount = useMemo(
    () => CCTV_DATA.filter((c) => c.status === "online").length,
    []
  );

  const handleRefresh = useCallback(() => {
    setUpdateTime(new Date().toLocaleTimeString("id-ID", { timeZone: "Asia/Jakarta" }));
    window.location.reload();
  }, []);

  const handleOpenModal = useCallback((cam) => {
    setModalCamera(cam);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalCamera(null);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setUpdateTime(new Date().toLocaleTimeString("id-ID", { timeZone: "Asia/Jakarta" }));
    }, REFRESH_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        currentView={currentView}
        onViewChange={setCurrentView}
        onRefresh={handleRefresh}
        onlineCount={onlineCount}
        totalCount={CCTV_DATA.length}
        updateTime={updateTime}
      />

      <main className="flex-1 p-5 md:p-8">
        {currentView === "grid" ? (
          <CCTVGrid cameras={filteredCameras} />
        ) : (
          <div
            className="rounded-xl overflow-hidden border border-border"
            style={{ height: "calc(100vh - 160px)" }}
          >
            <CCTVMap cameras={CCTV_DATA} onPlayModal={handleOpenModal} />
          </div>
        )}
      </main>

      {modalCamera && (
        <VideoModal cam={modalCamera} onClose={handleCloseModal} />
      )}
    </div>
  );
}
