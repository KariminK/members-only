import express, { urlencoded } from "express";
import indexRouter from "./routes/indexRouter";
import session from "express-session";
import path from "path";
import passport from "passport";
import * as passportStrategy from "passport-local";
import connectPgSimple from "connect-pg-simple";
import pool from "./db/pool";
import UserModel from "./models/UserModel";
import bcrypt from "bcryptjs";
import "./types/index";
import { config } from "dotenv";

config();
const LocalStrategy = passportStrategy.Strategy;
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const { rows } = await UserModel.getUserByEmail(email);
        const user = rows[0];
        console.log(user);

        if (!user) return done(null, false, { message: "Invalid email" });

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch)
          return done(null, false, { message: "Invalid password" });
        console.log("[log] User logged in");
        return done(null, user);
      } catch (error) {
        console.log("[error] " + error);
        return done(error);
      }
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id: number, done) => {
  try {
    const { rows } = await UserModel.getUser(id);
    const user = rows[0];
    return done(null, user);
  } catch (error) {
    done(error);
  }
});

app.use(
  session({
    secret: "mySecret",
    resave: false,
    saveUninitialized: false,
    store: new (connectPgSimple(session))({
      pool: pool,
      createTableIfMissing: true,
    }),
  })
);
app.use(passport.session());
app.use(urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

app.listen(process.env.PORT, () => {
  console.log("Server listening! PORT: " + process.env.PORT);
});
