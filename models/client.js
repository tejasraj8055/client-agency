import mongoose from 'mongoose';

const ClientSchema = new mongoose.Schema(
  {
    agency: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Agency',
      required: [true, 'Kindly add agency Id'],
    },
    cName: {
      type: String,
      trim: true,
      unique: true,
      required: [true, 'Kindly add client name'],
    },
    cEmail: {
      type: String,
      unique: true,
      required: [true, 'Please enter an email'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    cPhoneNumber: {
      type: Number,
      required: [true, 'Please enter an phone number'],
      maxlength: [20, 'Phone Number can not be more than 20 characters'],
    },
    totalBill: {
      type: Number,
      required: [true, 'Please enter an total bill'],
    },
  },
  { timestamps: true }
);

const Client = mongoose.model('Client', ClientSchema);

export default Client;
