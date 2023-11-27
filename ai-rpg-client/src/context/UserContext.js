import { createContext, useContext, useReducer } from 'react';

const init = {
    user: {},
    isLoadingUser: true
}

const UserContext = createContext(null);

const UserDispatchContext = createContext(null);

export function UserProvider({ children }) {
  const [store, dispatch] = useReducer(
    reducer,
    init
  );

  return (
    <UserContext.Provider value={store}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}

export function useUserDispatch() {
  return useContext(UserDispatchContext);
}

function reducer(draft, payload) {
    switch(payload.action) {
        case 'beginLoad': {
            return {...draft, isLoadingUser: true};
        }
        case 'endLoad': {
            return {...draft, isLoadingUser: false};
        }
        case 'setAndEndLoad': {
            return {...draft, user: {...payload.user}, isLoadingUser: false};
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}