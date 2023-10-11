import mongoose, { model as _model } from "mongoose";
import mongooseIntl from 'mongoose-intl';
import { autoIncrement } from 'mongoose-plugin-autoinc';
import existPlugin from '../../plugins/Existplugin';
const { Schema } = mongoose;

const ratesSchema = new Schema({
  user:  {type: Number, ref: 'user' },
  product: {type: Number, ref: 'productmodel'},
  rate: Number,
  _id : Number,
},{versionKey:false, toJSON: {
    virtuals: true,
    transform: function(doc, ret){
        ret.id = ret._id
        delete ret._id

    }
}, timestamps: true});
ratesSchema.plugin(autoIncrement, {
    model: 'rate',
    startAt: 1
});
ratesSchema.plugin(existPlugin);
ratesSchema.plugin(mongooseIntl, { languages: ['en', 'ar'], defaultLanguage: 'en'});
const ratesmodel = _model('ratesmodel', ratesSchema);


export default ratesmodel;