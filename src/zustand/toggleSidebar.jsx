import { create } from "zustand";

export const useToggleSideBar = create((set) => ({
    collapsed: false,
    setCollapsed: () => set((state) => ({ collapsed: !state.collapsed })),
}));
