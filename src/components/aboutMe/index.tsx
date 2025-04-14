import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

const AboutMe = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <h2 className="text-3xl font-bold tracking-tight">About Me</h2>
        <div className="h-px grow bg-linear-to-r from-purple-500/50 to-transparent"></div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-purple-400">Background</h3>
          <p className="text-base leading-relaxed">
            Hello! My name is Tommy. I'm a self-taught programmer from the
            United Kingdom specializing in web development with React. I have
            experience working with a range of technologies including Node.js,
            Express, Next.js, and Svelte. One of my notable projects is{" "}
            <a
              href="https://recap.games/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 transition-all hover:underline hover:font-bold focus:underline focus:font-bold hover:text-purple-500 focus:text-purple-500"
            >
              GamesRecapped
            </a>
            , where I utilized my skills to create a dynamic and user-friendly
            web application.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-purple-400">
            Passion & Interests
          </h3>
          <p className="text-base leading-relaxed">
            I'm passionate about creating responsive and engaging web
            applications. My career goal is to continually grow as a developer,
            taking on challenging projects that push the boundaries of what web
            technology can do. I pride myself on my problem-solving skills, and
            my creativity.
          </p>
          <p className="text-base leading-relaxed">
            Outside of programming, I love playing video games, getting lost in
            other worlds, watching movies and TV shows, and enjoying anime.
            These interests fuel my creativity and inspire my work.
          </p>
        </div>
      </div>

      <motion.div
        className="mt-4 p-4 border border-green-500/20 rounded-lg bg-green-500/5"
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <strong className="text-lg text-green-500 group block">
          <Link
            to="/mental-health/quote"
            target="_blank"
            className="transition-all group-hover:opacity-75 group-focus-within:opacity-75 block"
          >
            Reminder that you are great, you are enough, and your presence is
            valued. If you are struggling with your mental health, please reach
            out to someone you love and consult a professional. You are not
            alone; there is a large range of resources online for support and
            guidance.
          </Link>
        </strong>
      </motion.div>
    </div>
  );
};

export default AboutMe;
