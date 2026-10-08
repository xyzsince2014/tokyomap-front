import {useEffect} from 'react';
import {Navigate, Route, Routes, useLocation} from 'react-router';

import LeafletMap from './containers/LeafletMap/LeafletMap';
import Checkout from './containers/Checkout/Checkout';

const App: React.FC = () => {
  // useLocation() returns {pathname, search, hash, state} of the current URL
  const {hash, pathname} = useLocation();

  // useEffect(callback, dependencies) runs the callback on mount and whenever a dependency changes
  // scroll to the top on every route change; skipped when the URL has a #hash so anchor jumps are left intact
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [hash, pathname]);

  return (
    <Routes>
      <Route path="/" element={<LeafletMap />} />
      <Route path="/checkout" element={<Checkout />} />
      {/* <Navigate to="/" replace /> redirects unknown paths to "/", replacing history. */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
export default App;
