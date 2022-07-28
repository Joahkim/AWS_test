import React, { useEffect, useState, useRef } from 'react';
import usePolygon from '../../hooks/usePolygon';
import useInfoWindow from '../../hooks/useInfoWindow';
import InfoWindow from './InfoWindow';

import './Map.scss';

import {
  RenderAfterNavermapsLoaded,
  NaverMap,
  Marker,
  Polyline,
  Polygon,
} from 'react-naver-maps';

function NaverMapAPI({ dongData }) {
  const navermaps = window.naver.maps;
  const mapRef = useRef(null);

  const { onHoverPaths, handleHoverCoordinate } = usePolygon();

  const { handleInfoWindow, showInfoWindow, mouseOut } = useInfoWindow();

  return (
    <NaverMap
      id="react-naver-maps-introduction"
      style={{ width: '100%', height: '90vh', borderTop: 'transparent' }}
      defaultCenter={{ lat: 37.497175, lng: 127.027926 }}
      defaultZoom={13}
      ref={mapRef}
    >
      {dongData.map(input => (
        <>
          <Marker
            key={input.regions_code}
            position={
              new navermaps.LatLng(input.x_coordinate, input.y_coordinate)
            }
            icon={{
              content: `<div class="markerBox" >
            <h1 class="markerCountText">${input.total_count}</h1>
            <p class="markerText">${input.ub_myeon_dong}</p>
            </div>`,
            }}
            title={input.ub_myeon_dong}
            onMouseover={e => {
              handleHoverCoordinate(input);
              handleInfoWindow(e, input);
            }}
            onMouseout={mouseOut}
          />
          {showInfoWindow && (
            <InfoWindow showInfoWindow={showInfoWindow} mouseOut={mouseOut} />
          )}
        </>
      ))}
      <Polyline
        clickable={true}
        strokeColor="rgb(17, 135, 207)"
        strokeStyle="solid"
        strokeWeight={2}
        path={onHoverPaths}
      />
      <Polygon
        fillColor="rgb(17, 135, 207)"
        fillOpacity={0.35}
        clickable={true}
        paths={onHoverPaths}
      />
    </NaverMap>
  );
}

const Map = ({ dongData }) => {
  return (
    <RenderAfterNavermapsLoaded
      ncpClientId="n5yxltth29"
      error={<p>Maps Load Error</p>}
      loading={<p>Maps Loading...</p>}
    >
      <NaverMapAPI dongData={dongData} />
    </RenderAfterNavermapsLoaded>
  );
};

export default Map;
