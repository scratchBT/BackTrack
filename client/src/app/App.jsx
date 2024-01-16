import React from 'react'
import ReactDOM from 'react-dom/client';
import NavbarComp from '../components/NavbarComp.jsx';
import TopTracksComp from '../components/topTracksComp.jsx';
// import TopAlbum from '../components/TopAlbum.jsx';
import LogStateComp from '../components/LogStateComp.jsx';
import TopTracksByYearComp from '../components/TopTracksByYearComp.jsx';
import '../../styles/index.scss';

export function App() {

  return (
    <>
      <LogStateComp/>
      <NavbarComp/>
      <h3>Lets take a trip down memory lane</h3>
      <h1 className="gradientHeader">This is your all time favorites</h1>
      <div className="trackListAndAlbum">
      <TopTracksComp/>
      {/* <TopAlbum/> */}
      </div>
      <TopTracksByYearComp/>
    </>
  )
}

// This exports the entire file "App" or module.
export default App;
