import mongoose, { model as _model } from "mongoose";
import mongooseIntl from 'mongoose-intl';
const { Schema } = mongoose;
import { autoIncrement } from 'mongoose-plugin-autoinc';
import existPlugin from '../../plugins/Existplugin';
const addressSchema = new Schema({
  name:String,
  phonenumber: String,
  region: {type: Number, ref: 'regionmodel'},
  street: String,
  details: String,
  user:  {type: Number, ref: 'user' },
  latitude: Number,
  longitude: Number,
  _id: Number,
  deleted: {type: Boolean, 
    default: false}
  },{versionKey:false, toJSON: {
    virtuals: true,
    transform: function(doc, ret){
        ret.id = ret._id
        delete ret._id

    }
}, timestamps: true});
addressSchema.plugin(autoIncrement, {
    model: 'address',
    startAt: 1
});
addressSchema.plugin(existPlugin);
addressSchema.plugin(mongooseIntl, { languages: ['en', 'ar'], defaultLanguage: 'en' });
const addressmodel = _model('addressmodel', addressSchema);

export {addressmodel, addressSchema};