import {createContext} from 'react';

// carries just the current datetime string; a primitive, so consumers never re-render on
// a new object reference (no need to memoise the provider value)
const DatetimeContext = createContext<string>('');

export default DatetimeContext;
