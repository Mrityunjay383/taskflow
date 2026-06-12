import * as AuthService from "./auth.service";
import {generateToken} from "../../utils/jwt";
import {AuthContext, RequestContext} from "../../types";

export const register = async ({body}: RequestContext) => {
    const {email, password} = body;

    const result = await AuthService.createUser({email, password});

    const token = generateToken(result.id);

    return {
        success: true,
        statusCode: 201,
        data: result,
        token,
    };
};

export const login = async ({body}: RequestContext) => {
    const {email, password} = body;

    const result = await AuthService.loginUser({email, password});

    const token = generateToken(result.id);

    return {
        success: true,
        data: {
            id: result.id,
            email: result.email,
            role: result.role,
        },
        auth: {
            token,
        },
        message: "Login successful",
    };
};

export const logout = async () => {
    return {
        success: true,
        auth: {
            clearToken: true,
        },
        message: "Logged out successfully",
    };
};

export const me = async ({ user }: AuthContext) => {
    return AuthService.getUserById({
        id: user.userId,
    });
};