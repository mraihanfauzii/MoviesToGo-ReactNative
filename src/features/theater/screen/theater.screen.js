import React, { useContext, useState } from "react";
import styled from "styled-components/native";
import { ActivityIndicator } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { Spacer } from "../../../components/spacer/spacer.component";
import { TheaterInfoCard } from "../components/theater-info-card.component";
import { SafeArea } from "../../../components/utility/safe-area.components";
import { TheatersContext } from "../../../services/theater/theater.context";
import { Search } from "../components/search.component";
import { FavouritesBar } from "../../../components/favourites/favourites-bar.component";
import { FavouritesContext } from "../../../services/favourites/favourites.context";
import { TheaterList } from "../components/theater-list.style";
import { FadeInView } from "../../../components/animations/fade.animation";

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
  const { favourites } = useContext(FavouritesContext);
  const [isToggled, setIsToggled] = useState(false);

  return (
    <SafeArea>
      <FadeInView></FadeInView>
      {isLoading && (
        <LoadingContainer>
          <Loading size={50} animating={true} />
        </LoadingContainer>
      )}
      <Search
        isFavouritesToggled={isToggled}
        onFavouritesToggle={() => setIsToggled(!isToggled)}
      />
      {isToggled && (
        <FavouritesBar
          favourites={favourites}
          onNavigate={navigation.navigate}
        />
      )}
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
                <FadeInView>
                  <TheaterInfoCard theater={item} />
                </FadeInView>
              </Spacer>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.name}
      />
    </SafeArea>
  );
};
