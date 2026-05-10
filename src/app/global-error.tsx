"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ru">
      <body style={{ margin: 0, padding: 24, background: "#0f1419", color: "#f4efe6", fontFamily: "system-ui, sans-serif" }}>
        <h1 style={{ fontSize: "1.25rem" }}>Ошибка приложения</h1>
        <pre style={{ marginTop: 16, whiteSpace: "pre-wrap", fontSize: 13, opacity: 0.9 }}>{error.message}</pre>
        <button
          type="button"
          onClick={reset}
          style={{ marginTop: 20, padding: "12px 20px", cursor: "pointer", borderRadius: 8, border: "none", background: "#c9a962", color: "#0f1419", fontWeight: 600 }}
        >
          Попробовать снова
        </button>
      </body>
    </html>
  );
}
