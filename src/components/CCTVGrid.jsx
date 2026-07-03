import CCTVCard from "./CCTVCard";

const MAX_ACTIVE_PLAYERS = 6;

export default function CCTVGrid({ cameras, selectedCameras }) {
  if (cameras.length === 0) {
    return (
      <div className="text-center py-20 text-text-dim">
        <i className="fas fa-video-slash text-5xl mb-4 block"></i>
        <p className="text-lg">Tidak ada CCTV yang dipilih</p>
        <p className="text-sm mt-2 text-text-dim/60">
          Centang kamera di sidebar untuk menampilkan
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4 max-xl:grid-cols-2 max-md:grid-cols-1">
      {cameras.map((cam, index) => (
        <div key={cam.id} className="min-w-0">
          <CCTVCard cam={cam} canPlay={index < MAX_ACTIVE_PLAYERS} />
        </div>
      ))}
    </div>
  );
}
