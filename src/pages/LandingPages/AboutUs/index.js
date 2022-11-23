/* eslint-disable no-param-reassign */
/*
=========================================================
* Material Kit 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";

// Material Kit 2 React examples


// Images
import bgImage from "assets/images/bg-about-us.jpg";
import Author from "../Author/index";

export const authEndpoint = "https://accounts.spotify.com/authorize";
const clientId = "ca1995c482c645ae921b0b7aca276a80";
const redirectUri = "https://your-birthday.onrender.com/#/landing-pages/about-us";
const scopes = ["user-read-currently-playing", "user-read-playback-state", "user-top-read"];
// Get the hash of the url
const hash2 = window.location.hash
  .substring(1)
  .split("&")
  .reduce((initial, item) => {
    if (item) {
      const parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});
window.location.hash = "";
function AboutUs() {
  return (
    <>
      {!hash2?.access_token && (
        <MKBox
          minHeight="75vh"
          width="100%"
          sx={{
            backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
              `${linearGradient(
                rgba(gradients.dark.main, 0.6),
                rgba(gradients.dark.state, 0.6)
              )}, url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "grid",
            placeItems: "center",
          }}
        >
          <Container>
            <Grid
              container
              item
              xs={12}
              lg={8}
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              sx={{ mx: "auto", textAlign: "center" }}
            >
              <MKTypography
                variant="h1"
                color="white"
                sx={({ breakpoints, typography: { size } }) => ({
                  [breakpoints.down("md")]: {
                    fontSize: size["2xl"],
                  },
                })}
              >
                ¿Qué día del Estéreo Picnic eres?
              </MKTypography>
              <MKTypography variant="body1" color="white" opacity={0.8} mt={1} mb={3}>
                Descubre que día del Estéreo Picnic 2023 eres según la música que más escuchas en
                Spotify.
              </MKTypography>
              <MKButton
                color="success"
                href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                  "%20"
                )}&response_type=token&show_dialog=true`}
              >
                Vincula tu cuenta de Spotify{" "}
              </MKButton>
            </Grid>
          </Container>
        </MKBox>
      )}
      {hash2.access_token && <Author token={hash2.access_token} />}
    </>
  );
}

export default AboutUs;
