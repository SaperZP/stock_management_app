import {RouterProvider} from "react-router-dom";
import {useAppSelector} from "./store/hooks.ts";
import PrivateRouter from "./router/privateRouter.tsx";
import PublicRouter from "./router/publicRouter.tsx";
import {ThemeProvider} from "@mui/material";
import theme from "./theme.ts";


function App() {
  const {user} = useAppSelector(state => state.auth);

  return (
      <ThemeProvider theme={theme}>
        <RouterProvider router={user ? PrivateRouter : PublicRouter}/>
      </ThemeProvider>
  )
}

export default App
