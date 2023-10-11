import mongoose, { model as _model } from "mongoose";
import mongooseIntl from 'mongoose-intl';
import { autoIncrement } from 'mongoose-plugin-autoinc';
import existPlugin from '../../plugins/Existplugin';
import localize from '../../plugins/localizeall';

const { Schema } = mongoose;

const regionSchema = new Schema({
  Name:  {type: String, intl: true },
  _id : Number,
  City :{
  type: Number,
  ref: 'citymodel',
  } , 
  deleted: {type: Boolean, 
    default: false}
},{versionKey:false, toJSON: {
    virtuals: true,
    transform: function(doc, ret){
        ret.id = ret._id
        delete ret._id

    }
}, timestamps: true});
regionSchema.plugin(autoIncrement, {
    model: 'region',
    startAt: 1
});
regionSchema.plugin(existPlugin);
regionSchema.plugin(mongooseIntl, { languages: ['en', 'ar'], defaultLanguage: 'en'});
regionSchema.plugin(localize);
const regionmodel = _model('regionmodel', regionSchema);


export default regionmodel;