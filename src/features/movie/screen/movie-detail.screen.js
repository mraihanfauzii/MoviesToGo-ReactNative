import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Colors } from "../constants/colors";
import {
  getMovieById,
  getPoster,
  getVideo,
  getLanguage
} from "../../../services/movie/movie.service";
import { ItemSeparator } from "../components/item-separator";
import { LinearGradient } from "expo-linear-gradient";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Feather, Ionicons } from "@expo/vector-icons";
import { APPEND_TO_RESPONSE as AR } from "../constants/url-tmdb";
import { CastInfoCard } from "../components/cast-info-card";

const { height, width } = Dimensions.get("screen");
const setHeight = (h) => (height / 100) * h;
const setWidth = (w) => (width / 100) * w;

export const MovieDetailScreen = ({ route, navigation }) => {
  const { movieId } = route.params;
  const [movie, setMovie] = useState({});
  const [isCastSelected, setIsCastSelected] = useState(true);

  useEffect(() => {
    getMovieById(movieId, `${AR.VIDEOS},${AR.CREDITS},${AR.RECOMMENDATIONS},${AR.SIMILAR}`).then((response) =>
      setMovie(response.data),
    );
  }, []);

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={["rgba(0, 0, 0, 0.5)", "rgba(217, 217, 217, 0)"]}
        start={[0, 0.3]}
        style={styles.linearGradient}
      />
      <View style={styles.moviePosterImageContainer}>
        <Image
          style={styles.moviePosterImage}
          resizeMode="cover"
          source={{ uri: getPoster(movie?.backdrop_path) }}
        />
      </View>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.goBack()}
        >
          <Feather name="chevron-left" size={35} color={Colors.WHITE} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.headerText}>Share</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.playButton}
        onPress={() => Linking.openURL(getVideo(movie.videos.results[0].key))}
      >
        <Ionicons name="play-circle-outline" size={75} color={Colors.WHITE} />
      </TouchableOpacity>
      <ItemSeparator height={setHeight(37)} />
      <View style={styles.movieTitleContainer}>
        <Text style={styles.movieTitle}>{movie?.original_title}</Text>
        <View style={styles.row}>
            <Ionicons name="heart" size={22} color={Colors.HEART} />
            <Text style={styles.ratingText}>{movie?.vote_average}</Text>
        </View>
      </View>
      <Text style={styles.genreText}>{movie?.genres?.map(genre => genre?.name)?.join(", ")} | {movie?.runtime} Min</Text>
      <Text style={styles.genreText}>{getLanguage(movie?.original_language)?.english_name}</Text>
      <View style={styles.overviewContainer}>
        <Text style={styles.overviewTitle}>Overview</Text>
        <Text style={styles.overviewText}>{movie?.overview}</Text>
      </View>
      <View>
        <Text style={styles.castTitle}>Cast</Text>
        <View style={styles.castSubMenuContainer}>
            <TouchableOpacity activeOpacity={0.5} onPress={() => setIsCastSelected(true)}>
                <Text style={{...styles.castSubMenuText, color: isCastSelected ? Colors.BLACK : Colors.LIGHT_GRAY}}>Cast</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} onPress={() => setIsCastSelected(false)}>
                <Text style={{...styles.castSubMenuText, color: isCastSelected ? Colors.LIGHT_GRAY : Colors.BLACK}}>Crew</Text>
            </TouchableOpacity>
        </View>
        <FlatList
            style={{marginVertical: 5, top: -70}}
            data={isCastSelected ? movie?.credits?.cast : movie?.credits?.crew}
            keyExtractor={(item) => item?.credit_id}
            horizontal
            showsHorizontalScrollIndicator={false}
            ListHeaderComponent={() => <ItemSeparator width={20}/>}
            ItemSeparatorComponent={() => <ItemSeparator width={20}/>}
            ListFooterComponent={() => <ItemSeparator width={20}/>}
            renderItem={({item}) => 
            <CastInfoCard 
                realName={item?.name} 
                characterName={isCastSelected ? item?.character : item?.job}
                image={item?.profile_path}
            />}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BASIC_BACKGROUND,
    marginBottom: -70
  },
  moviePosterImageContainer: {
    height: setHeight(35),
    width: setWidth(145),
    alignItems: "center",
    position: "absolute",
    left: setWidth((100 - 145) / 2),
    top: 0,
    borderBottomRightRadius: 300,
    borderBottomLeftRadius: 300,
    elevation: 8,
  },
  moviePosterImage: {
    borderBottomRightRadius: 300,
    borderBottomLeftRadius: 300,
    width: setWidth(145),
    height: setHeight(35),
  },
  linearGradient: {
    width: setWidth(100),
    height: setHeight(6),
    position: "absolute",
    top: 0,
    elevation: 9,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    position: "absolute",
    right: 0,
    left: 0,
    top: 20,
    elevation: 20,
  },
  headerText: {
    color: Colors.WHITE,
    fontWeight: "bold",
  },
  playButton: {
    top: 75,
    left: setWidth(50) - 70 / 2,
    elevation: 10,
  },
  movieTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    top: -70
  },
  movieTitle: {
    color: Colors.BLACK,
    fontWeight: "bold",
    fontSize: 18,
    width: setWidth(60)
  },
  ratingText: {
    marginLeft: 5,
    color: Colors.BLACK,
    fontWeight: "bold",
    fontSize: 15
  },
  row: {
    flexDirection: "row",
    alignItems: "center"
  },
  genreText: {
    color: Colors.LIGHT_GRAY,
    paddingHorizontal: 20,
    top: -70,
    paddingTop: 5,
    fontWeight:  "bold",
    fontSize: 13
  },
  overviewContainer: {
    top: -70,
    backgroundColor: Colors.EXTRA_LIGHT_GRAY,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10
  },
  overviewTitle:{
    color: Colors.BLACK,
    fontWeight: "bold",
    fontSize: 18
  },
  overviewText: {
    color: Colors.LIGHT_GRAY,
    paddingVertical: 5,
    fontFamily: "bold",
    fontSize: 13,
    textAlign: "justify"
  },
  castTitle: {
    top: -70,
    marginLeft: 20,
    color: Colors.BLACK,
    fontWeight: "bold",
    fontSize: 18
  },
  castSubMenuContainer: {
    marginLeft: 20,
    flexDirection: "row",
    marginVertical: 5,
    top: -70
  },
  castSubMenuText: {
    marginRight: 10,
    color: Colors.BLACK,
    fontWeight: "bold",
    fontSize: 13
  }
});
