import { StatusBar, SafeAreaView } from "react-native";
import styled from "styled-components/native";

//Jika status bar memiliki nilai maka margintop == status bard(khusus android)
export const SafeArea = styled(SafeAreaView)`
  flex: 1;
  ${StatusBar.currentHeight && `marginTop: ${StatusBar.currentHeight}px`};
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

console.log(StatusBar.currentHeight);
