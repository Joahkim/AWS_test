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
    fetch('/data/dong.json')
      .then(res => res.json())
      .then(data => {
        setDongData(data);
      });
  }, []);

  if (dongData.length === 0) return;

  return (
    <NaverMap
      id="react-naver-maps-introduction"
      style={{ width: '100%', height: '90vh', borderTop: 'transparent' }}
      defaultCenter={{ lat: 37.497175, lng: 127.027926 }}
      defaultZoom={14}
      ref={mapRef}
    >
      {dongData.map(input => (
        <Marker
          key={input.code}
          position={new navermaps.LatLng(input.lat, input.lng)}
          animation={2}
          icon={{
            content: `<div class="markerBox">
            <h1 class="markerCountText">160</h1>
            <p class="markerText">${input.dong}</p>
            </div>`,
          }}
        />
      ))}

      <Polyline
        clickable={true}
        strokeColor="blue"
        strokeStyle="solid"
        strokeWeight={1}
        path={[
          new navermaps.LatLng(37.359924641705476, 127.1148204803467),
          new navermaps.LatLng(37.36343797188166, 127.11486339569092),
          new navermaps.LatLng(37.368520071054576, 127.11473464965819),
          new navermaps.LatLng(37.3685882848096, 127.1088123321533),
          new navermaps.LatLng(37.37295383612657, 127.10876941680907),
          new navermaps.LatLng(37.38001321351567, 127.11851119995116),
          new navermaps.LatLng(37.378546827477855, 127.11984157562254),
          new navermaps.LatLng(37.376637072444105, 127.12052822113036),
          new navermaps.LatLng(37.37530703574853, 127.12190151214598),
          new navermaps.LatLng(37.371657839593894, 127.11645126342773),
          new navermaps.LatLng(37.36855417793982, 127.1207857131958),
        ]}
      />
      <Polygon
        fillColor="salmon"
        fillOpacity={0.35}
        clickable={true}
        paths={[
          new navermaps.LatLng(37.359924641705476, 127.1148204803467),
          new navermaps.LatLng(37.36343797188166, 127.11486339569092),
          new navermaps.LatLng(37.368520071054576, 127.11473464965819),
          new navermaps.LatLng(37.3685882848096, 127.1088123321533),
          new navermaps.LatLng(37.37295383612657, 127.10876941680907),
          new navermaps.LatLng(37.38001321351567, 127.11851119995116),
          new navermaps.LatLng(37.378546827477855, 127.11984157562254),
          new navermaps.LatLng(37.376637072444105, 127.12052822113036),
          new navermaps.LatLng(37.37530703574853, 127.12190151214598),
          new navermaps.LatLng(37.371657839593894, 127.11645126342773),
          new navermaps.LatLng(37.36855417793982, 127.1207857131958),
        ]}
      />
    </NaverMap>
  );
}

const Map = () => {
  return <div>안녕하세요</div>;
};

export default Map;
