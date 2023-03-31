import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import React, { useEffect } from "react";
import { RootStackScreenProps } from "../navigators/RootNavigator";
import { IMovieDetails } from "../types/move-details";
import {
  MOVIE_API_URL,
  MOVIE_IMAGE_URL,
  POSTER_ASPECT_RATIO,
} from "../utils/constants";
import { THE_MOVIE_DB_API_KEY } from "@env";
import { useQuery } from "@tanstack/react-query";
import { useTheme } from "@react-navigation/native";
import Icons from "@expo/vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IMoveList } from "../types/move-list";
import MoviesHorizontalList from "../components/MoviesHorizontalList";
import { IReviews } from "../types/move-reviews";

const fetchMove = async (movieId: number): Promise<IMovieDetails> => {
  const res = await fetch(`${MOVIE_API_URL}/movie/${movieId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${THE_MOVIE_DB_API_KEY}`,
    },
  });

  const data = await res.json();
  return data;
};

const fetchRecommendations = async (movieId: number): Promise<IMoveList> => {
  const res = await fetch(`${MOVIE_API_URL}/movie/${movieId}/recommendations`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${THE_MOVIE_DB_API_KEY}`,
    },
  });

  const data = await res.json();
  return data;
};
const fetchReviews = async (movieId: number): Promise<IReviews> => {
  const res = await fetch(`${MOVIE_API_URL}/movie/${movieId}/reviews`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${THE_MOVIE_DB_API_KEY}`,
    },
  });

  const data = await res.json();
  return data;
};

