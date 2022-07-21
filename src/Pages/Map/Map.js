import React from 'react';
import UsePoly from '../../hooks/UsePoly';
import {
  RenderAfterNavermapsLoaded,
  NaverMap,
  Marker,
  Polyline,
  Polygon,
  Circle,
} from 'react-naver-maps';
import './Map.scss';

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

function NaverMapAPI({ dongData }) {
  const navermaps = window.naver.maps;

  const { handleHoverPoly, hoverPolyCoordinate } = UsePoly();

  return (
    <NaverMap
      id="react-naver-maps-introduction"
      style={{ width: '100%', height: '90vh', borderTop: 'transparent' }}
      defaultCenter={{ lat: 37.497175, lng: 127.027926 }}
      defaultZoom={13}
    >
      {dongData.map(input => (
        <Marker
          key={input.regions_code}
          position={
            new navermaps.LatLng(input.x_coordinate, input.y_coordinate)
          }
          title={input.ub_myeon_dong}
          icon={{
            content: `<div class="markerBox">
            <h1 class="markerCountText">${input.total_count}</h1>
            <p class="markerText">${input.ub_myeon_dong}</p>
            </div>`,
          }}
          onMouseover={e => {
            handleHoverPoly(input);
          }}
        />
      ))}
      <Circle
        center={{ x: 127.027926, y: 37.497175 }}
        radius={100}
        fillOpacity={0.5}
        fillColor="#FF0000"
        strokeColor="red"
      />
      <Polyline
        clickable={true}
        strokeColor="rgb(17, 135, 207)"
        strokeStyle="solid"
        strokeWeight={2}
        path={hoverPolyCoordinate}
      />
      <Polygon
        fillColor="rgb(17, 135, 207)"
        fillOpacity={0.35}
        clickable={true}
        paths={hoverPolyCoordinate}
      />
    </NaverMap>
  );
}
export default Map;
