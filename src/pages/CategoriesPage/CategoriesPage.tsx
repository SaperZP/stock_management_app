import {FC, useEffect} from 'react';
import styles from './categoriesPageStyled.ts';
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {getCategoriesAction} from "../../store/categoriesSlice.ts";
import {Create, DeleteOutline} from "@mui/icons-material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from "@mui/material/IconButton";
import {Box, Button, CircularProgress} from "@mui/material";
import Typography from "@mui/material/Typography";

interface CategoriesPageProps {
}

const CategoriesPage: FC<CategoriesPageProps> = () => {
  const dispatch = useAppDispatch();
  const {categories, loading} = useAppSelector(state => state.categories);
  const {user} = useAppSelector(state => state.auth);

  useEffect(() => {
    dispatch(getCategoriesAction(user!.token))
  }, [dispatch, user]);


  return (
      <Box sx={styles.container}>
        {categories !== null && !loading ?
            <>
              <Box sx={styles.header}>
                <Typography variant={'h4'}>
                  Categories
                </Typography>
                <Button variant={"contained"}>
                  New Category
                </Button>
              </Box>
              <TableContainer component={Paper}>
                <Table sx={styles.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>#</TableCell>
                      <TableCell align="right">Name</TableCell>
                      <TableCell align="right">Number of Products</TableCell>
                      <TableCell align="right">Edit</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {categories.map(({id, name, product_count}) => (
                        <TableRow key={id} sx={styles.tableRow}>
                          <TableCell component="th" scope="row">
                            {id}
                          </TableCell>
                          <TableCell align="right">{name}</TableCell>
                          <TableCell align="right">{product_count}</TableCell>
                          <TableCell align="right">
                            <IconButton>
                              <Create color="info"/>
                            </IconButton>

                            <IconButton>
                              <DeleteOutline color="error"/>
                            </IconButton>
                          </TableCell>
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </> :
            <CircularProgress color={"error"}/>}
      </Box>
  )
};

export default CategoriesPage;

