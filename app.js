import createError from 'http-errors';
import express from 'express';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mainRouter from "./routes/main.routes/main";
import config from './config'
import i18n from "i18n-express";
import i18next, { use } from 'i18next';
import Backend from 'i18next-fs-backend';
import { LanguageDetector, handle } from 'i18next-http-middleware';
import cors from "cors"
import passport from 'passport';

import mongoose from "mongoose";

use(Backend)
  .use(LanguageDetector)
  .init({
    backend: {
      loadPath: __dirname + '/locales/{{lng}}/{{ns}}.json'
    },
    ns: ['translation'],
    fallbackLng: 'en',
    supportedLngs:['en','ar'],
    preload: ['en', 'ar'],
    debug:false,
    detection: {
      order: ['header'],

      lookupHeader: 'accept-language',
      caches: false,

    }
  });
let app = express();
mongoose.connect(config.mongodblink,()=>{
  console.log("DB is Running")
})
// view engine setup
app.use(handle(i18next));
app.use(cors())
app.use(logger('dev'));
app.use(passport.initialize())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
mainRouter.use(express.static(join(__dirname, 'public')));

app.use('/api', mainRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
 console.log(err)
 
});

export default app;