const DetailsScreen = ({
  navigation,
  route: {
    params: { movieId },
  },
}: RootStackScreenProps<"Details">) => {
  const query = useQuery(["movie-details", movieId], ({ queryKey }) =>
    fetchMove(queryKey[1] as number)
  );
  const recommendationsQuery = useQuery(
    ["movie-recommendations", movieId],
    ({ queryKey }) => fetchRecommendations(queryKey[1] as number)
  );
  const reviewsQuery = useQuery(["movie-reviews", movieId], ({ queryKey }) =>
    fetchReviews(queryKey[1] as number)
  );

  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation, query]);

  return (
    <View
      style={{
        backgroundColor: colors.background,
        flex: 1,
        position: "relative",
      }}
    >
      {query.isLoading ? (
        <View>
          <ActivityIndicator />
        </View>
      ) : query.isError ? (
        <View></View>
      ) : (
        <ScrollView style={{ flex: 1 }}>
          <View
            style={{
              aspectRatio: POSTER_ASPECT_RATIO,
              width: "100%",
              position: "relative",
            }}
          >
            <Image
              source={{
                uri: `${MOVIE_IMAGE_URL}/${
                  query.data.poster_path || query.data.backdrop_path
                }`,
              }}
              resizeMode="cover"
              style={StyleSheet.absoluteFill}
            />
            <LinearGradient
              colors={[colors.background, "transparent"]}
              start={{
                x: 0,
                y: 1,
              }}
              end={{
                x: 0,
                y: 0,
              }}
              style={{
                height: "40%",
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 2,
              }}
            />

            <View style={[StyleSheet.absoluteFill, { zIndex: 2, padding: 16 }]}>
              <View style={{ flex: 1 }} />
              <View
                style={{
                  height: 6,
                  backgroundColor: "rgba(255,255,255,0.2)",
                  borderRadius: 4,
                  position: "relative",
                  marginBottom: 16,
                  overflow: "hidden",
                }}
              >
                <View
                  style={{
                    width: "30%",
                    position: "absolute",
                    left: 0,
                    top: 0,
                    borderRadius: 4,
                    bottom: 0,
                    backgroundColor: "#FE6D05",
                  }}
                />
              </View>
              <View
                style={{
                  justifyContent: "center",
                  flexDirection: "row",
                  gap: 16,
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: "#ffffff",
                    paddingHorizontal: 16,
                    height: 40,
                    alignItems: "center",
                    borderRadius: 40,
                    flexDirection: "row",
                    gap: 4,
                  }}
                >
                  <Icons name="play" size={22} color={"#000"} />
                  <Text style={{ color: "#000", fontWeight: "600" }}>Play</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: "rgba(255,255,255,0.2)",
                    height: 40,
                    width: 40,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 40,
                    flexDirection: "row",
                    gap: 4,
                  }}
                >
                  <Icons name="plus" size={22} color={"#fff"} />
                </TouchableOpacity>
                <View style={{ flex: 1 }} />
                <TouchableOpacity
                  style={{
                    backgroundColor: "rgba(255,255,255,0.2)",
                    height: 40,
                    width: 40,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 40,
                    flexDirection: "row",
                    gap: 4,
                  }}
                >
                  <Icons name="download" size={22} color={"#fff"} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: "rgba(255,255,255,0.2)",
                    height: 40,
                    width: 40,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 40,
                    flexDirection: "row",
                    gap: 4,
                  }}
                >
                  <Icons name="dots-horizontal" size={22} color={"#fff"} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{ padding: 16, gap: 32 }}>
            <View
              style={{
                backgroundColor: colors.card,
                padding: 16,
                borderRadius: 32,
              }}
            >
              <Text
                style={{
                  color: colors.text,
                  textAlign: "center",
                  marginBottom: 16,
                  opacity: 0.75,
                }}
              >
                Genres -{" "}
                {query.data.genres.map((genre) => genre.name).join(", ")}
              </Text>
              <Text
                style={{
                  color: colors.text,
                  fontSize: 16,
                  textAlign: "center",
                  lineHeight: 24,
                }}
              >
                {query.data.overview}
              </Text>

              <Text
                style={{
                  color: colors.text,
                  textAlign: "center",
                  marginTop: 16,
                  opacity: 0.75,
                }}
              >
                Distribution -{" "}
                {query.data.production_companies
                  .map((genre) => genre.name)
                  .join(", ")}
              </Text>
            </View>
          </View>
          <MoviesHorizontalList
            onMoviePress={(movie) =>
              navigation.push("Details", { movieId: movie.id })
            }
            title="Recomended Movies"
            query={recommendationsQuery}
          />
          <View style={{ paddingVertical: 16 }}>
            <View style={{ paddingHorizontal: 16 }}>
              <Text style={{ fontSize: 18, fontWeight: "600", color: "#fff" }}>
                Reviews
              </Text>
            </View>
            {reviewsQuery.isLoading ? (
              <ActivityIndicator />
            ) : reviewsQuery.isError ? (
              <View>
                <Text>Something went wrong!</Text>
                <Button title="Retry" onPress={() => reviewsQuery.refetch} />
              </View>
            ) : (
              <View style={{ padding: 16, gap: 16 }}>
                {reviewsQuery.data.results.map((review) => (
                  <View
                    key={review.id}
                    style={{
                      padding: 16,
                      backgroundColor: colors.card,
                      borderRadius: 16,
                    }}
                  >
                    <View
                      style={{
                        marginBottom: 16,
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        {review.author_details.avatar_path && (
                          <Image
                            source={{
                              uri: `${MOVIE_IMAGE_URL}/${review.author_details.avatar_path}`,
                            }}
                            resizeMode="cover"
                            style={{
                              width: 40,
                              height: 40,
                              borderRadius: 100,
                              marginRight: 16,
                            }}
                          />
                        )}
                        <Text
                          numberOfLines={1}
                          style={{
                            color: colors.text,
                            fontSize: 16,
                            fontWeight: "600",
                            flex: 1,
                          }}
                        >
                          {review.author_details.username}
                        </Text>
                      </View>
                      {review.author_details.rating && (
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          <Text
                            style={{
                              color: colors.text,
                              fontSize: 16,
                              fontWeight: "600",
                            }}
                          >
                            {review.author_details.rating}/10
                          </Text>
                          <Icons name="star" size={24} color="#facc15" />
                        </View>
                      )}
                    </View>
                    <Text
                      style={{
                        color: colors.text,
                        fontSize: 16,
                        lineHeight: 24,
                      }}
                      numberOfLines={8}
                    >
                      {review.content}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
          <View style={{ height: insets.bottom + 16 }} />
        </ScrollView>
      )}

      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          paddingTop: insets.top,
        }}
      >
        <LinearGradient
          pointerEvents="none"
          colors={["transparent", colors.background]}
          start={{
            x: 0,
            y: 1,
          }}
          end={{
            x: 0,
            y: 0,
          }}
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: -1,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 16,
            height: 52,
            gap: 16,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.pop()}
            style={{
              backgroundColor: "rgba(255,255,255,0.2)",
              height: 40,
              width: 40,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 40,
              flexDirection: "row",
              gap: 4,
            }}
          >
            <Icons name="arrow-left" size={22} color={"#fff"} />
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              gap: 16,
              flex: 1,
              justifyContent: "space-evenly",
            }}
          ></View>

          <TouchableOpacity
            onPress={() => navigation.pop()}
            style={{
              backgroundColor: "rgba(255,255,255,0.2)",
              height: 40,
              width: 40,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 40,
              flexDirection: "row",
              gap: 4,
            }}
          >
            <Icons name="cast" size={22} color={"#fff"} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DetailsScreen;
