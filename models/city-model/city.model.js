import mongoose, { model as _model } from "mongoose";
import mongooseIntl from 'mongoose-intl';
import { autoIncrement } from 'mongoose-plugin-autoinc';
import existPlugin from '../../plugins/Existplugin';
import localize from '../../plugins/localizeall';
const { Schema } = mongoose;

const citySchema = new Schema({
  Name:  {type: String, intl: true },
  _id : Number,
  deleted: {type: Boolean, 
    default: false}
},{versionKey:false, toJSON: {
    virtuals: true,
    transform: function(doc, ret){
        ret.id = ret._id
        delete ret._id

    }
}, timestamps: true});
citySchema.plugin(autoIncrement, {
    model: 'city',
    startAt: 1
});
citySchema.plugin(existPlugin);
citySchema.plugin(mongooseIntl, { languages: ['en', 'ar'], defaultLanguage: 'en'});
citySchema.plugin(localize);
const citymodel = _model('citymodel', citySchema);


export default citymodel;