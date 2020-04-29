import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import CustomButtom from '../../components/CustomButton';

const Success = ({ action }) => {
  action = action.replace(/^./, action[0].toUpperCase());

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <Icon
        className="far fa-check-circle"
        style={{
          fontSize: "3000%",
          color: "#58e051",
          textShadow: "2px 2px 8px rgba(0, 0, 0, 0.2)",
          marginBottom: "1.5rem"
        }}
      />
      <Typography variant="h3">{action} was successful!</Typography>
      <CustomButtom color_="green" href="/bookings" style={{ marginTop: "1.5rem" }}>View my bookings</CustomButtom>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const action = req.query.type;

  return { props: { action } }
}

export default Success;