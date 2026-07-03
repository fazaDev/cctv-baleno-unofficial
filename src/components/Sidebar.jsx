import { useState, useMemo } from "react";

export default function Sidebar({
  cameras,
  searchQuery,
  onSearchChange,
  selectedCameras,
  onSelectionChange,
  currentView,
  onViewChange,
  onRefresh,
  onlineCount,
  totalCount,
  updateTime,
  isOpen,
  onToggle,
}) {
  const [selectAll, setSelectAll] = useState(false);

  const filteredCameras = useMemo(() => {
    if (!searchQuery) return cameras;
    const q = searchQuery.toLowerCase();
    return cameras.filter((cam) =>
      cam.nama_segment.toLowerCase().includes(q)
    );
  }, [cameras, searchQuery]);

  const selectedCount = selectedCameras.size;

  const handleToggleCamera = (camId) => {
    const next = new Set(selectedCameras);
    if (next.has(camId)) {
      next.delete(camId);
    } else {
      next.add(camId);
    }
    onSelectionChange(next);
  };

  const handleSelectAll = () => {
    const allIds = new Set(filteredCameras.map((c) => c.id));
    onSelectionChange(allIds);
    setSelectAll(true);
  };

  const handleDeselectAll = () => {
    onSelectionChange(new Set());
    setSelectAll(false);
  };

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={onToggle}
        className="fixed top-4 left-4 z-[60] lg:hidden bg-surface border border-border rounded-lg p-2 text-text hover:bg-surface-hover transition-colors"
      >
        <i className={`fas ${isOpen ? "fa-times" : "fa-bars"} text-lg`}></i>
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[55] lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-surface border-r border-border z-[58] flex flex-col transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:z-auto`}
        style={{ width: "280px", minWidth: "280px" }}
      >
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2 mb-1">
            <i className="fas fa-video text-primary"></i>
            <h1 className="text-sm font-bold text-white">CCTV Monitoring</h1>
          </div>
          <div className="flex gap-1.5">
            <span className="bg-primary text-white text-[0.6rem] font-bold px-2 py-0.5 rounded-full">
              LIVE
            </span>
            <span className="bg-orange-500 text-white text-[0.6rem] font-bold px-2 py-0.5 rounded-full">
              Unofficial
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="px-4 py-3 border-b border-border">
          <div className="relative">
            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-text-dim text-xs"></i>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Cari lokasi..."
              className="w-full bg-bg border border-border rounded-lg pl-8 pr-3 py-2 text-xs text-text outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        {/* Select controls */}
        <div className="px-4 py-2 border-b border-border flex items-center justify-between">
          <span className="text-[0.65rem] text-text-muted">
            {selectedCount} / {cameras.length} aktif
          </span>
          <div className="flex gap-1">
            <button
              onClick={handleSelectAll}
              className="text-[0.6rem] px-2 py-1 rounded bg-accent text-white hover:bg-primary transition-colors"
            >
              All
            </button>
            <button
              onClick={handleDeselectAll}
              className="text-[0.6rem] px-2 py-1 rounded bg-surface-hover text-text-muted hover:bg-primary hover:text-white transition-colors"
            >
              None
            </button>
          </div>
        </div>

        {/* Camera checklist */}
        <div className="flex-1 overflow-y-auto sidebar-scroll">
          {filteredCameras.length === 0 ? (
            <div className="p-6 text-center text-text-dim text-xs">
              <i className="fas fa-search text-2xl mb-2 block"></i>
              Tidak ditemukan
            </div>
          ) : (
            filteredCameras.map((cam) => (
              <label
                key={cam.id}
                className="flex items-center gap-2.5 px-4 py-2.5 cursor-pointer hover:bg-surface-hover transition-colors border-b border-border/50"
              >
                <input
                  type="checkbox"
                  checked={selectedCameras.has(cam.id)}
                  onChange={() => handleToggleCamera(cam.id)}
                  className="accent-primary w-3.5 h-3.5 rounded"
                />
                <span
                  className={`w-2 h-2 rounded-full shrink-0 ${
                    cam.status === "online" ? "bg-online" : "bg-offline"
                  }`}
                />
                <span className="text-[0.7rem] text-text truncate leading-tight">
                  {cam.nama_segment}
                </span>
              </label>
            ))
          )}
        </div>

        {/* Footer controls */}
        <div className="border-t border-border p-4 space-y-3">
          {/* View toggle */}
          <div className="flex gap-1">
            <button
              onClick={() => onViewChange("grid")}
              className={`flex-1 px-3 py-2 rounded-lg text-xs flex items-center justify-center gap-1.5 border transition-all ${
                currentView === "grid"
                  ? "bg-primary border-primary text-white"
                  : "bg-bg border-border text-text hover:border-primary"
              }`}
            >
              <i className="fas fa-th"></i>
              Grid
            </button>
            <button
              onClick={() => onViewChange("map")}
              className={`flex-1 px-3 py-2 rounded-lg text-xs flex items-center justify-center gap-1.5 border transition-all ${
                currentView === "map"
                  ? "bg-primary border-primary text-white"
                  : "bg-bg border-border text-text hover:border-primary"
              }`}
            >
              <i className="fas fa-map"></i>
              Peta
            </button>
          </div>

          {/* Refresh */}
          <button
            onClick={onRefresh}
            className="w-full px-3 py-2 rounded-lg text-xs flex items-center justify-center gap-1.5 bg-accent border border-accent text-white hover:bg-primary hover:border-primary transition-all"
          >
            <i className="fas fa-sync-alt"></i>
            Refresh
          </button>

          {/* Stats */}
          <div className="space-y-1.5 text-[0.65rem] text-text-muted">
            <div className="flex items-center gap-1.5">
              <i className="fas fa-road w-4"></i>
              <span>Tol Bayung Lencir - Tempino - Jambi</span>
            </div>
            <div className="flex items-center gap-1.5">
              <i className="fas fa-camera w-4"></i>
              <span>{onlineCount} / {totalCount} Online</span>
            </div>
            <div className="flex items-center gap-1.5">
              <i className="fas fa-clock w-4"></i>
              <span>Update: {updateTime}</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
