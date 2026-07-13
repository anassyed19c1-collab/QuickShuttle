export interface CampusBuilding {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

// University of Karachi (KU) — real coordinates (via Google Places)
export const CAMPUS_BUILDINGS: CampusBuilding[] = [
  { id: "main-building", name: "Main Building", lat: 24.9389017, lng: 67.1237318 },
  { id: "mahmud-husain-library", name: "Dr. Mahmud Husain Library", lat: 24.9394623, lng: 67.1208563 },
  { id: "girls-hostel", name: "KU Girls Hostel", lat: 24.9356542, lng: 67.1234729 },
  { id: "pg-canteen", name: "PG Canteen", lat: 24.9396761, lng: 67.1198702 },
  { id: "staff-gate", name: "Staff Gate (Main Entrance)", lat: 24.9340103, lng: 67.1293345 },
  { id: "sociology-dept", name: "Department of Sociology", lat: 24.9378826, lng: 67.1221740 },
  { id: "hijri-gate", name: "Gulzar-e-Hijri Gate", lat: 24.9484820, lng: 67.1126153 },
];

// Default map center — University of Karachi (Main Building)
export const CAMPUS_CENTER: [number, number] = [24.9389017, 67.1237318];