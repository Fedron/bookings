import UsersDB from '../../databases/UsersDB.js';
import RoomsDB from '../../databases/RoomsDB.js';

export default async (req, res) => {
  if (req.method === "POST") { return res.send("Can't do that, sorry") }
  
  if (req.query.id === "all") {
    const bookings = await RoomsDB.read();
    return res.send(bookings);
  }

  const bookings = await UsersDB.getBookingsFor(req.query.id);
  return res.send(bookings);
}