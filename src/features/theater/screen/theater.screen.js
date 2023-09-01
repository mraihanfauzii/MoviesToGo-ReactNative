import React from "react";
import styled from "styled-components/native";
import { Searchbar } from "react-native-paper";
import { SafeAreaView, View, FlatList } from "react-native";
import { StatusBar } from "react-native";
import { Spacer } from "../../../components/spacer/spacer.component";
import { TheaterInfoCard } from "../components/theater-info-card.component";

console.log(StatusBar.currentHeight);

//Jika status bar memiliki nilai maka margintop == status bard(khusus android)
const SafeArea = styled(SafeAreaView)`
  flex: 1;
  ${StatusBar.currentHeight && `marginTop: ${StatusBar.currentHeight}px`};
`;

const SearchContainer = styled(View)`
  padding: ${(props) => props.theme.space[3]};
`;

const TheaterList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16
  }
})``;

export const TheatersScreen = () => (
  <SafeArea>
    <SearchContainer>
      <Searchbar />
    </SearchContainer>
      <TheaterList
        data={[{ name: 1 }, { name: 2 }, { name: 3 }, { name: 4 }]}
        renderItem={() => (
          <Spacer position="bottom" size="large">
            <TheaterInfoCard/>
          </Spacer>
          )}
        keyExtractor={(item) => item.name}
      />
  </SafeArea>
);
