// Define the types for countries and divisions
export type BangladeshDivisions =
  | "Dhaka"
  | "Chattogram"
  | "Khulna"
  | "Barishal"
  | "Rajshahi"
  | "Sylhet"
  | "Rangpur"
  | "Mymensingh";
export type IndiaStates =
  | "AndhraPradesh"
  | "ArunachalPradesh"
  | "Assam"
  | "Bihar"
  | "Chhattisgarh"
  | "Goa"
  | "Gujarat"
  | "Haryana"
  | "HimachalPradesh"
  | "Jharkhand"
  | "Karnataka"
  | "Kerala"
  | "MadhyaPradesh"
  | "Maharashtra"
  | "Manipur"
  | "Meghalaya"
  | "Mizoram"
  | "Nagaland"
  | "Odisha"
  | "Punjab"
  | "Rajasthan"
  | "Sikkim"
  | "TamilNadu"
  | "Telangana"
  | "Tripura"
  | "UttarPradesh"
  | "Uttarakhand"
  | "WestBengal";

export type Country = "Bangladesh" | "India";

export type ShippingRates = {
  Bangladesh: Record<BangladeshDivisions, number>;
  India: Record<IndiaStates, number>;
};


