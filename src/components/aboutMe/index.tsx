const AboutMe = () => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-3xl font-bold">About Me</h2>
      <p className="font-mono leading-5">
        Hello! My name is Tommy. I’m a self-taught programmer from the United Kingdom specializing in web development
        with React. I have experience working with a range of technologies including Node.js, Express, Next.js, and
        Svelte. One of my notable projects is{' '}
        <a
          href="https://recap.games/"
          target="_blank"
          className="text-purple-400 transition-all hover:underline hover:font-bold focus:underline focus:font-bold hover:text-purple-500 focus:text-purple-500"
        >
          GamesRecapped
        </a>
        , where I utilized my skills to create a dynamic and user-friendly web application.
        <br /> <br />
        I'm passionate about creating responsive and engaging web applications. My career goal is to continually grow as
        a developer, taking on challenging projects that push the boundaries of what web technology can do. I pride
        myself on my problem-solving skills, and my creativity.
        <br /> <br />
        Outside of programming, I love playing video games, getting lost in other worlds, watching movies and TV shows,
        and enjoying anime. These interests fuel my creativity and inspire my work.
        <br /> <br /> <br /> <br />
        <br />
        <strong className="text-lg text-green-500">
          Reminder that you are great, you are enough, and your presence is valued. If you are struggling with your
          mental health, please reach out to someone you love and consult a professional. You are not alone; there is a
          large range of resources online for support and guidance.
        </strong>
      </p>
    </div>
  );
};

export default AboutMe;
