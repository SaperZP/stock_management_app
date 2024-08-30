import {getSxStyles} from "../../utils/getSxStyles.ts";

const categoriesPageStyles = getSxStyles({
  container: {
    width: '100%',
    minHeight: '100px',
    display: "flex",
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: "center",
  },
  table: {
    minWidth: 650,
  },
  tableRow: {
    '&:last-child td, &:last-child th': {
      border: 0
    },
  },
});

export default categoriesPageStyles;
