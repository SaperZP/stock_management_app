import {getSxStyles} from "../../../utils/getSxStyles.ts";

// export const publicLayoutStyles = getSxStyles({
//   container: {
//     height: '100vh',
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '50px',
//     backgroundColor: 'rgb(5,33,89)',
//     padding: '10px',
//   },
//   title: {
//     textAlign: 'center',
//     color: 'white',
//   },
//   wrapper: {
//     display: 'flex',
//     gap: '20px',
//   },
//   icon: (theme) => ({
//     width: '50%',
//     height: '500px',
//     display: 'none',
//     [theme.breakpoints.up('md')]: {
//       display: 'block',
//     },
//   }),
// });

export const publicLayoutStyles = getSxStyles({
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    gap: '50px',
    backgroundColor: 'rgb(5,33,89)',
    px: '50px',
  },
  title: {
    textAlign: 'center',
    color: 'white',
  },
  wrapper: {
    display: 'flex',
    gap: '20px',
  },
  icon: (theme) => ({
    width: '50%',
    height: '500px',
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  }),
});
