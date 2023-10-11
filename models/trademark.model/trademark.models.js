import mongoose, { model as _model } from "mongoose";
import mongooseIntl from 'mongoose-intl';
const { Schema } = mongoose;
import { autoIncrement } from 'mongoose-plugin-autoinc';
import existPlugin from '../../plugins/Existplugin';
import localize from '../../plugins/localizeall';
const trademarkSchema = new Schema({
  Name:  {type: String, intl: true }, 
  _id : Number,
  category : {
    type: Number,
    ref: 'categorymodel',
  },
  deleted: {type: Boolean, 
    default: false}
},{versionKey:false, toJSON: {
  virtuals: true,
    transform: function(doc, ret){
        ret.id = ret._id
        delete ret._id

    }
}, timestamps: true});
trademarkSchema.plugin(autoIncrement, {
    model: 'trademark',
    startAt: 1
});
trademarkSchema.plugin(existPlugin);
trademarkSchema.plugin(localize);
trademarkSchema.plugin(mongooseIntl, { languages: ['en', 'ar'], defaultLanguage: 'en' });
const trademarkmodel = _model('trademarkmodel', trademarkSchema);

export default trademarkmodel;