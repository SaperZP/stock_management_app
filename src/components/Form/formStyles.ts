import {getSxStyles} from "../../utils/getSxStyles.ts";

export const formBodyStyles = getSxStyles({
  container: {
    width: "100%",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    padding: '50px',
    backgroundColor: 'rgb(255,255,255)',
    borderRadius: '10px',
  },

  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
  }
});

export const submitButtonStyles = getSxStyles({
  button: {}
});
