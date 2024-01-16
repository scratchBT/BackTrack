import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Keith 2024-01-15_01-14-PM
// refactored this file to have helper helper fetch and slice functions
// that can be be resued for any slice. reduces code duplication.

const initialState = {
  data: [],
  year: 2020,
  status: "idle",
  error: "",
};

const sliceFn = (title) => {
  console.log('title in sliceFn:', title);
  const fetchFn = createAsyncThunk(
    `fetch/${title}`,
    async (arg) => {
      let url = `db/${title}`;
      if (arg && arg.path) {
        url = `db/${title}/${arg.path}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Fetch request failed at endpoint ${url}`);
      }
      const data = await response.json();
      return data;
    }
  );


  const slice = createSlice({
    name: title,
    initialState,
    reducers: {},
    extraReducers(builder) {
      builder
        .addCase(fetchFn.pending, (state, action) => {
          state.status = "loading";
        })
        .addCase(fetchFn.fulfilled, (state, action) => {
          state.status = "succeeded"
          state.data = action.payload;
          if (title === 'topTracksByYear') {
            state.year = action.meta.arg.year;
          }
        })
        .addCase(fetchFn.rejected, (state, action) => {
          console.log(`status REJECTED for ${title} in slice.js`);
          state.status = "failed";
          state.error = action.error.message;
        })
    }
  });
  // console.log('slice:', slice);
  // console.log('fetchFn:', fetchFn);
  return { slice, fetchFn };
}
const { slice: topTracksSlice, fetchFn: fetchTopTracks } = sliceFn('topTracks');
const { slice: topAlbumsSlice, fetchFn: fetchTopAlbums } = sliceFn('topAlbums');
const { slice: topArtistsSlice, fetchFn: fetchTopArtists } = sliceFn('topArtists');
const { slice: topTracksByYearSlice, fetchFn: fetchTopTracksByYear } = sliceFn('topTracksByYear');


export {
  fetchTopTracks,
  fetchTopAlbums,
  fetchTopArtists,
  fetchTopTracksByYear,
  topTracksSlice,
  topAlbumsSlice,
  topArtistsSlice,
  topTracksByYearSlice,
};
