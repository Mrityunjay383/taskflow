import * as AuthService from "./auth.service";
import {generateToken} from "../../utils/jwt";
import {AuthContext, RequestContext} from "../../types";

export const register = async ({body}: RequestContext) => {
    const {email, password} = body;

    const result = await AuthService.createUser({email, password});

    if (!result.success) return result;

    const token = generateToken(result.data.id);

    return {
        success: true,
        statusCode: 201,
        data: result.data,
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