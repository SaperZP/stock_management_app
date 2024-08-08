import {useAppDispatch} from "../store/hooks.ts";
import {loginUserAction} from "../store/authUserSlice.ts";
import FormBody from "../components/Form/FormBody.tsx";
import * as Yup from "yup";
import {Field, Form, Formik} from "formik";
import CustomFormikInput from "../components/Form/CustomFormikInput.tsx";
import SubmitButton from "../components/Form/SubmitButton.tsx";
import {Link} from "react-router-dom";
import {formBodyStyles} from "../components/Form/formStyles.ts";

const initialValues = {email: "", password: ""};

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().required("Required").min(1),
  })

  const handleSubmit = () => {
    dispatch(loginUserAction({
      username: "appUser",
      email: "sma@example.com",
      password: "stringTest!33"
    }))
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
                component={CustomFormikInput}
            />

            <Field
                name="password"
                label="Password"
                component={CustomFormikInput}
            />

            <SubmitButton text={"Login"}/>

            <Link to={"/register"} className="text-yellow-500">
              Don't have an account?
            </Link>
          </Form>
        </Formik>
      </FormBody>
  );
};

export default LoginPage;
