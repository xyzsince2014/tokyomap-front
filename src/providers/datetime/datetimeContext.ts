import {createContext} from 'react';

interface IContext {
  datetime: string;
}

const Context = createContext<IContext>({} as IContext);

export default Context;
