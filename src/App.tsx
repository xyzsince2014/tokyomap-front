import {useEffect} from 'react';
import {Navigate, Route, Routes, useLocation} from 'react-router';

import LeafletMap from './containers/LeafletMap/LeafletMap';
import Checkout from './containers/Checkout/Checkout';

const App: React.FC = () => {
  const {hash, pathname} = useLocation();

  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [hash, pathname]);

  return (
    <Routes>
      <Route path="/" element={<LeafletMap />} />
      <Route path="/checkout" element={<Checkout />} />
      {/* todo: <Route path="/users" element={<Users/>}><Route path=":id" element={<UserProfile/>}/></Route> */}
      <Route path="*" element={<Navigate to="/" replace />} />;
    </Routes>
  );
};
export default App;
