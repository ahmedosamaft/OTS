import mongoose, { model as _model } from "mongoose";
import mongooseIntl from 'mongoose-intl';
const { Schema } = mongoose;
import { autoIncrement } from 'mongoose-plugin-autoinc';
import existPlugin from '../../plugins/Existplugin';
import localize from '../../plugins/localizeall';
const appsettingsSchema = new Schema({
  SocialLinks : {
    _id:false,
    "Gmail": String,
    "Whatsapp": String,
    "Facebook": String,
    "Snapchat": String,
    "Twitter": String,
    "Outlook": String,
},
  Address: String,
  Latitude: Number,
  Longitude: Number,
  _id: Number,
  AboutUs: {type: String, intl: true },
  InstructionOfUse: {type: String, intl: true },
  PrivacyPolicy: {type: String, intl: true },
  image : String,
  AndroidUrl: String,
  IosUrl: String
}, {versionKey:false, toJSON: {
  virtuals: true
}})
appsettingsSchema.plugin(existPlugin);
appsettingsSchema.plugin(localize);
appsettingsSchema.plugin(mongooseIntl, { languages: ['en', 'ar'], defaultLanguage: 'en' });
const appsettingsmodel = _model('appsettingsmodel', appsettingsSchema);

export default appsettingsmodel;