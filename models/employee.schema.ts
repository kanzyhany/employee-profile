import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import { EmploymentType } from '../enums/employee.enum';

export type EmployeeDocument = HydratedDocument<Employee>

@Schema({ timestamps: true })
export class Employee {
  //basics
  @Prop({ required: true, unique: true })
  employeeId: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })
  emailOfficial: string;

  @Prop()
  emailPersonal?: string;

  //contact and personal info
  @Prop({ required: true })
  phoneNumber: string;

  @Prop({
    type: {
      street: String,
      city: String,
      country: String,
      postalCode: String,
    },
    required: true,
  })
  address: {
    street: string;
    city: string;
    country: string;
    postalCode: string;
  };

  @Prop()
  bio?: string;

  @Prop({required: true})
  profilePhoto: string; //url - filename

  @Prop({required: true})
  dateOfBirth: Date;

  @Prop()
  gender?: string;

  //education (BR 3h)
  @Prop({
    type: [
      {
        degree: String,
        fieldOfStudy: String,
        institution: String,
        graduationYear: Number,
      },
    ],
    default: [],
  })
  education: {
    degree: string;
    fieldOfStudy: string;
    institution: string;
    graduationYear: number;
  }[];

  //job and department (Org Structure input)
  @Prop()
  department?: string; //import from rom Org Structure module

  @Prop()
  position?: string; //import from org Structure module

  @Prop({
    type: String,
    enum: EmploymentType,
    default: EmploymentType.FULL_TIME,
  })
  employmentType: EmploymentType;

  @Prop()
  hireDate?: Date;

  //Performance Data (import from Performance module)
  @Prop({
    type: [
      {
        date: Date,
        type: String,
        score: Number,
      },
    ],
    default: [],
  })
  appraisalHistory: {
    date: Date;
    type: string;
    score: number;
  }[];

  //(??)
  // 🛠 Correction Requests (US-E6-02)
  @Prop({
    type: [
      {
        fieldName: String,
        oldValue: String,
        requestedValue: String,
        status: {
          type: String,
          enum: ['Pending', 'Approved', 'Rejected'],
          default: 'Pending',
        },
        requestedAt: { type: Date, default: Date.now },
        reviewedAt: { type: Date },
      },
    ],
    default: [],
  })
  pendingCorrectionRequests: {
    fieldName: string;
    oldValue: string;
    requestedValue: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    requestedAt: Date;
    reviewedAt?: Date;
  }[];

  // 🧾 Role & Metadata (BR 20a)
  @Prop({
    type: String,
    enum: ['Employee', 'Manager', 'HR'],
    default: 'Employee',
  })
  role: 'Employee' | 'Manager' | 'HR';
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
