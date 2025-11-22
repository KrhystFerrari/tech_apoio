export const GameHeroSection = () => {
  return (
    <section
      className="section-spacing"
      style={{ paddingTop: "2rem", paddingBottom: "2rem" }}
    >
      <div
        className="card"
        style={{
          background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
          color: "white",
          padding: "2.5rem",
          borderRadius: "24px",
          textAlign: "center",
          border: "none",
        }}
      >
        <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>📚</div>
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "700",
            marginBottom: "1rem",
            color: "white",
          }}
        >
          Português Mágico
        </h1>
        <p
          style={{
            fontSize: "1.25rem",
            opacity: 0.9,
            marginBottom: "0",
            color: "white",
          }}
        >
          Explore palavras, histórias e aventuras incríveis! 🌟
        </p>
      </div>
    </section>
  );
};
