import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./RbacRowActionsMenu.css";

function RbacRowActionsMenu({ row, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });
  const wrapRef = useRef(null);
  const triggerRef = useRef(null);
  const menuRef = useRef(null);

  const updatePosition = useCallback(() => {
    const el = triggerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const menuWidth = 180;
    setMenuPos({
      top: rect.bottom + 6,
      left: Math.max(8, rect.right - menuWidth),
    });
  }, []);

  useEffect(() => {
    if (!open) return;
    updatePosition();
    const onScroll = () => updatePosition();
    const onResize = () => updatePosition();
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onResize);
    };
  }, [open, updatePosition]);

  useEffect(() => {
    const handlePointerDown = (event) => {
      const target = event.target;
      if (wrapRef.current?.contains(target) || menuRef.current?.contains(target)) {
        return;
      }
      setOpen(false);
    };
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  const handleToggle = () => {
    if (!open) {
      requestAnimationFrame(() => updatePosition());
    }
    setOpen((prev) => !prev);
  };

  const handleEdit = () => {
    onEdit?.(row);
    setOpen(false);
  };

  const handleDelete = () => {
    onDelete?.(row);
    setOpen(false);
  };

  const menu = open ? (
    <div
      ref={menuRef}
      className="rbac-row-actions__menu rbac-row-actions__menu--open"
      role="menu"
      style={
        {
          '--rbac-row-menu-top': `${menuPos.top}px`,
          '--rbac-row-menu-left': `${menuPos.left}px`,
        }
      }
    >
      <button type="button" className="rbac-row-actions__item" role="menuitem" onClick={handleEdit}>
        Edit
      </button>
      <button
        type="button"
        className="rbac-row-actions__item rbac-row-actions__item--danger"
        role="menuitem"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  ) : null;

  return (
    <div className="rbac-row-actions" ref={wrapRef}>
      <button
        ref={triggerRef}
        type="button"
        className="rbac-row-actions__trigger"
        aria-label="Row actions"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={handleToggle}
      >
        <span aria-hidden>⋮</span>
      </button>
      {typeof document !== "undefined" && menu ? createPortal(menu, document.body) : null}
    </div>
  );
}

export default RbacRowActionsMenu;
