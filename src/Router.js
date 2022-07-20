import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './Pages/Main/Main';

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Routers;
