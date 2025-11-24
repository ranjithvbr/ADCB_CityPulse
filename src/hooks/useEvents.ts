import { useState } from 'react';
import { CityPulseEvent, fetchEvents } from '../services/api.ts';

export function useEvents() {
  const [events, setEvents] = useState<CityPulseEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (keyword: string, city: string) => {
    setLoading(true);
    setError(null);

    try {
      const all = await fetchEvents();

      const lowerKeyword = keyword.trim().toLowerCase();
      const lowerCity = city.trim().toLowerCase();

      const filtered = all.filter(ev => {
        const cityMatch = lowerCity
          ? ev.City.toLowerCase().includes(lowerCity)
          : true;

        const keywordMatch = lowerKeyword
          ? ev.Event.toLowerCase().includes(lowerKeyword) ||
          ev.CreatedBy.toLowerCase().includes(lowerKeyword)
          : true;

        return cityMatch && keywordMatch;
      });

      setEvents(filtered);
    } catch (e: any) {
      console.log(e);
      setError(e.message ?? 'Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  return { events, loading, error, search } as const;
}
