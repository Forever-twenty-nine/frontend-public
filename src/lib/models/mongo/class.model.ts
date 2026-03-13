import mongoose, { Schema, ObjectId } from "mongoose";

export interface IClass {
  _id: ObjectId;
  course?: ObjectId | string;
  courseId?: ObjectId | string;
  title?: string;
  description?: string;
  startDate?: Date;
  duration?: number;
}

export const ClassSchema: Schema<IClass> = new Schema<IClass>(
  {
    course: { type: Schema.Types.ObjectId, ref: "Course" },
    courseId: { type: Schema.Types.ObjectId, ref: "Course" },
    title: { type: String },
    description: { type: String },
    startDate: { type: Date },
    duration: { type: Number, min: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Class =
  mongoose.models.Class ||
  mongoose.model<IClass>("Class", ClassSchema, "classes");
export { Class };
