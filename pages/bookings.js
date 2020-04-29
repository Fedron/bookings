import 'isomorphic-fetch';
import { useTheme } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import CustomButton from '../components/CustomButton';
import Navbar from '../components/Navbar';
import UserBookings from '../components/UserBookings';

const Bookings = ({ bookings }) => {
  const theme = useTheme();

  return (
    <div>
      <Container maxWidth="md">
        <Navbar>
          <CustomButton href="/" style={{ marginRight: theme.spacing(2) }}>Home</CustomButton>
          <CustomButton href="/signout">Sign Out</CustomButton>
        </Navbar>
        
        <UserBookings bookings={bookings} />
      </Container>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const res = await fetch(`${req.protocol}://${req.get("host")}/api/bookings?id=${req.session.userID}`);
  const bookings = await res.json();

  return { props: { bookings } }
}

export default Bookings;