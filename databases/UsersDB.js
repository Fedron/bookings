const crypto = require("crypto");
const util = require("util");
const Database = require("./Database.js");

const scrypt = util.promisify(crypto.scrypt);

class UsersDB extends Database {
  async create(attrs) {
    attrs.id = this.randomID();

    const salt = this.randomID();
    const buf = await scrypt(attrs.password, salt, 64);
    const hashed = buf.toString("hex");

    const records = await this.getAll();
    const record = {
      ...attrs,
      password: `${hashed}.${salt}`,
      level: 0,
      bookings: []
    };
    records.push(record);

    await this.writeAll(records);
    return record;
  }

  async createBooking(userID, booking) {
    const records = await this.getAll();
    const record = records.find(r => r.id === userID);

    booking.id = this.randomID();

    record.bookings.push(booking);
    await this.writeAll(records);
  }

  async getBookingsFor(userID) {
    const records = await this.getAll();
    const record = records.find(r => r.id === userID);

    return record.bookings;
  }

  async getAllBookings() {
    const records = await this.getAll();
    const bookings = [];

    records.forEach((val) => {
      bookings.push(val.bookings);
    });

    return bookings.flat();
  }

  async comparePasswords(saved, supplied) {
    // saved -> stored in db "hashed.salt"
    // supplied -> from a form in plain test
    const [hashed, salt] = saved.split(".");
    const buf = await scrypt(supplied, salt, 64);

    return hashed === buf.toString("hex");
  }
}

module.exports = new UsersDB("users.json");