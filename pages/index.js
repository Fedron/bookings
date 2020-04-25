import { makeStyles } from '@material-ui/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  root: {
    background: "linear-gradient(132deg, rgba(46,44,70,1) 0%, rgba(7,12,52,1) 100%)",
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    color: "#ffc400"
  }
}));

const Index = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <h1>Hello, world!</h1>
      </Container>
    </div>
  );
}

export default Index;