import {FC} from 'react';
import {Box} from "@mui/material";
import styles from "./profilePageStyles.ts"

interface ProfilePageProps {
}

const ProfilePage: FC<ProfilePageProps> = () => (
    <Box sx={styles.box}>
      ProfilePage Component
    </Box>
);

export default ProfilePage;
