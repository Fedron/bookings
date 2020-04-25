import { makeStyles } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    background: "linear-gradient(132deg, rgba(46,44,70,1) 0%, rgba(7,12,52,1) 100%)",
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    color: "#ffc400"
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
          <Typography variant="h2">Bookings</Typography>
        </nav>
      </Container>
    </div>
  );
}

export default Index;