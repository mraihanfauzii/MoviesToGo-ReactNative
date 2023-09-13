import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { FlatList, StyleSheet, Text, ScrollView } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { View } from "react-native";
import { FavouritesBar } from "../../../components/favourites/favourites-bar.component";
import { FavouritesContext } from "../../../services/favourites/favourites.context";
import { FadeInView } from "../../../components/animations/fade.animation";
import { StatusBar } from "expo-status-bar";
import { Colors } from "../constants/colors";
import { MovieGenreCard } from "../components/movie-genre-card.component";
import { MovieInfoCard } from "../components/movie-info-card.component";
import {
  getNowPlayingMovies,
  getUpcomingMovies,
  getAllGenres,
} from "../../../services/movie/movie.service";
import { ItemSeparator } from "../components/item-separator";

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;

const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const MoviesScreen = ({ navigation }) => {
  const [activeGenre, setActiveGenre] = useState("All");
  const [genres, setGenres] = useState([{ id: 10110, name: "All"}]);
  
  const [nowPlayingMovies, setNowPlayingMovies] = useState({});
  const [upcomingMovies, setUpcomingMovies] = useState({});
  const [filteredNowPlayingMovies, setFilteredNowPlayingMovies] = useState({});
  const [filteredUpcomingMovies, setFilteredUpcomingMovies] = useState({});

  useEffect(() => {
    getNowPlayingMovies().then((movieResponse) =>
      setNowPlayingMovies(movieResponse.data),
    );
    getUpcomingMovies().then((movieResponse) =>
      setUpcomingMovies(movieResponse.data),
    );
    getAllGenres().then((genreResponse) =>
      setGenres([...genres, ...genreResponse.data.genres]),
    );
  }, []);

  useEffect(() => {
    if (activeGenre === "All") {
      setFilteredNowPlayingMovies(nowPlayingMovies.results);
      setFilteredUpcomingMovies(upcomingMovies.results);
    } else {
      const filteredNowPlaying = nowPlayingMovies.results.filter(
        (movie) =>
          movie.genre_ids.includes(activeGenre.id) ||
          activeGenre.name === "All"
          
      );
      const filteredUpcoming = upcomingMovies.results.filter(
        (movie) =>
          movie.genre_ids.includes(activeGenre.id) ||
          activeGenre.name === "All"
      );
      setFilteredNowPlayingMovies(filteredNowPlaying);
      setFilteredUpcomingMovies(filteredUpcoming);
    }
  }, [activeGenre, nowPlayingMovies.results, upcomingMovies.results]);

  return (
    <ScrollView style={styles.container}>
      <StatusBar
        style="auto"
        translucent={false}
        backgroundColor={Colors.BASIC_BACKGROUND}
      />
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Now Playing</Text>
      </View>
      <View style={styles.genreListContainer}>
        <FlatList
          data={genres}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          renderItem={({ item }) => (
            <MovieGenreCard
              genreName={item.name}
              active={item.name === activeGenre.name}
              onPress={() => setActiveGenre(item)}
            />
          )}
        />
      </View>
      <View>
        <FlatList
          data={filteredNowPlayingMovies}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          renderItem={({ item }) => (
            <MovieInfoCard
              title={item.title}
              language={item.original_language}
              voteAverage={item.vote_average}
              voteCount={item.vote_count}
              poster={item.poster_path}
              heartLess={false}
              onPress={() =>
                navigation.navigate("MovieDetail", { movieId: item.id })
              }
            />
          )}
        />
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Coming Soon</Text>
      </View>
      <View>
        <FlatList
          data={filteredUpcomingMovies}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          renderItem={({ item }) => (
            <MovieInfoCard
              title={item.title}
              language={item.original_language}
              voteAverage={item.vote_average}
              voteCount={item.vote_count}
              poster={item.poster_path}
              size={0.6}
              onPress={() =>
                navigation.navigate("MovieDetail", { movieId: item.id })
              }
            />
          )}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BASIC_BACKGROUND,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 28,
  },
  headerSubTitle: {
    fontSize: 13,
    color: Colors.ACTIVE,
  },
  genreListContainer: {
    paddingVertical: 10,
  },
});
