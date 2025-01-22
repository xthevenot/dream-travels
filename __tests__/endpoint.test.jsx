import { filterTrips, Trip, Itinerary } from '../lib/endpoint';

describe('filterTrips', () => {
    const mockTrips = [
        {
            id: 1,
            title: 'Trip to Spain',
            description: 'Explore Spanish culture.',
            photo_url: 'https://example.com/spain.jpg',
            introduction: 'From Madrid to Barcelona...',
            status: 'todo',
            itinerary: [
                { day: 1, location: 'Madrid', description: 'Visit the Prado Museum' },
                { day: 2, location: 'Barcelona', description: 'Explore Sagrada Familia' },
            ],
        },
        {
            id: 2,
            title: 'Trip to Japan',
            description: 'Experience the land of the rising sun.',
            photo_url: 'https://example.com/japan.jpg',
            introduction: 'From Tokyo to Kyoto...',
            status: 'done',
            itinerary: [
                { day: 1, location: 'Tokyo', description: 'Visit the Skytree' },
                { day: 2, location: 'Kyoto', description: 'See the Fushimi Inari Shrine' },
            ],
        },
    ];

    test('filters trips by pathname', async () => {
        const result = await filterTrips(mockTrips, '', '/upcoming');
        expect(result).toHaveLength(1);
        expect(result[0].title).toBe('Trip to Spain');

        const completedTrips = await filterTrips(mockTrips, '', '/completed');
        expect(completedTrips).toHaveLength(1);
        expect(completedTrips[0].title).toBe('Trip to Japan');

        const allTrips = await filterTrips(mockTrips, '', '/');
        expect(allTrips).toHaveLength(2);
    });

    test('filters trips by search input', async () => {
        const result = await filterTrips(mockTrips, 'Spain', '/');
        expect(result).toHaveLength(1);
        expect(result[0].title).toBe('Trip to Spain');

        const descriptionSearch = await filterTrips(mockTrips, 'rising sun', '/');
        expect(descriptionSearch).toHaveLength(1);
        expect(descriptionSearch[0].title).toBe('Trip to Japan');

        const itinerarySearch = await filterTrips(mockTrips, 'Sagrada Familia', '/');
        expect(itinerarySearch).toHaveLength(1);
        expect(itinerarySearch[0].title).toBe('Trip to Spain');
    });

    test('returns all trips if no filters are applied', async () => {
        const result = await filterTrips(mockTrips, '', '/');
        expect(result).toHaveLength(2);
    });

    test('handles no matches gracefully', async () => {
        const result = await filterTrips(mockTrips, 'Nonexistent', '/');
        expect(result).toHaveLength(0);
    });

    test('filters by both pathname and search input', async () => {
        const result = await filterTrips(mockTrips, 'Kyoto', '/completed');
        expect(result).toHaveLength(1);
        expect(result[0].title).toBe('Trip to Japan');

        const noMatch = await filterTrips(mockTrips, 'Madrid', '/completed');
        expect(noMatch).toHaveLength(0);
    });
});
