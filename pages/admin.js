import 'isomorphic-fetch';
import React, { useState } from 'react';
import { makeStyles, useTheme, withStyles } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import CustomButton from '../components/CustomButton';
import Navbar from '../components/Navbar';

const PriceButton = withStyles((theme) => ({
  root: {
    backgroundImage: "linear-gradient(132deg, rgba(95,194,242,1) 0%, rgba(32,230,238,1) 100%);",
    color: "white",
    padding: "0.5rem 1rem",
    fontWeight: "bold",
    fontSize: "120%",
    transition: "150ms all ease-in-out",
    "&:hover": {
      filter: "brightness(95%)"
    }
  }
}))(Button);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing(4)
  },
  bigText: {
    background: "linear-gradient(132deg, rgba(95,194,242,1) 0%, rgba(32,230,238,1) 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontSize: "12rem",
    marginRight: theme.spacing(4),
    userSelect: "none"
  },
  priceContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  priceButtons: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
}));

const Admin = ({ oldRoomPrice }) => {
  const classes = useStyles();
  const theme = useTheme();

  const [roomPrice, setRoomPrice] = useState(oldRoomPrice);
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Container maxWidth="md">
        <Navbar>
          <CustomButton href="/" style={{ marginRight: theme.spacing(2) }}>Home</CustomButton>
          <CustomButton href="/signout">Sign Out</CustomButton>
        </Navbar>

        <div className={classes.root}>
          <Collapse style={{ width: "100%", marginBottom: theme.spacing(4) }} in={open}>
            <Alert variant="filled" action={
              <IconButton
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }>
              Room price sucessfully saved!
            </Alert>
          </Collapse>

          <Typography variant="h3">Current room price</Typography>

          <div className={classes.priceContainer}>
            <Typography className={classes.bigText}>£{roomPrice}</Typography>
            <div className={classes.priceButtons}>
              <PriceButton style={{ marginBottom: theme.spacing(2) }} onClick={() => {
                setRoomPrice(roomPrice + 1);
              }}>
                <Icon className="fas fa-caret-up" />
              </PriceButton>
              <PriceButton onClick={() => {
                setRoomPrice(roomPrice - 1);
              }}>
                <Icon className="fas fa-caret-down" />
              </PriceButton>
            </div>
          </div>
        
          <CustomButton onClick={async () => {
            await fetch(`admin`, {
              method: "post",
              headers: {
                "Accept": "application/json, text/plan, */*",
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ roomPrice })
            });
            console.log("updated");
            setOpen(true);
          }}>Save Changes</CustomButton>
        </div>
      </Container>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const res = await fetch(`${req.protocol}://${req.get("host")}/api/price`);
  const oldRoomPrice = await res.json();

  return { props: { oldRoomPrice } }
}
 
export default Admin;