import {useAppDispatch, useAppSelector} from "../store/hooks.ts";
import {registerUserAction} from "../store/authUserSlice.ts";
import FormBody from "../components/Form/FormBody.tsx";
import * as Yup from "yup";
import {Field, Form, Formik} from "formik";
import CustomMuiToFormikInput from "../components/Form/CustomMuiToFormikInput.tsx";
import SubmitButton from "../components/Form/SubmitButton.tsx";
import {Link as RouterLink} from "react-router-dom";
import Link from '@mui/material/Link';
import {formBodyStyles} from "../components/Form/formStyles.ts";
import {CircularProgress} from "@mui/material";
import {IUserRegisterData} from "../types/serverTypes.ts";


const initialValues: IUserRegisterData = {
  email: "",
  password: "",
  password2: "",
  username: "",
  first_name: "",
  last_name: ""
};

const RegisterPage = () => {
  const {loading} = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const validationSchema = Yup.object({
    username: Yup.string().required("Required").min(1).max(150).matches(/^[\w.@+-]+$/, 'Letters, digits and @/./+/-/_ only'),
    first_name: Yup.string().max(150),
    last_name: Yup.string().max(150),
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().required("Required").min(8),
    password2: Yup.string().required("Required").min(8).oneOf([Yup.ref('password')], 'Passwords must match')
  });

  const handleSubmit = (formData: IUserRegisterData) => {
    dispatch(registerUserAction({...formData}));
  }

  return (
      <FormBody title={"Register"}>
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
          <Form style={formBodyStyles.form}>
            <Field
                name="username"
                label="User name"
                component={CustomMuiToFormikInput}
            />

            <Field
                name="first_name"
                label="First name"
                component={CustomMuiToFormikInput}
            />

            <Field
                name="last_name"
                label="Last name"
                component={CustomMuiToFormikInput}
            />

            <Field
                name="email"
                label="Email"
                component={CustomMuiToFormikInput}
            />

            <Field
                name="password"
                label="Password"
                type="password"
                component={CustomMuiToFormikInput}
            />

            <Field
                name="password2"
                label="Confirm password"
                type="password"
                component={CustomMuiToFormikInput}
            />

            {loading ? <CircularProgress/> : <SubmitButton text={"Login"}/>}

            <Link
                sx={formBodyStyles.link}
                component={RouterLink}
                to={"/"}
            >
              Have an account?
            </Link>
          </Form>
        </Formik>
      </FormBody>
  );
};

export default RegisterPage;
