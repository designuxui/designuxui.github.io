"use client";

export default function TemplatePage() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#080807",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: "#eef1e6",
      fontFamily: "var(--font-unbounded)",
      padding: "2rem",
    }}>
      <h1 style={{
        fontSize: "clamp(2rem, 5vw, 4rem)",
        fontWeight: 900,
        marginBottom: "1rem",
        color: "#c8f542",
      }}>
        Template Preview
      </h1>
      <p style={{
        fontSize: "1.1rem",
        color: "rgba(238,241,230,0.6)",
        textAlign: "center",
        maxWidth: "500px",
      }}>
        This is a preview page for the template. Connect this to your actual template design.
      </p>
      <div style={{
        marginTop: "2rem",
        padding: "1rem 2rem",
        border: "1px solid rgba(200,245,66,0.3)",
        borderRadius: "100px",
        color: "#c8f542",
        fontSize: "0.8rem",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
      }}>
        Coming Soon
      </div>
    </div>
  );
}