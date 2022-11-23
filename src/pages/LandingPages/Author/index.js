import React from "react";
// @mui material components
import Card from "@mui/material/Card";

// Material Kit 2 React components
import MKBox from "components/MKBox";

// Routes

// Images
import bgImage from "assets/images/fep.jpg";
import axios from "axios";
import Posts from "./sections/Posts";

const thursday = [
  "blink-182",
  "tame impala",
  "the 1975",
  "cut copy",
  "melanie martinez",
  "wallows",
  "cigarretes after sex",
  "sofi tukker",
  "purple disco machine",
  "100 gecs",
  "lika nova",
  "higuita en chanclas",
];
const friday = [
  "the chemical brothers",
  "wu-tang clan",
  "bizarrap",
  "armin van burren",
  "moderat",
  "ryan castro",
  "trueno",
  "alci acosta",
  "gorogn city",
  "la perla",
];
const saturday = [
  "drake",
  "rosalia",
  "blondie",
  "tove lo",
  "jerry rivera",
  "fred again",
  "aurora",
  "omar apollo",
  "willow",
];
const sunday = [
  "billie eilish",
  "lil nas x",
  "morat",
  "jamie xx",
  "kali uchis",
  "polo & pan",
  "bandalos chinos",
  "modest mouse",
  "elsa y el mar",
];
function Author(token) {
  const [artists, setArtists] = React.useState([]);
  const [fepArtists, setFepArtists] = React.useState([]);
  const matchingArtist = [];
  /* const capitalizeWords = (arr) =>
    arr.map(
      (element) => element.name.charAt(0).toUpperCase() + element.name.slice(1).toLowerCase()
    ); */
  const requestAPI = async () => {
    try {
      const res = await axios.get(
        `https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=100&offset=0`,
        {
          headers: { Authorization: `Bearer ${token.token}` },
          params: {},
        }
      );
      const spotiArtists = res.data?.items?.map((artist) => artist.name.toLowerCase());
      const thursdayMatch = thursday.filter((artist) => spotiArtists?.includes(artist));
      matchingArtist.push(...thursdayMatch);
      const fridayMatch = friday.filter((artist) => spotiArtists?.includes(artist));
      matchingArtist.push(...fridayMatch);
      const saturdayMatch = saturday.filter((artist) => spotiArtists?.includes(artist));
      matchingArtist.push(...saturdayMatch);
      const sundayMatch = sunday.filter((artist) => spotiArtists?.includes(artist));
      matchingArtist.push(...sundayMatch);

      const artistFull = res.data?.items?.map((artist) => ({
        name: artist.name,
        image: artist.images[0].url,
      }));

      setArtists(artistFull.slice(0, 26));
      setFepArtists(
        artistFull.filter((artist) => matchingArtist?.includes(artist.name.toLowerCase()))
      );
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    requestAPI();
  }, []);
  return (
    <>
      <MKBox bgColor="white">
        <MKBox
          minHeight="30rem"
          width="100%"
          sx={{
            backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
              `${linearGradient(
                rgba(gradients.dark.main, 0.8),
                rgba(gradients.dark.state, 0.8)
              )}, url(${bgImage})`,
            backgroundSize: "fit",
            backgroundPosition: "center",
            display: "grid",
            placeItems: "center",
          }}
        />
        <Card
          sx={{
            p: 2,
            mx: { xs: 2, lg: 3 },
            mt: -8,
            mb: 4,
            backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
            backdropFilter: "saturate(200%) blur(30px)",
            boxShadow: ({ boxShadows: { xxl } }) => xxl,
          }}
        >
          <Posts artists={artists} fepArtists={fepArtists} />
        </Card>
      </MKBox>
    </>
  );
}

export default Author;
