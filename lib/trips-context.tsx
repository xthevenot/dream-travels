'use client'
import { createContext, Dispatch, useContext, useEffect, useReducer } from 'react';
import { Trip } from './endpoint';

const TripsContext = createContext<Trip[]>([]);
const TripsDispatchContext = createContext<Dispatch<any> | any>({});

function tripsReducer(trips: any, action: any) {
  switch (action.type) {
    case 'added': {
      return [...trips, action.trip];
    }
    case 'updated': {
      return trips.map((t: Trip) => {
        if (t.id === action.trip.id) {
          t = action.trip
        }
        return t;
      });
    }
    case 'changeStatus': {
      return trips.map((t: Trip) => {
        if (t.id === action.trip.id) {
          t.status = action.status;
        }
        return t;
      });
    }
    case 'updateRandom': {
      return trips.map((t: Trip) => {
        if (t.id === action.tripId) {
          t.randomStart = true;
        }
        return t;
      });
    }
    case 'randomStart': {
      return trips.map((t: Trip) => {
        if (t.id === action.tripId) {
          t.randomStart = true;
        }
        return t;
      });
    }
    case 'updateOriginalList': {
      return [...action.trips];
    }
    case 'deleted': {
      return trips.filter((t: Trip) => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

export function useTrips() {
  return useContext(TripsContext);
}

export function useTripsDispatch() {
  return useContext(TripsDispatchContext);
}

export function TripsProvider({ children }: { children: React.ReactNode }) {
  //Init the trips list with an empty array
  const [trips, dispatch] = useReducer(tripsReducer, null);
  //Using first "willMount" event, get the list of remote API data
  useEffect(() => {
    const fetchData = async () => {
      fetch('https://my-json-server.typicode.com/mariosanz92/dream-travels-data/travels')
        .then((response) => response.json())
        .then((json) => {
          //replace the original list
          dispatch({
            type: 'updateOriginalList',
            trips: json,
          });
        });
    }
    fetchData();
  }, []);

  return (
    <TripsContext.Provider value={trips}>
      <TripsDispatchContext.Provider value={dispatch}>
        {children}
      </TripsDispatchContext.Provider>
    </TripsContext.Provider>
  );
}

