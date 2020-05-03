const fs = require("fs");

class RoomsDB {
  constructor(filename) {
    if (!filename) {
      throw new Error("Creating a new Database require a filename");
    }

    this.filename = filename;
    try {
      fs.accessSync(this.filename);
    } catch (err) {
      fs.writeFileSync(this.filename, "{}");
    }
  }

  async read() {
    return JSON.parse(
      await fs.promises.readFile(this.filename, { encoding: "utf8" })
    );
  }

  async save(records) {
    await fs.promises.writeFile(this.filename, JSON.stringify(records, null, 2));
  }

  async create(startDate) {
    const records = await this.read();
    const date = new Date(startDate);

    if (!records.hasOwnProperty(date.toDateString())) {
      records[date.toDateString()] = {
        room1: false,
        room2: false,
        room3: false,
        room4: false
      };
    }

    await this.save(records);
  }

  async update(startDate, attrs) {
    const records = await this.read();
    const date = new Date(startDate);

    records[date.toDateString()] = Object.assign(records[date.toDateString()], attrs);

    await this.save(records);
  }
}

module.exports = new RoomsDB("rooms.json");