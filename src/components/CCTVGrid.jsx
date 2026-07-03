import CCTVCard from "./CCTVCard";

export default function CCTVGrid({ cameras }) {
  if (cameras.length === 0) {
    return (
      <div className="text-center py-20 text-text-dim">
        <i className="fas fa-search text-5xl mb-4 block"></i>
        <p>Tidak ditemukan CCTV yang sesuai</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
      {cameras.map((cam) => (
        <div key={cam.id} className="min-w-0">
          <CCTVCard cam={cam} />
        </div>
      ))}
    </div>
  );
}
