import { generateToken } from "../../utils/jwt";
import { AuthContext, RequestContext } from "../../types";
import * as UserService from "../../service/user";
import { AppError } from "../../utils/AppError";
import { currentUserSelect, toCurrentUser } from "./auth.helper";
import { comparePassword } from "../../utils/password";

export const checkUserName = async ({ query }: RequestContext) => {
    const { userName } = query;

    const exist = await UserService.getUserByUsername(userName);

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

    const existing = await UserService.getByUsernameOrEmail({ userName, email });

    if (existing?.email === email) {
        throw new AppError({
            message: "Email already exists",
            errorCode: "EMAIL_EXISTS",
            statusCode: 400,
        });
    }

    if (existing?.userName === userName) {
        throw new AppError({
            message: "Username already exists",
            errorCode: "USERNAME_EXISTS",
            statusCode: 400,
        });
    }

    const user = await UserService.createUser({
        email,
        password,
        userName,
        select: currentUserSelect,
    });

    const token = generateToken(user.id);

    return {
        success: true,
        statusCode: 201,
        data: toCurrentUser(user),
        auth: {
            token,
        },
    };
};

export const login = async ({ body }: RequestContext) => {
    const { identifier, password } = body;

    const user = await UserService.getByUsernameOrEmailSelect({
        identifier,
    });

    if (!user || !(await comparePassword(password, user.password))) {
        throw new AppError({
            message: "Invalid email/username or password",
            errorCode: "INVALID_CREDS",
            statusCode: 400,
        });
    }

    const token = generateToken(user.id);

    return {
        success: true,
        statusCode: 201,
        data: toCurrentUser(user),
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
    const fetchedUser = await UserService.getById({ userId: user.userId });

    if (!user) {
        throw new AppError({
            statusCode: 401,
            message: "User not found.",
            errorCode: "USER_NOT_FOUND",
        });
    }

    return {
        success: true,
        data: toCurrentUser(fetchedUser),
    };
};
