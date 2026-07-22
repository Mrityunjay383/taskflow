"use client";

import { useEffect, useMemo } from "react";

import { useWorkspaces } from "@/features/workspace/workspace.queries";

const STORAGE_KEY = "current-workspace-id";

export function useCurrentWorkspace() {
    const query = useWorkspaces();

    const workspaces = query.data ?? [];

    const currentWorkspace = useMemo(() => {
        if (!workspaces.length) {
            return null;
        }

        const storedId = localStorage.getItem(STORAGE_KEY);

        const storedWorkspace = workspaces.find((workspace) => workspace.id === storedId);

        return storedWorkspace ?? workspaces[0];
    }, [workspaces]);

    useEffect(() => {
        if (!currentWorkspace) {
            return;
        }

        localStorage.setItem(STORAGE_KEY, currentWorkspace.id);
    }, [currentWorkspace]);

    const setCurrentWorkspace = (workspaceId: string) => {
        localStorage.setItem(STORAGE_KEY, workspaceId);
    };

    return {
        ...query,
        workspaces,
        currentWorkspace,
        setCurrentWorkspace,
    };
}
