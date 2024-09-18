import {Box, Card, CardContent, CircularProgress, Container, Grid, Stack} from "@mui/material";
import {PieChart} from "@mui/x-charts";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {useEffect} from "react";
import {getSalesAction} from "../../store/salesSlice.ts";
import {getPurchasesAction} from "../../store/purchasesSlice.ts";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Chart from "../../components/Cart/Chart.tsx";
import DashboardTable from "../../components/DashboardTable/DashboardTable.tsx";


const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const {sales, loading: salesLoading} = useAppSelector((state) => state.sales);
  const {purchases, loading: purchasesLoading} = useAppSelector((state) => state.purchases);
  const {user} = useAppSelector(state => state.auth);
  const salesGrandTotal = sales.reduce((total, sale) => (total + Number(sale.price_total)), 0);
  const purchasesGrandTotal = purchases.reduce((total, sale) => (total + Number(sale.price_total)), 0);
  const balance = salesGrandTotal - purchasesGrandTotal;
  const resourcesReady = !salesLoading && !purchasesLoading;

  const pieData = [
    {id: 0, value: purchasesGrandTotal, label: 'Purchases'},
    {id: 1, value: salesGrandTotal, label: 'Sales'},
  ]

  useEffect(() => {
    dispatch(getSalesAction(user!.token));
    dispatch(getPurchasesAction(user!.token));
  }, [dispatch, user]);


  const saleData = sales.map(sale => ({
    time: sale.time_hour,
    price: parseInt(sale.price_total)
  }))

  const purchasesData = purchases.map(p => ({
    time: p.time_hour,
    price: parseInt(p.price_total)
  }))


  const salesTableHeader = ['#', 'Product', 'Brand', 'Category', 'Price', 'Qty', 'Total Price']
  const purchasesTableHeader = ['#', 'Product', 'Firm', 'Brand', 'Category', 'Price', 'Qty', 'Total Price']

  return (
      <Box p={5}>
        {resourcesReady ?
            <Container maxWidth="xl">
              <Grid container spacing={5} mb={5}>
                <Grid item xs={12} lg={6}>
                  <Card>
                    <CardContent sx={{display: 'flex', justifyContent: 'center'}}>
                      <PieChart series={[{data: pieData}]} width={400} height={200}/>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Card sx={{height: '240'}}>
                    <CardContent>
                      <Stack direction="row" alignItems="center" justifyContent="space-between" p={2}>
                        <Typography variant="h5">Sales</Typography>
                        <Typography variant="h6" color="green">+${salesGrandTotal}</Typography>
                      </Stack>
                      <Stack direction="row" alignItems="center" justifyContent="space-between" p={2}>
                        <Typography variant="h5">Purchases</Typography>
                        <Typography variant="h6" color="error">-${purchasesGrandTotal}</Typography>

                      </Stack>
                      <Divider/>
                      <Stack direction="row" alignItems="center" justifyContent="space-between" p={2}>

                        <Typography variant="h5">Total</Typography>
                        <Typography variant="h6" color={balance < 0 ? "error" : "green"}>
                          {balance < 0 ? '-' : '+'}
                          ${Math.abs(balance).toFixed(2)}</Typography>
                      </Stack>


                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
              <Grid container spacing={5} mb={5}>
                <Grid item xs={12} lg={6}>
                  <Chart name="Sales" data={saleData}/>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <DashboardTable title="Recent Sales" header={salesTableHeader} data={sales}/>
                </Grid>
              </Grid>
              <Grid container spacing={5} mb={5}>
                <Grid item xs={12} lg={6}>
                  <Chart name="Purchases" data={purchasesData}/>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <DashboardTable title="Recent Purchases" header={purchasesTableHeader} data={purchases}/>
                </Grid>
              </Grid>
            </Container>
            : <CircularProgress color={"error"}/>}
      </Box>
  );
}

export default DashboardPage;
