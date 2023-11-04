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
import errorMiddleware from './middleware/errorMiddleware';
import signupController from './app/auth/signup/signup-controller';
import logoutController from './app/auth/logout/logout-controller';
import loginController from './app/auth/login/login-controller';
import usersController from './app/users/users-controller';
import issuesController from './app/issues/admin/issues-controller';
import propertiesController from './app/properties/properties-controller';
import unitsController from './app/units/units-controller';
import notificationsController from './app/notifications/notifications-controller';

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
app.use(issuesController);
app.use(propertiesController);
app.use(notificationsController);
app.use('/api/admin', authorize($Enums.Role.manager), usersController);
app.use('/api/admin', authorize($Enums.Role.manager), unitsController);

app.use('*', (req, res) => {
	res.status(404).json({ msg: 'not found' });
});
app.use(errorMiddleware);

module.exports = app;