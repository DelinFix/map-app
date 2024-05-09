import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export type Marker = {
  name: string
  coordinates: [number, number]
}

export interface IMarkersState {
  markers: Marker[]
}

const initialState: IMarkersState = {
  markers: []
};

export const markersSlice = createSlice({
  name: "markers",
  initialState,
  reducers: {
    setMarkers: (state, action: PayloadAction<Marker[]>) => {
      state.markers = action.payload
      return state
    },
    createMarker: (state, action: PayloadAction<{ name: string, coordinates: [number, number] }>) => {
      state.markers = [...state.markers, action.payload];
      localStorage.setItem('markers', JSON.stringify(state.markers))
      return state
    },
  },
});

export const { createMarker, setMarkers } =
  markersSlice.actions;

export default markersSlice.reducer;

