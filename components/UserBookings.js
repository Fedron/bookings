import { makeStyles, useTheme } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: `${theme.spacing(2)}px 0`,
    padding: theme.spacing(2),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  bookingMainInfo: {
    display: "flex",
    flexDirection: "column"
  }
}));

const UserBookings = ({ bookings }) => {
  const classes = useStyles();
  const theme = useTheme();

  if (bookings.length === 0) {
    <Typography variant="h3">You currently have no bookings</Typography>
  }

  return (
    <>
      <Typography
        variant="h3"
        style={{ marginTop: theme.spacing(8) }}
      >Your bookings</Typography>
      {bookings.map(booking => {
        const startDate = new Date(booking.startDate);
        const endDate = new Date(booking.endDate);

        return (
          <Paper key={booking.id} className={classes.root}>
            <div className={classes.bookingMainInfo}>
              <Typography variant="h5">{startDate.toDateString()} - {endDate.toDateString()}</Typography>
              <Typography variant="caption" color="textSecondary">{booking.id}</Typography>
            </div>

            {booking.breakfast &&
              <Typography>With breakfast</Typography>
            }

            <Typography variant="h4">£{booking.totalPrice}</Typography>
          </Paper>
        )
      })}
    </>
  );
}
 
export default UserBookings;