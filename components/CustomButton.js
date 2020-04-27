import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

const CustomButton = withStyles((theme) => ({
  root: {
    borderImage: "linear-gradient(132deg, rgba(95,194,242,1) 0%, rgba(32,230,238,1) 100%)",
    borderImageSlice: "30%",
    borderStyle: "solid",
    borderWidth: "5px",
    color: "#20e6ee",
    padding: "0.5rem 1rem",
    fontWeight: "bold",
    fontSize: "120%",
    transition: "150ms all ease-in-out",
    "&:hover": {
      filter: "brightness(95%)"
    }
  }
}))(Button);

export default CustomButton;