const NameComponent = () => {
  return (
    <div className="flex flex-col items-center gap-3 sm:items-start">
      <span className="text-sm font-medium tracking-wider text-purple-400 uppercase">
        Full-Stack Developer
      </span>
      <div className="flex flex-row items-center gap-3">
        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
          Hi, I'm Tommy
        </h1>
        <span className="animate-wave text-4xl sm:text-5xl">👋</span>
      </div>
      <p className="max-w-lg mt-2 text-lg text-muted-foreground">
        Building responsive web applications with modern technologies
      </p>
    </div>
  );
};

// Add this to your globals.css or use it inline
// @keyframes wave {
//   0%, 100% { transform: rotate(0deg); }
//   25% { transform: rotate(20deg); }
//   75% { transform: rotate(-15deg); }
// }
// .animate-wave { animation: wave 1.5s infinite; }

export default NameComponent;
