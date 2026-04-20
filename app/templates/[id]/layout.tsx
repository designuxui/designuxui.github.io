export default function TemplateLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: "#080807", minHeight: "100vh" }}>
      {children}
    </div>
  );
}