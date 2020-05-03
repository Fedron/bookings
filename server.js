const express = require("express");
const next = require("next");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");

const usersDB = require("./databases/UsersDB.js");
const configDB = require("./databases/ConfigDB.js");
const roomDB = require("./databases/RoomsDB.js");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const requireAuth = (req, res, next) => {
  if (!req.session.userID) {
    return res.redirect("/signin");
  }
  next();
}

const requireAdmin = async (req, res, next) => {
  if (!req.session.userID) {
    return res.redirect("/signin");
  }

  const user = await usersDB.get(req.session.userID);
  if (user.level !== 2) {
    return res.redirect("/");
  }
  next();
}

const getDatesBetween = (startDate, endDate) => {
  const dates = [];

  let currentDate = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate()
  );

  while (currentDate <= endDate) {
    dates.push(currentDate);

    currentDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 1,
    );
  }

  return dates;
};

app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.json({ limit: "10mb" }));
  server.use(cookieSession({
    keys: ["ods032vnb02"]
  }));

  server.post("/signup", async (req, res) => {
    const { username, password, passwordConf } = req.body;

    if (!username || !password || !passwordConf) {
      res.statusMessage = "Fields cannot be left blank";
      return res.status(400).send("");
    }

    const existingUser = await usersDB.getBy({ username });
    if (existingUser) {
      res.statusMessage = "Username already taken.";
      return res.status(400).send("");
    }

    const user = await usersDB.create({ username, password });
    req.session.userID = user.id;
    req.session.level = user.level;

    res.send("");
  });

  server.post("/signin", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      res.statusMessage = "Fields cannot be left blank";
      return res.status(400).send("");
    }

    const user = await usersDB.getBy({ username });
    if (!user) {
      res.statusMessage = "Password incorrect";
      return res.status(400).send("");
    }

    if (!await usersDB.comparePasswords(user.password, password)) {
      res.statusMessage = "Password incorrect";
      return res.status(400).send("");
    }

    req.session.userID = user.id;
    req.session.level = user.level;
    res.send("");
  });

  server.get("/signout", (req, res) => {
    req.session = null;
    res.redirect("/signin");
  });

  server.get("/bookings", requireAuth, (req, res) => {
    app.render(req, res, "/bookings")
  });

  server.post("/bookings/create", requireAuth, async (req, res) => {
    const { startDate, endDate, breakfast, totalPrice } = req.body;
    const takenRooms = Object.values(req.body.takenRooms);

    let room = 1;
    for (let index in takenRooms) {
      if (!takenRooms[index]) {
        room = parseInt(index) + 1;
        break;
      }
    }
    room = parseInt(room);

    await usersDB.createBooking(req.session.userID, {
      startDate,
      endDate,
      breakfast,
      totalPrice,
      room
    });

    const roomString = `room${room}`;
    const days = getDatesBetween(new Date(startDate), new Date(endDate));

    for (let date of days) {
      await roomDB.create(date);
      await roomDB.update(date, {
        [roomString]: true
      })
    }

    return res.send("");
  });

  server.get("/admin", requireAdmin, (req, res) => {
    app.render(req, res, "/admin")
  });

  server.post("/admin", requireAdmin, async (req, res) => {
    await configDB.update("roomPrice", req.body.roomPrice);
    return res.send("");
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, err => {
    if (err) throw err;
    console.log("> Listening...");
  });
});