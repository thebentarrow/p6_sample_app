"use strict";

const ejs = require("ejs");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const csrf = require("tiny-csrf");
const path = require("path");
const express = require("express");
const helmet = require("helmet");
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("p6_sample");

const app = express();
app.use(helmet());
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    cookie: {
      httpOnly: true,
      resave: false,
      sameSite: true,
      secure: true,
    },
    secret: "p6-technologies-sample-app-session",
    maxAge: 1 * 3600000,
  })
);
app.use(cookieParser("p6-sample-cookie"));
app.use(csrf("123456789iamasecret987654321look"));

app.set("views", path.join(__dirname, "."));
app.set("view engine", "ejs");
app.engine("html", ejs.renderFile);

app.get("/", (req, res) => {
  if (req.session && req.session.user) {
    res.render("../ejs/index.ejs", {
      client: "app",
      csrfToken: req.csrfToken(),
    });
  } else {
    res.redirect("/login");
  }
});

app.get("/login", (req, res) => {
  if (req.session && req.session.user) {
    res.send("You are already logged in.");
  } else {
    res.render("../ejs/index.ejs", {
      client: "login",
      csrfToken: req.csrfToken(),
    });
  }
});

app.get("/logout", (req, res) => {
  if (req.session && req.session.user) {
    req.session = null;
  }
  res.redirect("/");
});

app.get("/getSuppliers", (req, res) => {
  if (req.session && req.session.user) {
    db.all(
      `SELECT * FROM suppliers WHERE CreatedByUser = ${req.session.user.ID} OR LastUpdatedByUser = ${req.session.user.ID}`,
      (err, rows) => {
        if (err) {
          res.json({
            success: false,
          });
        } else {
          req.session.rowCount = rows.length;
          res.json({
            success: true,
            data: rows,
          });
        }
      }
    );
  }
});

app.post("/addSupplier", (req, res) => {
  if (req.session && req.session.user) {
    const formData = req.body;
    db.run(
      `INSERT INTO suppliers VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        req.session.rowCount + 1,
        formData.name,
        formData.description,
        formData.isActive,
        formData.category,
        formData.address1,
        formData.address2,
        formData.postalCode,
        formData.city,
        formData.country,
        formData.phone,
        formData.email,
        req.session.user.ID,
        Date.now(),
        req.session.user.ID,
        Date.now(),
      ],
      function (err) {
        if (err) {
          res.json({
            success: false,
          });
        }
        res.json({
          success: true,
        });
      }
    );
  }
});

app.post("/validateUser", (req, res) => {
  const formData = req.body;
  const sql = `SELECT * FROM users WHERE USERNAME = ? AND PASSWORD = ?`;
  db.get(sql, [formData.username, formData.password], (err, row) => {
    if (err) {
      return console.error(err.message);
    }

    if (row) {
      req.session.user = row;
      res.json({
        success: true,
      });
    } else {
      res.json({
        success: false,
      });
    }
  });
});

app.listen(process.env.PORT || 8080, () => console.log("Server is listening"));
