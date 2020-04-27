import { withStyles } from '@material-ui/styles';
import Checkbox from '@material-ui/core/Checkbox';

const CustomCheckbox = withStyles((theme) => ({
  root: {
    color: "#5fc2f2",
  }
}))((props) => <Checkbox color="default" {...props} />);

export default CustomCheckbox;