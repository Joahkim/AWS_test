import React, { useState } from 'react';
import { NaverMap } from 'react-naver-maps';

const UsePoly = () => {
  const navermaps = window.naver.maps;

  const [poly, setPoly] = useState([]);
  const [hoverPoly, setHoverPoly] = useState([]);

  const handlePoly = input => {
    setPoly(input.coordinate.coordinates[0][0]);
  };
  const handleHoverPoly = input => {
    setHoverPoly(input.coordinate.coordinates[0][0]);
  };

  let polyCoordinate = [];
  let hoverPolyCoordinate = [];

  poly.forEach(data => {
    polyCoordinate.push(new navermaps.LatLng(data[1], data[0]));
  });
  hoverPoly.forEach(data => {
    hoverPolyCoordinate.push(new navermaps.LatLng(data[1], data[0]));
  });

  return { handlePoly, handleHoverPoly, polyCoordinate, hoverPolyCoordinate };
};

export default UsePoly;
