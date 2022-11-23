/* eslint-disable react/prop-types */
// @mui material components
import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MKButton from "components/MKButton";
// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import Modal from "@mui/material/Modal";
// Material Kit 2 React components
import TransparentBlogCard from "examples/Cards/BlogCards/TransparentBlogCard";
import Confetti from "react-confetti";

function Places(props) {
  // eslint-disable-next-line react/prop-types
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const { artists, fepArtists } = props;
  const [open, setOpen] = React.useState(false);
  const [showFep, setShowFep] = React.useState(false);
  console.log(artists);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const onClickButton = () => {
    setShowFep(true);
  };
  return (
    <MKBox component="section" py={2}>
      <Container>
        <Grid container item xs={12} lg={6}>
          <MKTypography variant="h4" mb={6}>
            {!showFep
              ? "Estos son tus artistas más escuchados ¡Que buen gusto tienes! :)"
              : "Estos son tus artistas más escuchados que irán el Estéreo Picnic 2023"}
          </MKTypography>
          <MKTypography variant="h4" mb={6}>
            {!showFep ? "" : "Según mis calculos eres el día Jueves"}
          </MKTypography>
        </Grid>
        <Grid container spacing={3}>
          {!showFep
            ? artists?.map((artist) => (
                <Grid item xs={6} sm={6} lg={3}>
                  <TransparentBlogCard key={artist.name} image={artist.image} title={artist.name} />
                </Grid>
              ))
            : fepArtists?.map((artist) => (
                <Grid item xs={6} sm={6} lg={3}>
                  <TransparentBlogCard key={artist.name} image={artist.image} title={artist.name} />
                </Grid>
              ))}
        </Grid>
      </Container>

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
        {!showFep ? (
          <MKButton color="secondary" size="large" onClick={onClickButton}>
            Ahora descubre tú día del Estéreo Picnic :)
          </MKButton>
        ) : (
          <MKButton color="primary" size="large" onClick={handleOpen}>
            Reclama un premio por ser tan cool
          </MKButton>
        )}
      </Grid>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <MKBox sx={style}>
          <MKTypography variant="h4" component="h2">
            Atención Colombia
          </MKTypography>
          <Confetti />
          <MKTypography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            Gracias x ser una persona tan increíble te ganaste la boleta para el Jueves del FEP 2023
            y también vamos a Metronomy. Ti amo.
          </MKTypography>
        </MKBox>
      </Modal>
    </MKBox>
  );
}

export default Places;
