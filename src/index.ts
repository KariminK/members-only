import express, { urlencoded } from "express";
import indexRouter from "./routes/indexRouter";
import session from "express-session";
import path from "path";
import passport from "passport";
import local from "passport-local";
import connectPgSimple from "connect-pg-simple";
import pool from "./db/pool";
import UserModel from "./models/UserModel";
import bcrypt from "bcryptjs";
const LocalStrategy = local.Strategy;
const app = express();
const userModel = new UserModel();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

passport.use(
  new LocalStrategy(async (email, password, done) => {
    try {
      const { rows } = await userModel.getUserByEmail(email);
      const user = rows[0];

      if (!user) return done(null, false, { message: "Invalid email" });
      else if (!(await bcrypt.compare(password, user.password)))
        return done(null, false, { message: "Invalid password" });
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

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

app.use("/", indexRouter);

app.listen(3001, () => {
  console.log("Server listening! PORT: 3001");
});
