import mongoose from "mongoose";
import bcrypt from "bcryptjs";

interface IUser {
    name: string;
    password: string;
    email: string;
}

interface IUserDocument extends IUser, mongoose.Document {
    _id: mongoose.Types.ObjectId;
    matchPassword(enteredPassword: string): Promise<boolean>;
}

interface IUserModel extends mongoose.Model<IUserDocument> {}

const userSchema = new mongoose.Schema<IUserDocument>({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
});

// Hash the password before saving the user
userSchema.pre("save", async function (next) {
    try {
        if (this.isModified("password")) {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        }
        next();
    } catch (err: any) {
        next(err);
    }
});

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword: string) {
    try {
        return await bcrypt.compare(enteredPassword, this.password);
    } catch (err: any) {
        throw new Error("Password comparison failed");
    }
};

export default mongoose.model<IUserDocument, IUserModel>("User", userSchema);
