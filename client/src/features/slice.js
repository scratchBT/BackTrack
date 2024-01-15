import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Spotify configuration and connection details.
// const spotifyToken = process.env.REACT_APP_SPOTIFY_TOKEN;
// console.log('spotifyToken', spotifyToken);

const initialState = {
  tracks: [],
  status: "idle",
  error: ""
};

const reducer = {}

// Keith 2024-01-14_03-28-PM: added in new Error and throwing the error below.
// should allow for site to still load even if the fetch request fails.
const fetchFn = (url) => createAsyncThunk(
  // 'tracks/fetchTopTen',
    async () => {
      try {
        const response = await fetch(`db/${url}`);
        if (!response.ok) {
          console.log('Response not okay:', await response.text());
          throw new Error(`Fetch request failed in in slice.js at endpoint ${url} via function ${url}`);
        }
        const data = await response.json()
        console.log('slice.js data.json', data);
        return data;
      } catch (err) {
        console.log(`Error occurred fetching url in slice.js: ${err}`);
        throw err;
      }
  }
);

const sliceFn = (url) => createSlice({
  name: url,
  initialState,
  reducers: {
  },

  extraReducers(builder) {
    builder
      .addCase(fetchFn(url).pending, (state, action) => {
        console.log(`statusPENDING for ${url} in slice.js`);
        state.status = "loading";
      })
      .addCase(fetchFn(url).fulfilled, (state, action) => {
        console.log(`status FULFILLED for ${url} in slice.js`);
        state.status = "succeeded"
        state.tracks = action.payload;
      })
      .addCase(fetchFn(url).rejected, (state, action) => {
        console.log(`status REJECTED for ${url} in slice.js`);
        state.status = "failed";
        state.error = action.error.message;
      })
  }
});

reducer.topTracks = sliceFn('topTracks').reducer
// reducer.top10Artists = sliceFn('/db/top10Artists', reducer.name)
// reducer.top10Albums = sliceFn('/db/top10Albums', reducer.name)
// reducer.topTracksByYear = sliceFn('/db/topTracksByYear', reducer.name)


export { reducer, fetchFn };
