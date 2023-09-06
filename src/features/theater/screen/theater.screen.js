import React, { useContext } from "react";
import styled from "styled-components/native";
import { ActivityIndicator } from "react-native-paper";
import { FlatList, TouchableOpacity } from "react-native";
import { Spacer } from "../../../components/spacer/spacer.component";
import { TheaterInfoCard } from "../components/theater-info-card.component";
import { SafeArea } from "../../../components/utility/safe-area.components";
import { TheatersContext } from "../../../services/theater/theater.context";
import { Search } from "../components/search.component";

const TheaterList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;

const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const TheatersScreen = ({ navigation }) => {
  const { isLoading, theaters } = useContext(TheatersContext);
  //console.log(error);
  return (
    <SafeArea>
      {isLoading && (
        <LoadingContainer>
          <Loading size={50} animating={true} />
        </LoadingContainer>
      )}
      <Search />
      <TheaterList
        data={theaters}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("TheaterDetail", {
                  theater: item,
                })
              }
            >
              <Spacer position="bottom" size="large">
                <TheaterInfoCard theater={item} />
              </Spacer>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.name}
      />
    </SafeArea>
  );
};
