import mongoose, { Document, Schema } from "mongoose";

interface IRequestACourse extends Document {
  name: string;
  company: string;
  email: string;
  phonePrefix: string;
  phoneNumber: string;
  message: string;
}

const RequestACourseSchema: Schema<IRequestACourse> =
  new Schema<IRequestACourse>(
    {
      name: { type: String, required: true },
      company: { type: String, required: true },
      email: { type: String, required: true },
      phonePrefix: { type: String, required: true },
      phoneNumber: { type: String, required: true },
      message: { type: String, required: true },
    },
    { timestamps: true },
  );

const RequestACourse =
  mongoose.models.RequestACourse ||
  mongoose.model<IRequestACourse>(
    "RequestACourse",
    RequestACourseSchema,
    "requestacourses",
  );

export { RequestACourse, RequestACourseSchema };
export type { IRequestACourse };
