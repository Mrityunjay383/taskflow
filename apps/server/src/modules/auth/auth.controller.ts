import { generateToken } from "../../utils/jwt";
import { AuthContext, RequestContext } from "../../types";
import * as AuthService from "../../service/user";

export const checkUserName = async ({ query }: RequestContext) => {
    const { userName } = query;

    const exist = await AuthService.getUserByUsername(userName);

    return {
        success: true,
        statusCode: 200,
        data: {
            available: !exist,
        },
    };
};

export const register = async ({ body }: RequestContext) => {
    const { email, password, userName } = body;

    const result = await AuthService.createUser({ email, password, userName });

    const token = generateToken(result.id);

    return {
        success: true,
        statusCode: 201,
        data: result,
        auth: {
            token,
        },
    };
};

export const login = async ({ body }: RequestContext) => {
    const { identifier, password } = body;

    const result = await AuthService.loginUser({
        identifier,
        password,
    });

    const token = generateToken(result.id);

    return {
        success: true,
        statusCode: 201,
        data: result,
        auth: {
            token,
        },
    };
};

export const logout = async () => {
    return {
        success: true,
        auth: {
            clearToken: true,
        },
    };
};

export const me = async ({ user }: AuthContext) => {
    const existed = await AuthService.getCurrentUser({
        userId: user.userId,
    });

    return {
        success: true,
        data: existed,
    };
};
