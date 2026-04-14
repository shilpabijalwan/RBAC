import { Toaster } from "react-hot-toast";

function AppToaster() {
  return (
    <Toaster
      position="top-right"
      gutter={10}
      containerStyle={{
        top: 20,
        right: 20,
        zIndex: 9999,
      }}
      toastOptions={{
        duration: 4200,
        style: {
          minWidth: "340px",
          background: "rgba(12, 19, 38, 0.98)",
          color: "var(--kp-on-surface)",
          border: "1px solid rgba(98, 250, 227, 0.45)",
          borderLeft: "4px solid var(--kp-secondary)",
          borderRadius: "0px",
          boxShadow:
            "0 0 0 1px rgba(98, 250, 227, 0.18), 0 0 28px rgba(98, 250, 227, 0.2), 0 12px 30px rgba(0, 0, 0, 0.45)",
          padding: "14px 16px",
          fontSize: "13px",
          fontFamily: "var(--font-display)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        },
        success: {
          style: {
            borderColor: "rgba(98, 250, 227, 0.6)",
            borderLeft: "4px solid var(--kp-secondary)",
          },
          iconTheme: { primary: "#62fae3", secondary: "#070d1f" },
        },
        error: {
          style: {
            borderColor: "rgba(255, 107, 122, 0.55)",
            borderLeft: "4px solid var(--kp-error)",
          },
          iconTheme: { primary: "#ff6b7a", secondary: "#070d1f" },
        },
      }}
    />
  );
}

export default AppToaster;
