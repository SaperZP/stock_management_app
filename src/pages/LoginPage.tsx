import {useAppDispatch} from "../store/hooks.ts";
import {loginUserAction} from "../store/authUserSlice.ts";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const loginHandler = () => {
    dispatch(loginUserAction({
      username: "appUser",
      email: "sma@example.com",
      password: "stringTest!33"
    }))
  }

  return (
      <div>
        LoginPage
        <button onClick={() => loginHandler()}>Login</button>
      </div>
  );
};

export default LoginPage;
