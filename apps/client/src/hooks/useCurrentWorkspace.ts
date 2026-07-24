"use client";

import { useEffect, useMemo } from "react";

import { useWorkspaces } from "@/features/workspace/workspace.queries";
import { usePreferencesStore } from "@/stores/ui-preferences.store";

export function useCurrentWorkspace() {
    const { data: workspaces = [], isPending, isError, refetch } = useWorkspaces();

    const currentWorkspaceId = usePreferencesStore((state) => state.currentWorkspaceId);

    const setCurrentWorkspaceId = usePreferencesStore((state) => state.setCurrentWorkspaceId);

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
            setCurrentWorkspaceId(currentWorkspace.id);
        }
    }, [currentWorkspace, currentWorkspaceId, setCurrentWorkspaceId]);

    const switchWorkspace = (workspaceId: string) => {
        if (workspaceId === currentWorkspaceId) {
            return;
        }

        setCurrentWorkspaceId(workspaceId);

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
