import {FC} from 'react';
import {Avatar, Box, CircularProgress} from "@mui/material";
import styles from "./profilePageStyles.ts"
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {Navigate} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import {formBodyStyles} from "../../components/Form/formStyles.ts";
import CustomMuiToFormikInput from "../../components/Form/CustomMuiToFormikInput.tsx";
import SubmitButton from "../../components/Form/SubmitButton.tsx";
import FormBody from "../../components/Form/FormBody.tsx";
import * as Yup from "yup";
import {IUserPassChangeData} from "../../types/authServerTypes.ts";
import Typography from "@mui/material/Typography";
import {changePasswordAction} from "../../store/authUserSlice.ts";

const initialValues: IUserPassChangeData = {
  new_password1: "",
  new_password2: "",
};

interface ProfilePageProps {
}

const ProfilePage: FC<ProfilePageProps> = () => {
  const {user, loading} = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const validationSchema = Yup.object({
    new_password1: Yup.string().required("Required").min(8, "Password must be at least 8 characters long")
        .test('has-number', 'Password must include at least one number', value => /\d/.test(value))
        .test('has-lowercase', 'Password must include at least one lowercase letter', value => /[a-z]/.test(value))
        .test('has-uppercase', 'Password must include at least one uppercase letter', value => /[A-Z]/.test(value))
        .test('has-special-character', 'Password must include at least one special character', value => /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(value)),
    new_password2: Yup.string().required("Required").oneOf([Yup.ref('new_password1')], 'Passwords must match')
  });

  const handleSubmit = ({new_password1, new_password2}: IUserPassChangeData) => {
    const data = {token: user!.token, input: {new_password1, new_password2}}
    dispatch(changePasswordAction(data));
  }

  if (!user) return <Navigate to={'/'}/>
  return (
      <Box sx={styles.mainContainer}>
        <Typography variant={"h4"} component={"h1"}>Profile</Typography>
        <Box sx={styles.container}>
          <Box sx={[styles.container_inner, styles.container_left]}>
            <Avatar variant="square" sx={styles.avatar} alt={user.username} src="/"/>
            <FormBody title={"Change password"}>
              <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
              >
                <Form style={formBodyStyles.form}>

                  <Field
                      type="password"
                      name="new_password1"
                      label="New password"
                      component={CustomMuiToFormikInput}
                  />

                  <Field
                      type="password"
                      name="new_password2"
                      label="Confirm new password"
                      component={CustomMuiToFormikInput}
                  />

                  {loading ? <CircularProgress/> : <SubmitButton text={"Change password"}/>}
                </Form>
              </Formik>
            </FormBody>
          </Box>

          <Box sx={styles.container_inner}>
            <Box sx={styles.container_text}>
              <Typography variant={"h6"} color={'project_color_gray.main'}>Username:</Typography>
              <Typography>{user.username}</Typography>
            </Box>

            <Box sx={styles.container_text}>
              <Typography variant={"h6"} color={'project_color_gray.main'}>Email:</Typography>
              <Typography>{user.email}</Typography>
            </Box>

            <Box sx={styles.container_text}>
              <Typography variant={"h6"} color={'project_color_gray.main'}>First Name:</Typography>
              <Typography>{user.first_name}</Typography>
            </Box>

            <Box sx={styles.container_text}>
              <Typography variant={"h6"} color={'project_color_gray.main'}>Last Name:</Typography>
              <Typography>{user.last_name}</Typography>
            </Box>
          </Box>
        </Box>
        <Box>
          <Typography>Password minimum 8 characters</Typography>
          <Typography>Password should include at least 1 number'</Typography>
          <Typography>Password should include at least 1 lowercase character</Typography>
          <Typography>Password should include at least 1 uppercase character</Typography>
          <Typography>Password should include at least 1 special character</Typography>
        </Box>
      </Box>
  )
};

export default ProfilePage;
