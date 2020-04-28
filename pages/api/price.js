import ConfigDB from '../../databases/ConfigDB.js';

export default async (req, res) => {
  if (req.method === "POST") { return res.send("Can't do that, sorry") }
    
  const price = await ConfigDB.get("roomPrice");
  return res.send(price);
}