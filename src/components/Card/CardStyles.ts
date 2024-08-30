import {getSxStyles} from "../../utils/getSxStyles.ts";

const CardStyles = getSxStyles({
  card: {
    width: 250,
    position: 'relative',
    p: 2,
    '&:hover .child': {
      visibility: "visible",
    },
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
