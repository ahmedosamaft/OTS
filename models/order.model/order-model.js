import mongoose, { model as _model } from "mongoose";
import mongooseIntl from 'mongoose-intl';
const { Schema } = mongoose;
import { autoIncrement } from 'mongoose-plugin-autoinc';
import existPlugin from '../../plugins/Existplugin';
import {addressSchema} from "../../models/address.model/address-model";
import { paymentenum } from "./paymentmethods";
import { statusenum } from "./status";
const orderSchema = new Schema({
  address: {
    name:String,
    phonenumber: String,
    region: {type: Number, ref: 'regionmodel'},
    street: String,
    details: String,
    user:  {type: Number, ref: 'user' },
    latitude: Number,
    longitude: Number,
    _id: false},
  products: [{
    productid: {type: Number, ref: 'productmodel' },
    quantity: Number,
    price: Number,
    offer: Number,
  }],
  totalprice: Number,
  taxes: Number,
  totalpriceaftertaxes: Number,
  user:  {type: Number, ref: 'user' },
  notes: String,
  paymentmethods: {
   type: String,
   enum: paymentenum
  },
  status: {
    type: String,
    enum: statusenum,
    default: "waiting"
  },
  rejectreason: String,
  deleted: {type: Boolean,
    default: false},
  _id: Number,
}, {versionKey:false, toJSON: {
    virtuals: true,
    transform: function(doc, ret){
        ret.id = ret._id
        delete ret._id

    }
}, timestamps: true});
orderSchema.plugin(autoIncrement, {
    model: 'order',
    startAt: 1
});
orderSchema.plugin(existPlugin);
orderSchema.plugin(mongooseIntl, { languages: ['en', 'ar'], defaultLanguage: 'en' });
const ordermodel = _model('ordermodel', orderSchema);

export default ordermodel;