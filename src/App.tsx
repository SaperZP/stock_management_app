import {RouterProvider} from "react-router-dom";
import {useAppSelector} from "./store/hooks.ts";
import PrivateRouter from "./router/privateRouter.tsx";
import PublicRouter from "./router/publicRouter.tsx";
import {ThemeProvider} from "@mui/material";
import theme from "./theme.ts";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CssBaseline from "@mui/material/CssBaseline";


function App() {
  const {user} = useAppSelector(state => state.auth);

  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={user ? PrivateRouter : PublicRouter}/>
        <ToastContainer />
      </ThemeProvider>
  )
}

export default App
