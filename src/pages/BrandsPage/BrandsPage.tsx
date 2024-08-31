import styles from './brandsPageStyled.ts';
import {Box} from "@mui/material";
import CustomCard from "../../components/Card/CustomCard.tsx";
import {cardData} from "../../components/Card/dummyData.ts";
import PageHeader from "../../components/PageHeader/PageHeader.tsx";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";


const BrandsPage = () => {
  const dispatch = useAppDispatch();
  // const {categories, loading} = useAppSelector(state => state.categories);
  const {formShape, submittedModalData} = useAppSelector(state => state.modal);
  const {user} = useAppSelector(state => state.auth);

  return (
      <>
        <PageHeader
            title='Brands'
            buttonText="Add new brand"
            onClick={() => {
            }}
        />

        <Box sx={styles.brands}>
          {cardData.map((brand) =>
              <CustomCard
                  id={brand.id}
                  name={brand.name}
                  image={brand.image}
                  key={brand.id}
                  onEdit={() => {
                  }}
                  onDelete={() => {
                  }}
              />
          )}
        </Box>
      </>
  )
};

export default BrandsPage;
