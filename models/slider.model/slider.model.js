import mongoose, { model as _model } from "mongoose";
import mongooseIntl from 'mongoose-intl';
import { autoIncrement } from 'mongoose-plugin-autoinc';
import existPlugin from '../../plugins/Existplugin';
import localize from '../../plugins/localizeall';
import { slidertypesenum, slidertypes } from './slidertypes';
const { Schema } = mongoose;

const sliderSchema = new Schema({
  image: String,
  _id: Number,
  category: {
    type: Number,
    ref: 'categorymodel'

  },
  subcategory: {
    type: Number,
    ref: 'categorymodel'
  },
  product:{type: Number, ref: 'productmodel'},
  type: {
    type: String,
    enum: slidertypesenum
  },
}, {
  versionKey: false, toJSON: {
    virtuals: true,
    transform: function (doc, ret) {
      ret.id = ret._id
      delete ret._id

    }
  }, timestamps: true
});
sliderSchema.plugin(autoIncrement, {
  model: 'slider',
  startAt: 1
});
sliderSchema.plugin(existPlugin);
sliderSchema.plugin(mongooseIntl, { languages: ['en', 'ar'], defaultLanguage: 'en' });
sliderSchema.plugin(localize);
const slidermodel = _model('slidermodel', sliderSchema);


export default slidermodel;