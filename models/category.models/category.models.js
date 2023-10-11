import mongoose, { model as _model } from "mongoose";
import mongooseIntl from 'mongoose-intl';
import { autoIncrement } from 'mongoose-plugin-autoinc';
import existPlugin from '../../plugins/Existplugin';
import localize from '../../plugins/localizeall';
const { Schema } = mongoose;

const categorySchema = new Schema({
  Name:  {type: String, intl: true },
  image :  String,
  _id : Number,
  parent : {
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
categorySchema.plugin(autoIncrement, {
    model: 'category',
    startAt: 1
});
categorySchema.plugin(existPlugin);
categorySchema.plugin(mongooseIntl, { languages: ['en', 'ar'], defaultLanguage: 'en'});
categorySchema.plugin(localize);
const categorymodel = _model('categorymodel', categorySchema);


export default categorymodel;