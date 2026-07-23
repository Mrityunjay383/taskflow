"use client";

import { usePreferencesStore } from "@/stores/ui-preferences.store";

export function useSidebar() {
    const collapsed = usePreferencesStore((state) => state.sidebarCollapsed);

    const toggle = usePreferencesStore((state) => state.toggleSidebar);

    return {
        collapsed,
        toggle,
    };
}
