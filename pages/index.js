import { makeStyles } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CustomButton from '../components/CustomButton';
import BookingForm from '../components/BookingForm';

const useStyles = makeStyles((theme) => ({
  root: {
    background: "linear-gradient(132deg, rgba(249,247,241,1) 0%, rgba(245,237,226,1) 100%)",
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "1rem",
    alignItems: "center"
  }
}));

const Index = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <nav className={classes.navbar}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src="https://pngimage.net/wp-content/uploads/2018/06/logo-placeholder-png-7.png" width="100" />
            <Typography variant="h2">COMPANY</Typography>
          </div>
          
          <CustomButton>Login</CustomButton>
        </nav>
        <main>
          <BookingForm />
        </main>
      </Container>
    </div>
  );
}

export default Index;