import { configureStore } from "@reduxjs/toolkit";
import { reducer } from '../features/slice.js';
// import topTenTracksByYearReducer from '../features/topTenTracksByYearSlice.js';

export const store = configureStore({
  reducer: {
    topTracks: reducer.topTracks,
    // topTenTracksByYear: topTenTracksByYearReducer
  }
  // devTools: process.env.NODE_ENV !== 'production',
});


export default store;
