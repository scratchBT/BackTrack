import React, { useEffect, useState } from 'react';
import { fetchTopTracksByYear } from '../features/slice.js';
import { useDispatch, useSelector } from 'react-redux';

const TopTracksByYearComp = () => {
  const [year, setYear] = useState(2009);
  const dispatch = useDispatch();

  const { data: topTracksByYear, status } = useSelector(state => state.topTracksByYear);

  console.log('topTrackByYearComp tracks', topTracksByYear);
  console.log('topTrackByYearComp status', status);
  function handleSliderInput(e) {
    setYear(e.target.value);
  }

  function handleClick() {
    console.log('year', year);
    // dispatch(fetchTopTracksByYear(`?year=${year}`));
    dispatch(fetchTopTracksByYear({path: `?year=${year}`, arg: year}));
  }

  return (
    <>
    <div className="sliderContainer">
      <input type="range" min="2009" max="2024" className="slider" name='slider' onChange={(e) => handleSliderInput(e)}/>
      <button className='sliderButton' onMouseUp={handleClick}><b>{year}</b></button>
    </div>
    {/* giving each result its own key, set to its index in the array */}
    {topTracksByYear.map((track, index) => {return <div key={index}>{track.name}</div>})}
    </>
  );
}

export default TopTracksByYearComp;
