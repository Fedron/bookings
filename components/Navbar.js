import { makeStyles, useTheme } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import 'isomorphic-fetch';

const useStyles = makeStyles((theme) => ({
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "1rem",
    alignItems: "center"
  }
}));

const Navbar = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <nav className={classes.navbar}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img src="https://pngimage.net/wp-content/uploads/2018/06/logo-placeholder-png-7.png" width="100" />
        <Typography variant="h2" style={{ marginLeft: "0.5rem" }}>COMPANY</Typography>
      </div>
      
      <div style={{
        display: "flex"
      }}>
        {children}
      </div>
    </nav>
  );
}
 
export default Navbar;