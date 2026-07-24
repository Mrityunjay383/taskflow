import { logout } from "@/features/auth/auth.api";
import { queryClient } from "@/lib/queryClient";
import { usePreferencesStore } from "@/stores/ui-preferences.store";

export const userLogout = async ({
    invalidateUser,
}: {
    invalidateUser: boolean;
}): Promise<void> => {
    await logout();

    usePreferencesStore.getState().setCurrentWorkspaceId(null);

    if (invalidateUser) {
        await queryClient.invalidateQueries({
            queryKey: ["me"],
        });
    }
};
