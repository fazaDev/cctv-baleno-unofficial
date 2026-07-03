# CCTV Monitoring Dashboard - Tol Bayung Lencir - Tempino - Jambi

Dashboard monitoring CCTV live untuk ruas Tol Bayung Lencir - Tempino - Jambi (Provinsi Jambi).

> Status: **Unofficial** | **LIVE**

## Fitur

- **Grid View** - Tampilan grid responsive (4 kolom desktop, 1 kolom mobile) dengan Video.js HLS player
- **Peta (Map View)** - Peta interaktif Leaflet dengan marker kamera dan popup play
- **Video Modal** - Pemutar video full-screen dari marker peta
- **Pencarian** - Filter kamera berdasarkan nama lokasi
- **Auto-refresh** - Timestamp update otomatis setiap 5 menit (WIB)
- **Status Online/Offline** - Indikator status kamera real-time
- **Dark Theme** - Tampilan gelap dengan aksen merah

## Tech Stack

| Teknologi | Versi |
|-----------|-------|
| React | 19.2.7 |
| Vite | 8.1.1 |
| Tailwind CSS | 4.3.2 |
| Leaflet | 1.9.4 |
| Video.js | 8.23.9 |

## Instalasi

```bash
npm install
npm run dev
```

## Script

| Command | Deskripsi |
|---------|-----------|
| `npm run dev` | Start dev server |
| `npm run build` | Build untuk production |
| `npm run preview` | Preview build production |
| `npm run lint` | Lint dengan oxlint |

## Struktur Project

```
src/
├── main.jsx              # Entry point
├── App.jsx               # Root component, state management
├── index.css             # Global styles + Tailwind theme
├── components/
│   ├── Header.jsx        # Header dengan search, toggle view, stats
│   ├── CCTVGrid.jsx      # Grid layout responsive
│   ├── CCTVCard.jsx      # Card kamera dengan Video.js player
│   ├── CCTVMap.jsx       # Peta Leaflet dengan marker
│   └── VideoModal.jsx    # Modal full-screen player
└── data/
    └── cctvData.js       # Data 18 kamera CCTV
```

## Data CCTV

- **Jumlah:** 18 kamera
- **Rute:** Tol Bayung Lencir - Tempino - Jambi
- **Status:** Semua online
- **Stream:** HLS (.m3u8)

## Lisensi

Project ini bersifat unofficial dan untuk keperluan monitoring.
