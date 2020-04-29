import UsersDB from '../../databases/UsersDB.js';

export default async (req, res) => {
  if (req.method === "POST") { return res.send("Can't do that, sorry") }
    
  const bookings = await UsersDB.getBookingsFor(req.query.id);
  return res.send(bookings);
}