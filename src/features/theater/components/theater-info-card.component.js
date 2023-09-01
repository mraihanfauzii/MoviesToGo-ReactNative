import React from "react";
import { SvgXml } from "react-native-svg";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import {
  TheaterCard,
  TheaterCardCover,
  Address,
  Info,
  Rating,
  Section,
  SectionEnd,
  Icon,
} from "../components/theater-info-card.styles";
import star from "../../../../assets/star";
import open from "../../../../assets/open";

export const TheaterInfoCard = ({ theater = {} }) => {
  const {
    name = "Some Theater",
    icon = "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
    photos = [
      "https://venuemagz.com/wp-content/uploads/2019/11/CGV-Living-Plaza-800x533_c.jpg",
    ],
    address = "100 some random street",
    isOpengNow = true,
    rating = 4,
    isClosedTemporarily = true,
  } = theater;

  const ratingArray = Array.from(new Array(Math.floor(rating)));
  console.log(ratingArray);

  return (
    <TheaterCard elevation={5}>
      <TheaterCardCover key={name} source={{ uri: photos[0] }} />
      <Info>
        <Text variant="label">{name}</Text>
        <Section>
          <Rating>
            {ratingArray.map(() => (
              <SvgXml xml={star} width={20} height={20} />
            ))}
          </Rating>
          <SectionEnd>
            {isClosedTemporarily && (
              <Text variant="error" style={{ color: "red" }}>
                CLOSED TEMPORARILY
              </Text>
            )}
            <Spacer position="left" size="large">
              {isOpengNow && <SvgXml xml={open} width={20} height={20} />}
            </Spacer>
            <Spacer position="left" size="large">
              <Icon source={{ uri: icon }} />
            </Spacer>
          </SectionEnd>
        </Section>

        <Address>{address}</Address>
      </Info>
    </TheaterCard>
  );
};
