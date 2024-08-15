import { PaletteOptions } from '@mui/material/styles/createPalette';

declare module '@mui/material/styles' {
  interface Palette {
    project_color_gray: Palette['primary'];
  }
  interface PaletteOptions {
    project_color_gray?: PaletteOptions['primary'];
  }
}
