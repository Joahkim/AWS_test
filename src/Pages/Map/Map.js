import React, { useEffect, useState, useRef } from 'react';
import './Map.scss';

import {
  RenderAfterNavermapsLoaded,
  NaverMap,
  Marker,
  Polyline,
  Polygon,
} from 'react-naver-maps';

function NaverMapAPI() {
  const navermaps = window.naver.maps;
  const mapRef = useRef(null);

  const [dongData, setDongData] = useState([]);

  useEffect(() => {
    fetch(
      'http://10.110.131.18:8000/regions?store=B매장&application=배달의민족'
    )
      .then(res => res.json())
      .then(data => {
        setDongData(data.result);
      });
  }, []);

  // ?store=A매장
  // &application=요기요

  if (dongData.length === 0) return;

  const getCoordinates = dongData[0].coordinate.coordinates;

  const getPath = getCoordinates[0][0];

  let newpaths = [];

  getPath.forEach(coordinate => {
    newpaths.push(new navermaps.LatLng(coordinate[1], coordinate[0]));
  });

  if (newpaths.length === 0) return;

  return (
    <NaverMap
      id="react-naver-maps-introduction"
      style={{ width: '100%', height: '90vh', borderTop: 'transparent' }}
      defaultCenter={{ lat: 37.497175, lng: 127.027926 }}
      defaultZoom={13}
      ref={mapRef}
    >
      {dongData.map(input => (
        <Marker
          key={input.regions_code}
          position={
            new navermaps.LatLng(input.x_coordinate, input.y_coordinate)
          }
          animation={2}
          icon={{
            content: `<div class="markerBox">
            <h1 class="markerCountText">${input.count}</h1>
            <p class="markerText">${input.ub_myeon_dong}</p>
            </div>`,
          }}
        />
      ))}
      <Polyline
        clickable={true}
        strokeColor="rgb(17, 135, 207)"
        strokeStyle="solid"
        strokeWeight={2}
        path={newpaths}
      />
      <Polygon
        fillColor="rgb(17, 135, 207)"
        fillOpacity={0.35}
        clickable={true}
        paths={newpaths}
      />
    </NaverMap>
  );
}

const Map = () => {
  return (
    <RenderAfterNavermapsLoaded
      ncpClientId="n5yxltth29"
      error={<p>Maps Load Error</p>}
      loading={<p>Maps Loading...</p>}
    >
      <NaverMapAPI />
    </RenderAfterNavermapsLoaded>
  );
};

export default Map;
