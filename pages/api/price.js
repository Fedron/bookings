import ConfigDB from '../../databases/ConfigDB.js';

export default async (req, res) => {
  const price = await ConfigDB.get("roomPrice");
  return res.send(price);
}