import express from 'express';
require('express-async-errors');
import passport from 'passport';
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
const PgSession = connectPgSimple(session);
const app = express();
const cors = require('cors');
import { PrismaClient } from '@prisma/client';
import { Strategy as LocalStrategy } from './libs/strategy';
import { authorize } from './middleware/authMiddleware';
import { $Enums } from '@prisma/client';
import signupController from './app/auth/signup/signup-controller';
import logoutController from './app/auth/logout/logout-controller';
import loginController from './app/auth/login/login-controller';
import usersController from './app/users/users-controller';

const prisma = new PrismaClient();

app.use(cors());
// app.use(express.static('dist'));
app.use(express.json());

app.use(
  session({
    store: new PgSession({}),
    secret: 'replaceme',
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(LocalStrategy);

app.use(signupController);
app.use(loginController);
app.use(logoutController);
app.use('/api/admin', authorize($Enums.Role.manager), usersController);

module.exports = app;