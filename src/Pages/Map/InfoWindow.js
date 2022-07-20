import React from 'react';
import { NaverMap } from 'react-naver-maps';
import { Marker } from 'react-naver-maps';

import './InfoWindow.scss';

const InfoWindow = ({ showInfoWindow, mouseOut }) => {
  const navermaps = window.naver.maps;

  const { dong, pay, delivery } = showInfoWindow;

  const newPay = pay && pay.toLocaleString();

  return (
    <Marker
      icon={{
        content: `<div
            style={{
              display: showInfoWindow.display,
              position: 'absolute',
              top: 500,
              zIndex: '200',
            }}
            class="infoWindowContainer"
          >
          <div class="infoBox">
          <h2 class="infoTitle">${dong}</h2>
          <div class="infoText1">배달 매출 : ${newPay}₩</div>
          <div class="infoText2">배달 건수 : ${delivery}개</div>
          </div>
          </div>`,
      }}
      position={new navermaps.LatLng(showInfoWindow.y, showInfoWindow.x)}
      onMouseover={mouseOut}
    />
  );
};

export default InfoWindow;
