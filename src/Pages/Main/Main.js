import React, { useEffect, useState } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Map from '../Map/Map';
import './Main.scss';

const Main = () => {
  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();

  const [dongData, setDongData] = useState([]);

  const url = location.search;

  useEffect(() => {
    fetch(`http://15.165.203.24:8000/regions${url}`)
      .then(res => res.json())
      .then(data => {
        setDongData(data.result);
      });
  }, [url]);

  const sortStore = storeName => {
    if (location.search.includes('application')) {
      const application = searchParams.get('application');
      setSearchParams({ store: `${storeName}`, application });
    } else {
      setSearchParams({ store: `${storeName}` });
    }
  };

  const sortApplication = appName => {
    if (location.search.includes('store')) {
      const store = searchParams.get('store');
      setSearchParams({ store, application: `${appName}` });
    } else {
      setSearchParams({ application: `${appName}` });
    }
  };
  const showAllStoreData = () => {
    location.search.includes('store', 'application') &&
      searchParams.delete('store', 'application');
    setSearchParams(searchParams);
  };

  const showAllAppData = () => {
    location.search.includes('application') &&
      searchParams.delete('application');
    setSearchParams(searchParams);
  };

  if (dongData.length === 0) return;

  return (
    <>
      <Header
        dongData={dongData}
        sortStore={sortStore}
        sortApplication={sortApplication}
        showAllAppData={showAllAppData}
        showAllStoreData={showAllStoreData}
      />
      <Map dongData={dongData} />
    </>
  );
};

export default Main;
