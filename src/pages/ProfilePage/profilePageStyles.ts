import {getSxStyles} from "../../utils/getSxStyles.ts";

const profilePageStyles = getSxStyles({
  mainContainer: {
    padding: '30px',
    backgroundColor: 'white',
    borderRadius: '20px',
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },
  container_inner: {
    minWidth: '400px',
    display: "flex",
    flexDirection: "column",
    flex: 1,
    padding: "10px",
  },
  container_left: {
    alignItems: "center",
  },
  avatar: {
    width: '150px',
    height: '150px',
  },
  container_text: {
    display: "flex",
    justifyContent: "space-between",
  },
});

export default profilePageStyles;
