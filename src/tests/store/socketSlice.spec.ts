import reducer, {tweetsReceived, initialSocketState} from '../../store/socketSlice';

const tweets = [{tweetId: 't1'}] as Tweet[];

describe('socketSlice reducer', () => {
  it('returns the initial state by default', () => {
    expect(reducer(undefined, {type: 'unknown'})).toEqual(initialSocketState);
  });

  it('tweetsReceived replaces the tweets', () => {
    expect(reducer(initialSocketState, tweetsReceived(tweets))).toEqual({tweets});
  });
});
