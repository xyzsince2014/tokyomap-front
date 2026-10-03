import * as L from 'leaflet';
import {Map, TileLayer, ZoomControl} from 'react-leaflet';

import CustomMarker from '../../containers/LeafletMap/CustomMarker';
import SignedInControls from './SignedInControls';
import SignedOutControls from './SignedOutControls';

export interface LeafletMapProps {
  tweets?: Tweet[];
  isAuthenticated?: boolean;
}

const LeafletMap: React.FC<LeafletMapProps> = ({
  tweets = [],
  isAuthenticated = false,
}) => (<>
    <Map
      className="l-leafletmap"
      center={[35.680722, 139.767271]}
      zoom={15}
      maxBounds={L.latLngBounds([35.2564493, 139.1532045], [35.8559256, 140.4057111])}
      zoomControl={false}
    >
      <TileLayer
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
      />
      <ZoomControl position="bottomright" />
      {tweets.map(t => (
        <CustomMarker key={`tweet_${t.tweetId}`} tweet={t} />
      ))}
    </Map>
    {isAuthenticated ? <SignedInControls /> : <SignedOutControls />}
  </>);

export default LeafletMap;
