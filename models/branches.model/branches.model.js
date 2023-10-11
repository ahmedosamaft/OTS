import mongoose, { model as _model } from "mongoose";
import mongooseIntl from 'mongoose-intl';
const { Schema } = mongoose;
import { autoIncrement } from 'mongoose-plugin-autoinc';
import existPlugin from '../../plugins/Existplugin';
import localize from '../../plugins/localizeall';
const branchesSchema = new Schema({
  Name: {type: String, intl: true },
  PhoneNumber: String,
  Address: String,
  Latitude: Number,
  Longitude: Number,
  _id: Number,
}, {versionKey:false, toJSON: {
    virtuals: true,
    transform: function(doc, ret){
        ret.id = ret._id
        delete ret._id

    }
}, timestamps: true});
branchesSchema.plugin(autoIncrement, {
    model: 'branches',
    startAt: 1
});
branchesSchema.plugin(existPlugin);
branchesSchema.plugin(localize);
branchesSchema.plugin(mongooseIntl, { languages: ['en', 'ar'], defaultLanguage: 'en' });
const branchesmodel = _model('branchesmodel', branchesSchema);

export default branchesmodel;