import {useAppDispatch, useAppSelector} from "../store/hooks.ts";
import {loginUserAction} from "../store/authUserSlice.ts";
import FormBody from "../components/Form/FormBody.tsx";
import * as Yup from "yup";
import {Field, Form, Formik} from "formik";
import CustomMuiToFormikInput from "../components/Form/CustomMuiToFormikInput.tsx";
import SubmitButton from "../components/Form/SubmitButton.tsx";
import {Link as RouterLink} from "react-router-dom";
import Link from '@mui/material/Link';
import {formBodyStyles} from "../components/Form/formStyles.ts";
import {CircularProgress} from "@mui/material";


const initialValues = {email: "", password: ""};

const LoginPage = () => {
  const {loading} = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().required("Required").min(1),
  });

  const handleSubmit = ({email, password}: { email: string, password: string }) => {
    dispatch(loginUserAction({email, password}))
  }

  return (
      <FormBody title={"Login"}>
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
          <Form style={formBodyStyles.form}>
            <Field
                name="email"
                label="Email"
                component={CustomMuiToFormikInput}
            />

            <Field
                type="password"
                name="password"
                label="Password"
                component={CustomMuiToFormikInput}
            />

            {loading ? <CircularProgress/> : <SubmitButton text={"Login"}/>}

            <Link
                sx={formBodyStyles.link}
                component={RouterLink}
                to={"/register"}
            >
              Don't have an account?
            </Link>
          </Form>
        </Formik>
      </FormBody>
  );
};

export default LoginPage;
