import mongoose, { Schema, Document } from 'mongoose';

export interface UserModel {
    email: string;
    password: string;
}
export interface User extends Document {
    email: string;
    password: string;
}

const UserSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

export const User = mongoose.models.User || mongoose.model<User>('User', UserSchema);