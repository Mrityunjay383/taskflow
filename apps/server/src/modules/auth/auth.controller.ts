import {createUser, getUserById, loginUser} from "./auth.service";
import {generateToken} from "../../utils/jwt";

export const signup = async ({body}: any) => {
    const {email, password} = body;

    const result = await createUser({email, password});

    if (!result.success) return result;

    const token = generateToken(result.data.id);

    return {
        success: true,
        statusCode: 201,
        data: result.data,
        message: "User created successfully",
        token,
    };
};

export const login = async ({body}: any) => {
    const {email, password} = body;

    const result = await loginUser({email, password});

    if (!result.success) return result;

    const token = generateToken(result.data.id);

    return {
        success: true,
        data: result.data,
        message: "Login successful",
        token,
    };
};

export const logout = async () => {
    return {
        success: true,
        data: {
            message: "Logged out successfully"
        },
        clearCookie: true,
    };
};

export const me = async ({user}: any) => {
    if (!user?.userId) {
        return {
            success: false,
            statusCode: 401,
            message: "Unauthorized",
        };
    }

    const result = await getUserById({id: user.userId});

    return result;
};