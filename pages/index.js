import { makeStyles, useTheme } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CustomButton from '../components/CustomButton';
import BookingForm from '../components/BookingForm';

const useStyles = makeStyles((theme) => ({
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "1rem",
    alignItems: "center"
  }
}));

const Index = ({ loggedIn, isAdmin }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div>
      <Container maxWidth="md">
        <nav className={classes.navbar}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src="https://pngimage.net/wp-content/uploads/2018/06/logo-placeholder-png-7.png" width="100" />
            <Typography variant="h2" style={{ marginLeft: "0.5rem" }}>COMPANY</Typography>
          </div>
          
          {loggedIn ?
            <div style={{
              display: "flex"
            }}>
              {isAdmin ?
                <CustomButton href="/admin" style={{ marginRight: theme.spacing(2) }}>Admin Panel</CustomButton>
                :
                <CustomButton href="/bookings" style={{ marginRight: theme.spacing(2) }}>My Bookings</CustomButton>
              } 
              <CustomButton href="/signout">Sign Out</CustomButton>
            </div>
            :
            <CustomButton href="/signin">Login</CustomButton>
          }
        </nav>
        <main>
          <BookingForm />
        </main>
      </Container>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const loggedIn = req.session.userID ? true : false;
  const isAdmin = req.session.level > 0 ? true : false;
  return { props: { loggedIn, isAdmin } }
}

export default Index;