import { useState, useEffect, useCallback, useMemo } from "react";
import Sidebar from "./components/Sidebar";
import CCTVGrid from "./components/CCTVGrid";
import CCTVMap from "./components/CCTVMap";
import VideoModal from "./components/VideoModal";
import { CCTV_DATA } from "./data/cctvData";

const REFRESH_INTERVAL = 5 * 60 * 1000;

export default function App() {
  const [currentView, setCurrentView] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [modalCamera, setModalCamera] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);
  const [updateTime, setUpdateTime] = useState(
    new Date().toLocaleTimeString("id-ID", { timeZone: "Asia/Jakarta" })
  );
  const [selectedCameras, setSelectedCameras] = useState(
    () => new Set(CCTV_DATA.slice(0, 6).map((c) => c.id))
  );

  const onlineCount = useMemo(
    () => CCTV_DATA.filter((c) => c.status === "online").length,
    []
  );

  const selectedCameraList = useMemo(
    () => CCTV_DATA.filter((c) => selectedCameras.has(c.id)),
    [selectedCameras]
  );

  const handleRefresh = useCallback(() => {
    setUpdateTime(
      new Date().toLocaleTimeString("id-ID", { timeZone: "Asia/Jakarta" })
    );
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
      setUpdateTime(
        new Date().toLocaleTimeString("id-ID", { timeZone: "Asia/Jakarta" })
      );
    }, REFRESH_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex bg-bg">
      <Sidebar
        cameras={CCTV_DATA}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCameras={selectedCameras}
        onSelectionChange={setSelectedCameras}
        currentView={currentView}
        onViewChange={setCurrentView}
        onRefresh={handleRefresh}
        onlineCount={onlineCount}
        totalCount={CCTV_DATA.length}
        updateTime={updateTime}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <main className="flex-1 min-w-0 p-4 md:p-6">
        {currentView === "grid" ? (
          <CCTVGrid
            cameras={selectedCameraList}
            allCameras={CCTV_DATA}
            selectedCameras={selectedCameras}
          />
        ) : (
          <div
            className="rounded-xl overflow-hidden border border-border"
            style={{ height: "calc(100vh - 48px)" }}
          >
            <CCTVMap
              cameras={selectedCameraList}
              onPlayModal={handleOpenModal}
            />
          </div>
        )}
      </main>

      {modalCamera && (
        <VideoModal cam={modalCamera} onClose={handleCloseModal} />
      )}
    </div>
  );
}
