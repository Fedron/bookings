const fs = require("fs");

class ConfigDB {
  constructor(filename) {
    if (!filename) {
      throw new Error("Creating a new Database require a filename");
    }

    this.filename = filename;
    try {
      fs.accessSync(this.filename);
    } catch (err) {
      fs.writeFileSync(this.filename, '{"roomPrice": 49}');
    }
  }

  async getAll() {
    return JSON.parse(
      await fs.promises.readFile(this.filename, { encoding: "utf8" })
    );
  }

  async get(id) {
    const records = await this.getAll();
    return records[id];
  }

  async update(id, newValue) {
    const records = await this.getAll();
    records[id] = newValue;
    await this.writeAll(records);
  }

  async writeAll(records) {
    await fs.promises.writeFile(this.filename, JSON.stringify(records, null, 2));
  }
}

module.exports = new ConfigDB("config.json");