export type PreferencesStore = {
    sidebarCollapsed: boolean;
    currentWorkspaceId: string | null;

    toggleSidebar: () => void;

    setSidebarCollapsed: (collapsed: boolean) => void;

    setCurrentWorkspace: (workspaceId: string) => void;
};
