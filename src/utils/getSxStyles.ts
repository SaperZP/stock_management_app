import {SxProps, Theme} from '@mui/material';

export function getSxStyles<T extends Record<string, SxProps<Theme>>>(input: T) {
  // const output = {} as T;
  //
  // for (const key in input) {
  //   if (Object.prototype.hasOwnProperty.call(input, key)) {
  //     if (typeof input[key] === 'object' && input[key] !== null) {
  //       output[key] = {...input[key]};
  //     }
  //
  //     if (typeof input[key] === 'function' && input[key] !== null) {
  //       output[key] = input[key];
  //     }
  //   }
  // }
  // return output;

    return input;
}
