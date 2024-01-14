import { createClient } from '@supabase/supabase-js'; // after installing the supabase-js package
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
// we import the getSpotifyToken function from the spotifyTokenRefresh.js file
import { getSpotifyToken } from '../spotifyTokenRefresh.js';

// This loads environment variables from .env.server file.
dotenv.config( { path: './.env.server' } );

// Supabase configuration and connection details.
const supaUrl = process.env.SUPA_URL;
const supaKey = process.env.SUPA_KEY;

// Create Supabase client.
const supabase = createClient(supaUrl, supaKey);

const model = {};

// a helper function that executes a query callback and returns the data or throws an error
// allows us to avoid repeating the same try/catch block in every model function
const getTrackInfo = async (uri) => {
  const response = await fetch(`https://api.spotify.com/v1/tracks/${uri}?market=US`, {
    method: 'GET',

    // we now call the getSpotifyToken function to get the token
    // which is either cached or gets refreshed (so to speak)
    headers: { 'Authorization': 'Bearer ' + await getSpotifyToken() },
  });
  // console.log('getTrackInfo response', response);
  const data = await response.json();
  // console.log('getTrackInfo data', data);
  return data;
}


const executeQuery = async (queryCallback) => {
  // console.log('executeQuery');
  const { data, error } = await queryCallback(supabase);
  if (error) throw error;
  if (data.length === 0) return [];

  return data;
};

// Consolidated queries down into object of "basic queries" to be change upon project reqs changing
const queries = {
// now querying the Tracks table, rather than a view.
// can replicate this with artists and albums.
getTop10Tracks: () => executeQuery((supabase) => {
  return supabase
    .from('tracks')
    .select('*')
    .order('playtime_ms', { ascending: false })
    .limit(10)
    .then(async (response) => {
      const tracks = response.data

      for (const track of tracks) {
        const update = {};

        if (!track.api_data_added) {
          const trackInfo = await getTrackInfo(track.uri);
          update.api_data_added = true;

          if (!track.audio_clip_url) {
            update.audio_clip_url = trackInfo.preview_url;
          }

          if (!track.image_url) {
            update.image_url = trackInfo.album.images[1].url;
          }

          if (!track.duration) {
            update.duration_ms = trackInfo.duration_ms;
          }

          if (!track.popularity) {
            update.popularity = trackInfo.popularity;
          }

          if (!track.explicit) {
            update.explicit = trackInfo.explicit;
          }
          // console.log('update', update);
          // Update the record in the database with the new values
          if (Object.keys(update).length > 0) {
            await supabase
              .from('tracks')
              .update(update)
              .eq('id', track.id);

            // Fetch the updated record from the database
            const updatedTrack = await supabase
              .from('tracks')
              .select('*')
              .eq('id', track.id)
              .single();

            // console.log('updatedTrack', updatedTrack);

            // Replace the track in the tracks array with the updated track
            const index = tracks.findIndex(t => t.id === track.id);
            tracks[index] = updatedTrack.data;
            // console.log('tracks updated at index', index, tracks);
          }
        }
      }
      console.log('tracks being returned by model to topTenTrackSlice', tracks);
      return tracks;
    });
}),

  getTop10Artists: () => executeQuery(async (supabase) => supabase
    .from('artists')
    .select('*')
    .neq('playtime_ms', 0)
    .order('playtime_ms', { ascending: false })
    .limit(10)
  ),

  getTop10Albums: () => executeQuery(async (supabase) => supabase
    .from('albums')
    .select('*')
    .neq('playtime_ms', 0)
    .order('playtime_ms', { ascending: false })
    .limit(10)
  ),

  get10Sessions: () => executeQuery(async (supabase) => supabase
    .from('sessions')
    .select('artist, track, album, country, dt_added, timefn')
    .limit(10)
  ),
  getFields: () => executeQuery(async (supabase) => supabase
    .from('sessions')
    .select('*')
    .limit(1)
  ),
  //Ross added this to set up a route for front end slider to get tracks by year. commented out part of the query just to test as this query
  //keeps timing out. trying to join the sessions table on sessions.track_id = tracks.id and pull in the sessions.ts field to filter by year
  //downstream
  getTop10TracksByYear: () => executeQuery(async (supabase) => supabase
    .from('tracks')
    .select(`
      name,
      artist_name,
      album_name,
      playtime_ms,
      sessions (
        ts,
        track_id
        )
    `)
    .order('playtime_ms', { ascending: false })
    .limit(100)
    ).then(tracks => tracks)
    //   .then(async tracks => {
    //   for (const track of tracks) {
    //     const trackInfo = await getTrackInfo(track.uri);
    //     track.preview = trackInfo.preview_url;
    //     track.albumImage = trackInfo.album.images[1].url;
    //     track.duration = trackInfo.duration_ms;
    //     track.popularity = trackInfo.popularity;
    //     track.explicit = trackInfo.explicit;
    //   }
    //   return tracks;
    // })
};


export { queries };
