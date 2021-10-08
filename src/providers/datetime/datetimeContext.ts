import {createContext} from 'react';

interface IDatetimeContext {
  datetime: string;
}

const DatetimeContext = createContext<IDatetimeContext>({} as IDatetimeContext);

export default DatetimeContext;
