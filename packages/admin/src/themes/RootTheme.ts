import createTheme from '@material-ui/core/styles/createTheme';
import { PRIMARY_COLOR, SECONDARY_COLOR, WHITE_COLOR } from './colors';

import { DEFAULT_FONT_FAMILY, DEFAULT_FONT_SIZE } from './styles';

const theme = createTheme({
  typography: {
    fontFamily: [DEFAULT_FONT_FAMILY, 'sans-serif'].join(','),
    fontSize: DEFAULT_FONT_SIZE,
    h1: {
      fontSize: 44,
    },
    h2: {
      fontSize: 30,
    },
    subtitle1: {
      fontSize: 16,
    },
    subtitle2: {
      fontSize: 16,
    },
  },
  palette: {
    primary: {
      main: PRIMARY_COLOR,
    },
    secondary: {
      main: SECONDARY_COLOR,
    },
  },
  props: {
    MuiButton: {
      disableElevation: true,
      disableRipple: true,
    },
  },
  overrides: {
    MuiButton: {
      root: {
        minWidth: 'none',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: 14,
        borderRadius: 8,
        height: 45,
        textTransform: 'capitalize',
      },
      contained: {
        padding: '0 50px',
        color: WHITE_COLOR,
      },
      outlined: {
        padding: '0 50px',
      },
      // outlinedPrimary: {
      //   border: `2px solid ${KAIZEN_BLUE_LINK}`,
      //   '&:hover': {
      //     border: `2px solid ${KAIZEN_BLUE_LINK}`,
      //   },
      // },
      text: {
        padding: '0px',
      },
      textPrimary: {
        '&:hover': {
          'background-color': 'inherit',
        },
      },
    },
  },
});

export default theme;
