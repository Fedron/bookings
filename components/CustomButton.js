import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

const getGradientColors = (props) => {
  if (props.color_ === "green") {
    return ["rgba(98,242,95,1)", "rgba(43,238,32,1)"];
  }

  if (props.color_ === "red") {
    return ["rgba(242,95,95,1)", "rgba(238,32,32,1)"];
  }

  return ["rgba(95,194,242,1)", "rgba(32,230,238,1)"];
}

const CustomButton = withStyles((theme) => ({
  root: {
    borderImage: (props) => `linear-gradient(132deg, ${getGradientColors(props)[0]} 0%, ${getGradientColors(props)[1]} 100%) 25;`,
    borderStyle: "solid",
    borderWidth: "5px",
    color: (props) => {
      if (props.color_ === "green") {
        return "rgba(98,242,95,1)";
      }

      if (props.color_ === "red") {
        return "rgba(242,95,95,1)";
      }

      return "rgba(95,194,242,1)";
    },
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