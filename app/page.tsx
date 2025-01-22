import TripsView from "@/components/trips/trips-view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dream Travels",
  description: "The place you dream of",
};

export default function Home() {
  return (
    <TripsView />
  );
}
