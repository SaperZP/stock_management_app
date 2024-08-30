import {FC} from 'react';
import styles from './brandsPageStyled.ts';
import {Box} from "@mui/material";
import CustomCard from "../../components/Card/CustomCard.tsx";
import {cardData} from "../../components/Card/dummyData.ts";
import PageHeader from "../../components/PageHeader/PageHeader.tsx";

interface BrandsPageProps {
}

const BrandsPage: FC<BrandsPageProps> = () => (
    <>
      <PageHeader
          title='Brands'
          buttonText="Add new brand"
          onClick={() => {
          }}
      />

      <Box sx={styles.brands}>
        {cardData.map((brand) => <CustomCard id={brand.id} name={brand.name} image={brand.image} key={brand.id}/>)}
      </Box>
    </>
);

export default BrandsPage;
