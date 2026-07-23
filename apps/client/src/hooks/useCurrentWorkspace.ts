"use client";

import { useEffect, useMemo } from "react";

import { useWorkspaces } from "@/features/workspace/workspace.queries";
import { usePreferencesStore } from "@/stores/ui-preferences.store";

export function useCurrentWorkspace() {
    const { data: workspaces = [], isPending, isError, refetch } = useWorkspaces();

    const currentWorkspaceId = usePreferencesStore((state) => state.currentWorkspaceId);

    const setCurrentWorkspace = usePreferencesStore((state) => state.setCurrentWorkspace);

    const currentWorkspace = useMemo(() => {
        if (!workspaces.length) {
            return null;
        }

        if (!currentWorkspaceId) {
            return workspaces[0];
        }

        return workspaces.find((workspace) => workspace.id === currentWorkspaceId) ?? workspaces[0];
    }, [workspaces, currentWorkspaceId]);

    useEffect(() => {
        if (currentWorkspace && currentWorkspace.id !== currentWorkspaceId) {
            setCurrentWorkspace(currentWorkspace.id);
        }
    }, [currentWorkspace, currentWorkspaceId, setCurrentWorkspace]);

    const switchWorkspace = (workspaceId: string) => {
        if (workspaceId === currentWorkspaceId) {
            return;
        }

        setCurrentWorkspace(workspaceId);

        // Future:
        // queryClient.invalidateQueries(...)
        // router.refresh()
    };

    return {
        workspaces,
        currentWorkspace,
        switchWorkspace,

        isLoading: isPending,
        isError,
        refetch,
    };
}
