import React, { useState } from 'react';
import Router from 'next/router';
import DatePicker from 'react-datepicker';
import { makeStyles, useTheme } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CustomButton from './CustomButton';
import CustomCheckbox from './CustomCheckbox';
import { getDatesBetween } from '../helpers.js';
import 'isomorphic-fetch';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  title: {
    textTransform: "uppercase",
    fontWeight: "bold",
    background: "linear-gradient(132deg, rgba(95,194,242,1) 0%, rgba(32,230,238,1) 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
  },
  dates: {
    display: "flex",
    justifyContent: "space-evenly",
    width: "100%",
    marginTop: theme.spacing(3)
  },
  breakfastForm: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: theme.spacing(4)
  },
  bigText: {
    background: "linear-gradient(132deg, rgba(95,194,242,1) 0%, rgba(32,230,238,1) 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
  }
}));

const BookingForm = ({ roomPrice, loggedIn, bookedRooms }) => {
  const classes = useStyles();
  const theme = useTheme();

  const [startDate, setStartDate] = useState(new Date(Date.now()));
  const handleStartDateChange = (date) => {
    setStartDate(date);
  }

  const [endDate, setEndDate] = useState(new Date(Date.now()));
  const handleEndDateChange = (date) => {
    setEndDate(date);
  }

  const [breakfast, setBreakfast] = useState(false);

  const stayDuration = Math.round(((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)) + 1);
  const totalPrice = roomPrice * stayDuration;

  let takenRooms = {};
  const days = getDatesBetween(startDate, endDate);
  days.forEach((date) => {
     if (bookedRooms.hasOwnProperty(date.toDateString())) {
        takenRooms.room1 = bookedRooms[date.toDateString()].room1;
        takenRooms.room2 = bookedRooms[date.toDateString()].room2;
        takenRooms.room3 = bookedRooms[date.toDateString()].room3;
        takenRooms.room4 = bookedRooms[date.toDateString()].room4;
     }
  })

  return (
    <div className={classes.root}>
      <Typography
        variant="h3"
        style={{ marginTop: theme.spacing(5) }}
        className={classes.title}
      >Create new booking</Typography>

      <div className={classes.dates}>
        <div>
          <Typography variant="h5">From date</Typography>
          <DatePicker selected={startDate} onChange={handleStartDateChange} />
        </div>
        <div>
          <Typography variant="h5">To date</Typography>
          <DatePicker selected={endDate} onChange={handleEndDateChange} />
        </div>
      </div>

      <div className={classes.breakfastForm}>
        <Typography variant="h6">Would you like breakfast to be included?</Typography>
        <FormControlLabel
          control={
            <CustomCheckbox
              name="breakfast"
              checked={breakfast}
              onChange={() => {
                setBreakfast(!breakfast);
              }}
            />
          }
          label="Breakfast"
        />
      </div>

      <Typography
        variant="h3"
        style={{ marginTop: theme.spacing(4) }}
      >You are staying for</Typography>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Typography
          variant="h1"
          style={{ marginRight: theme.spacing(2) }}
          className={classes.bigText}
        >{stayDuration}</Typography>
        <Typography
          variant="h3"
          className={classes.bigText}
        >{stayDuration === 1 ? "Day" : "Days"}</Typography>
      </div>
      <Typography variant="h3">At a cost of</Typography>
      <Typography
        variant="h1"
        className={classes.bigText}
      >£{totalPrice}</Typography>

      {!loggedIn ?
        <Typography style={{ marginTop: theme.spacing(4) }}>Please login first</Typography>
        :
        <Typography style={{ marginTop: theme.spacing(4) }}>To purchase your booking, please press confirm below</Typography>
      }
      <CustomButton
        size="large"
        color_={!loggedIn ? "red" : ""}
        disabled={!loggedIn ? true : false}
        style={{ marginTop: theme.spacing(2) }}
        onClick={async () => {
          if (loggedIn) {
            await fetch(`/bookings/create`, {
              method: "post",
              headers: {
                "Accept": "application/json, text/plan, */*",
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                startDate,
                endDate,
                breakfast,
                totalPrice,
                takenRooms
              })
            }).then((res) => {
              if (res.status === 200) {
                Router.push("/bookings/success?type=payment");
              }
            });
          }
        }}
      >Confirm</CustomButton>
    </div>
  );
}
 
export default BookingForm;