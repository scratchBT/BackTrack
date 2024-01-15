import React, {useEffect} from 'react';
import album from '../../assets/album.png';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTopTenTracks } from '../features/slice';

const TopAlbum = () => {
  // const dispatch = useDispatch();
  const tracks = useSelector((state) => state.topTenTracks.tracks);
  const status = useSelector((state) => state.topTenTracks.status);

  // useEffect(() => {
  //   // Dispatch the fetchTracks async thunk when the component mounts
  //   if (status === 'idle') {
  //     dispatch(fetchTopTenTracks());
  //   }

  // }, [dispatch, status]);

  return (
    <div className="topAlbum">
      <h3>MOST PLAYED ALBUM</h3>
      <div className="albumCard">
        <img src={album} alt="image" />
        <h4>{tracks[0]?.artist} <br /> {tracks[0]?.album}</h4>
      </div>
    </div>
  )
}

export default TopAlbum;
