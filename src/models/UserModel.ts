import mongoose, { Schema, Document } from 'mongoose';


export interface User extends Document {
    email: string;
    password: string | null;
    provider?: string | 'credentials',
    providerId?: string | null;
    isVerified?: boolean;
    verifyEmailToken?: string | null;
    verifyEmailExpires?: Date | null;
    resetPasswordToken?: string | null;
    resetPasswordExpires?: Date | null;
    credits?: number;
}

const UserSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, default: null },
    provider: { type: String, default: 'credentials' },
    providerId: { type: String, default: null },
    isVerified: { type: Boolean, default: false },
    verifyEmailToken: { type: String, default: null },
    verifyEmailExpires: { type: Date, default: null },
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null },
    credits: { type: Number, default: 0 }
});

export const User = mongoose.models.User || mongoose.model<User>('User', UserSchema);