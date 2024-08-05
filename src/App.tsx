import {RouterProvider} from "react-router-dom";
import {useAppSelector} from "./store/hooks.ts";
import PrivateRouter from "./router/privateRouter.tsx";
import PublicRouter from "./router/publicRouter.tsx";


function App() {
  const {user} = useAppSelector(state => state.auth);
  let router;

  if (user) {
    router = PrivateRouter
  } else router = PublicRouter

  return (<RouterProvider router={router}/>)
}

export default App
