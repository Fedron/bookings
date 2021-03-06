import { useTheme } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import CustomButton from '../components/CustomButton';
import BookingForm from '../components/BookingForm';
import Navbar from '../components/Navbar';
import 'isomorphic-fetch';

const Index = ({ loggedIn, isAdmin, roomPrice, bookedRooms }) => {
  const theme = useTheme();

  return (
    <div>
      <Container maxWidth="md">
        <Navbar>
          {loggedIn ?
            <>
              {isAdmin ?
                <CustomButton href="/admin" style={{ marginRight: theme.spacing(2) }}>Admin Panel</CustomButton>
                :
                <CustomButton href="/bookings" style={{ marginRight: theme.spacing(2) }}>My Bookings</CustomButton>
              }
              <CustomButton href="/signout">Sign Out</CustomButton>
            </>
            :
            <CustomButton href="/signin">Login</CustomButton>
          }
        </Navbar>
        <main>
          <BookingForm roomPrice={roomPrice} loggedIn={loggedIn} bookedRooms={bookedRooms} />
        </main>
      </Container>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const loggedIn = req.session.userID ? true : false;
  const isAdmin = req.session.level > 0 ? true : false;

  let res = await fetch(`${req.protocol}://${req.get("host")}/api/price`);
  const roomPrice = await res.json();

  res = await fetch(`${req.protocol}://${req.get("host")}/api/bookings?id=all`);
  const bookedRooms = await res.json();

  return { props: { loggedIn, isAdmin, roomPrice, bookedRooms } }
}

export default Index;