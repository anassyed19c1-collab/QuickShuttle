export interface CampusBuilding {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

// IBA Karachi — real coordinates (via Google Places)
export const CAMPUS_BUILDINGS: CampusBuilding[] = [
  { id: "main-campus", name: "Main Campus (University Enclave)", lat: 24.9407408, lng: 67.1155760 },
  { id: "city-campus", name: "City Campus (Garden/Saddar)", lat: 24.8669427, lng: 67.0256899 },
  { id: "boys-hostel", name: "IBA Boys Hostel", lat: 24.9363897, lng: 67.1105735 },
  { id: "girls-hostel", name: "IBA New Girls Hostel", lat: 24.9455672, lng: 67.1264895 },
  { id: "library", name: "Mian Abdullah Library", lat: 24.9408978, lng: 67.1151033 },
  { id: "student-centre", name: "Alumni Students' Centre (Gym/Sports)", lat: 24.9406339, lng: 67.1130414 },
  { id: "city-campus-cafe", name: "Aman Tower Cafe (City Campus)", lat: 24.8670826, lng: 67.0255920 },
];

// Default map center — IBA Main Campus (University Enclave)
export const CAMPUS_CENTER: [number, number] = [24.9407408, 67.1155760];
