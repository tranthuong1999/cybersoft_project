import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle` 
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-size: 14px;
    font-weight: 400;
  }

  #root-admin{
    width: 100%;
    height:100%;
  }
`;

export default GlobalStyles;
