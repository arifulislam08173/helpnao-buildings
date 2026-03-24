import { buildings } from "@/data/mockData";
import FlatDetailsPage from "@/views/FlatDetails";

export function generateStaticParams() {
  return buildings.flatMap((building) =>
    building.flats.map((flat) => ({
      id: flat.id,
    }))
  );
}

export default function Page() {
  return <FlatDetailsPage />;
}