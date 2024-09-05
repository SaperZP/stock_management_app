import {getSxStyles} from "../../utils/getSxStyles.ts";
import {red} from "@mui/material/colors";

const CardStyles = getSxStyles({
  card: {
    width: 250,
    position: 'relative',
    p: 2,
    '&:hover .child': {
      visibility: "visible",
    },
    border: '3px solid transparent',
  },
  cardActive: {
    borderColor: red[900],
  },
  buttonsGroup: {
    visibility: "hidden",
    position: 'absolute',
    top: 0,
    right: 0,
  },
  image: {
    height: 140,
    objectFit: "contain",
  },
});

export default CardStyles;
