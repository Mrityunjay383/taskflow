export type PreferencesStore = {
    sidebarCollapsed: boolean;
    currentWorkspaceId: string | null;

    toggleSidebar: () => void;

    setSidebarCollapsed: (collapsed: boolean) => void;

    setCurrentWorkspaceId: (workspaceId: string | null) => void;
};
