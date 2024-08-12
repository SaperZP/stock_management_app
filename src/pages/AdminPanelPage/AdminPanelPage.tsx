import { FC } from 'react';
import styles from './adminPanelPageStyles.ts';
import {Box} from "@mui/material";

interface AdminPanelPageProps {}

const AdminPanelPage: FC<AdminPanelPageProps> = () => (
 <Box sx={styles.box}>
    AdminPanelPage Component
 </Box>
);

export default AdminPanelPage;
