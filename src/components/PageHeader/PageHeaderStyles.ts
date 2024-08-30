import {getSxStyles} from "../../utils/getSxStyles.ts";

const PageHeaderStyles = getSxStyles({
  header: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    alignItems: 'center',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '30px',
  },
});
export default PageHeaderStyles;
