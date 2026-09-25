import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEFAULT_ROLE_ID, getRole } from "./roles";

interface SessionState {
  userName: string;
  roleId: string;
  setRoleId: (id: string) => void;
}

/**
 * No hay autenticación real (Etapa 5, pendiente de backend). Este store solo
 * simula "con qué rol estoy viendo la plataforma ahora" para que el menú de
 * usuario y los accesos rápidos por rol sean funcionales en el prototipo.
 * Se persiste en localStorage únicamente para que un refresh no borre la
 * elección de rol de la demo — no es sesión real ni dato compartido.
 */
export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      userName: "Carlos Aquino",
      roleId: DEFAULT_ROLE_ID,
      setRoleId: (id) => set({ roleId: id }),
    }),
    { name: "fur-demo-session" }
  )
);

export function useCurrentRole() {
  const roleId = useSessionStore((s) => s.roleId);
  return getRole(roleId);
}
