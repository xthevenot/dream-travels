import { ShimmerDiv, ShimmerText, ShimmerTitle } from "shimmer-effects-react";

export default function Loading() {
    const fakeTrips = [
        { id: 1, url: "fake", name: "fake", description: "fake" },
        { id: 2, url: "fake", name: "fake", description: "fake" },
        { id: 3, url: "fake", name: "fake", description: "fake" },
        { id: 4, url: "fake", name: "fake", description: "fake" },
    ]
    return <div title="Loading trips" className="max-w-6xl mx-auto space-y-6">
        <ul>
            {
                fakeTrips.map((trip) => (
                    <div
                        key={trip.id}
                        className="bg-white shadow-md rounded-lg flex overflow-hidden mb-3"
                    >
                        <ShimmerDiv mode="light" height={250} width={380} />

                        <div className="p-4 flex flex-col justify-between w-2/3">
                            <div>
                                <ShimmerTitle mode="light" line={1} width={100} />
                                <ShimmerText mode="light" line={10} gap={6} />
                            </div>
                            <div className="flex justify-between text-sm text-blue-500">
                                <ShimmerText mode="light" line={1} gap={6} width={200} />
                                <div className="space-x-4">
                                    <ShimmerText mode="light" line={1} gap={6} width={200} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </ul>
    </div>;
}