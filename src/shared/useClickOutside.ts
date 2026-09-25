import { useEffect, type RefObject } from "react";

/**
 * Cierra un panel flotante (dropdown/menú) al hacer click fuera o presionar
 * Escape. Acepta una o varias refs "internas" (por ejemplo el botón disparador
 * y, si el panel se renderiza en un portal, el propio panel) — un click cuenta
 * como "afuera" solo si cae fuera de todas ellas.
 */
export function useClickOutside(
  refs: RefObject<HTMLElement | null> | RefObject<HTMLElement | null>[],
  active: boolean,
  onClose: () => void
) {
  const refList = Array.isArray(refs) ? refs : [refs];

  useEffect(() => {
    if (!active) return;
    function onClickOutside(e: MouseEvent) {
      const inside = refList.some((r) => r.current && r.current.contains(e.target as Node));
      if (!inside) {
        onClose();
      }
    }
    function onEscape(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEscape);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);
}
