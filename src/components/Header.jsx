export default function Header({
  searchQuery,
  onSearchChange,
  currentView,
  onViewChange,
  onRefresh,
  onlineCount,
  totalCount,
  updateTime,
}) {
  return (
    <header className="bg-gradient-to-br from-surface to-accent border-b-2 border-accent sticky top-0 z-50">
      <div className="px-5 md:px-8 py-4">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-lg md:text-xl font-semibold text-white flex items-center gap-2">
              <i className="fas fa-video"></i>
              CCTV Monitoring Dashboard
            </h1>
            <span className="bg-primary text-white text-[0.7rem] font-semibold px-3 py-1 rounded-full">
              LIVE
            </span>
            <span className="bg-orange-500 text-white text-[0.7rem] font-semibold px-3 py-1 rounded-full">
              Unofficial
            </span>
          </div>

          <div className="flex gap-2 items-center flex-wrap">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Cari nama lokasi..."
              className="bg-surface border border-border rounded-lg px-3 py-2 text-sm text-text outline-none focus:border-primary transition-colors w-48 max-sm:w-full"
            />
            <button
              onClick={() => onViewChange("grid")}
              className={`px-3 py-2 rounded-lg text-sm flex items-center gap-1.5 border transition-all ${
                currentView === "grid"
                  ? "bg-primary border-primary text-white"
                  : "bg-surface border-border text-text hover:border-primary"
              }`}
            >
              <i className="fas fa-th"></i>
              <span className="max-sm:hidden">Grid</span>
            </button>
            <button
              onClick={() => onViewChange("map")}
              className={`px-3 py-2 rounded-lg text-sm flex items-center gap-1.5 border transition-all ${
                currentView === "map"
                  ? "bg-primary border-primary text-white"
                  : "bg-surface border-border text-text hover:border-primary"
              }`}
            >
              <i className="fas fa-map"></i>
              <span className="max-sm:hidden">Peta</span>
            </button>
            <button
              onClick={onRefresh}
              className="px-3 py-2 rounded-lg text-sm flex items-center gap-1.5 bg-accent border border-accent text-white hover:bg-primary hover:border-primary transition-all"
            >
              <i className="fas fa-sync-alt"></i>
              <span className="max-sm:hidden">Refresh</span>
            </button>
          </div>
        </div>

        <div className="flex gap-5 mt-2 text-xs text-text-muted flex-wrap">
          <span className="flex items-center gap-1.5">
            <i className="fas fa-road"></i>
            Ruas: Bayung Lencir - Tempino - Jambi
          </span>
          <span className="flex items-center gap-1.5">
            <i className="fas fa-camera"></i>
            {onlineCount} / {totalCount} Online
          </span>
          <span className="flex items-center gap-1.5">
            <i className="fas fa-clock"></i>
            Update: {updateTime}
          </span>
          <span className="flex items-center gap-1.5">
            <i className="fas fa-info-circle"></i>
            Auto-refresh setiap 5 menit
          </span>
        </div>
      </div>
    </header>
  );
}
