import createTheme from '@material-ui/core/styles/createTheme';
import { PRIMARY_COLOR } from './colors';

import { DEFAULT_FONT_FAMILY } from './styles';

const theme = createTheme({
  typography: {
    fontFamily: [DEFAULT_FONT_FAMILY, 'sans-serif'].join(','),
  },
  palette: {
    primary: {
      main: PRIMARY_COLOR,
    },
  },
});

export default theme;
