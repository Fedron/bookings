import { makeStyles } from '@material-ui/styles';
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

const Index = ({ loggedIn }) => {
  const classes = useStyles();

  return (
    <div>
      <Container maxWidth="md">
        <nav className={classes.navbar}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src="https://pngimage.net/wp-content/uploads/2018/06/logo-placeholder-png-7.png" width="100" />
            <Typography variant="h2" style={{ marginLeft: "0.5rem" }}>COMPANY</Typography>
          </div>
          
          {loggedIn ?
            <CustomButton href="/signout">Sign Out</CustomButton>
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
  return { props: { loggedIn } }
}

export default Index;