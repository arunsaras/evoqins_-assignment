// For Authentication flows, variable initialized
export const initialLoginState = {
  isLoading: true,
  userToken: null,
  userBoard: null,
};
// type
type LoginState = {
  isLoading: boolean;
  userToken: string | null;
  userBoard: string | null;
};
// type
type LoginAction =
  | {type: 'REGISTER'; token: string | null; userBoard: string | null}
  | {type: 'LOGIN'; id: any; token: string; userBoard: string}
  | {type: 'LOGOUT'}
  | {type: 'ONBOARD'; userBoard: string}
  | {type: 'SETLOADING'; isLoading: boolean};


// update the state using reducer
export const loginReducer = (
  prevState: LoginState,
  action: LoginAction,
): LoginState => {
  switch (action.type) {
    case 'SETLOADING':
      return {
        ...prevState,
        isLoading: action.isLoading,
      };
    case 'LOGIN':
      return {
        ...prevState,
        userToken: action.token,
        userBoard: action.userBoard,
        isLoading: false,
      };

    case 'LOGOUT':
      return {
        ...prevState,
        userToken: null,
        userBoard: prevState.userBoard,
        isLoading: false,
      };

    case 'REGISTER':
      return {
        ...prevState,
        userToken: action.token,
        userBoard: action.userBoard,
        isLoading: false,
      };
    case 'ONBOARD':
      return {
        ...prevState,
        userToken: prevState.userToken,
        isLoading: false,
        userBoard: action.userBoard,
      };

    default:
      return prevState;
  }
};
// credential regex
export const userNameRegex = /^(?![-_])[a-zA-Z0-9_-]{3,}(?<![-_])$/;
export const passcodeRegex = /^.{8,}$/;
