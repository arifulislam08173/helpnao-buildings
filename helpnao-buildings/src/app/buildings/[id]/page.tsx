import { buildings } from "@/data/mockData";
import BuildingDetailsPage from "@/views/BuildingDetails";

export function generateStaticParams() {
  return buildings.map((building) => ({
    id: building.id,
  }));
}

export default function Page() {
  return <BuildingDetailsPage />;
}