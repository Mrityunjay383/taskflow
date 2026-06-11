import * as AuthService from "./auth.service";
import {generateToken} from "../../utils/jwt";
import {AuthContext, RequestContext} from "../../types";

export const signup = async ({body}: RequestContext) => {
    const {email, password} = body;

    const result = await AuthService.createUser({email, password});

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

export const login = async ({body}: RequestContext) => {
    const {email, password} = body;

    const result = await AuthService.loginUser({email, password});

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

export const me = async ({user}: AuthContext) => {
    if (!user?.userId) {
        return {
            success: false,
            statusCode: 401,
            message: "Unauthorized",
        };
    }

    const result = await AuthService.getUserById({id: user.userId});

    return result;
};