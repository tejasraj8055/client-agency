import mongoose from 'mongoose';

const AgencySchema = new mongoose.Schema(
  {
    aName: {
      type: String,
      trim: true,
      required: [true, 'Kindly enter agency name'],
      maxlength: [50, 'Name can not be more than 50 characters'],
    },
    address1: {
      type: String,
      required: [true, 'kindly enter address'],
      maxlength: [50, 'Address can not be more than 50 characters'],
    },
    address2: {
      type: String,
      maxlength: [50, 'Address can not be more than 50 characters'],
    },
    state: {
      type: String,
      maxlength: [20, 'State can not be more than 20 characters'],
    },
    city: {
      type: String,
      maxlength: [20, 'State can not be more than 20 characters'],
    },
    aPhoneNumber: {
      type: Number,
      maxlength: [20, 'Phone Number can not be more than 20 characters'],
    },
  },
  { timestamps: true }
);

const Agency = mongoose.model('Agency', AgencySchema);

export default Agency;
