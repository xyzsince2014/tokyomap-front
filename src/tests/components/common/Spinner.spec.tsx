import {create} from 'react-test-renderer';

// in case of using enzyme
// import {configure} from 'enzyme';
// import * as EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17';

import Spinner from '../../../components/common/Spinner';

describe('Spinner component', () => {
  // in case of using enzyme
  // configure({
  //   adapter: new EnzymeAdapter(),
  //   disableLifecycleMethods: true,
  // });

  it('snapshot', () => {
    const tree = create(<Spinner />);
    expect(tree).toMatchSnapshot();
  });
});
