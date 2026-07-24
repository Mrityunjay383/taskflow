import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PreferencesStore } from "@/stores/types.store";

export const usePreferencesStore = create<PreferencesStore>()(
    persist(
        (set) => ({
            sidebarCollapsed: false,
            currentWorkspaceId: null,

            toggleSidebar: () =>
                set((state) => ({
                    sidebarCollapsed: !state.sidebarCollapsed,
                })),

            setSidebarCollapsed: (collapsed) =>
                set({
                    sidebarCollapsed: collapsed,
                }),

            setCurrentWorkspaceId: (workspaceId) =>
                set({
                    currentWorkspaceId: workspaceId,
                }),
        }),
        {
            name: "taskflow-preferences",
            partialize: (state) => ({
                sidebarCollapsed: state.sidebarCollapsed,
                currentWorkspaceId: state.currentWorkspaceId,
            }),
        },
    ),
);
