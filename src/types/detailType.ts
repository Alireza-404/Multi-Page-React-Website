export interface DetailConversionsType {
  date: string;
  conversion: number;
}

export interface DetailsDataType {
  id: number;
  pageTitle: string;
  status: "Online" | "Offline";
  users: number;
  eventCount: number;
  viewsPerUser: number;
  averageTime: string;
  dailyConversions: DetailConversionsType[];
  isChecked: boolean;
}
