import React from "react"
import { Tilt } from "react-tilt"
import { motion } from "framer-motion"

import { styles } from "../styles"
import { services } from "../constants"
import { fadeIn, textVariant } from "../utils/motion"
import { SectionWrapper } from "../hoc"

const ServiceCard = ({ index, title, icon }) => {
  return (
    <Tilt className="xs:w-[198px] w-full">
      <motion.div
        variants={fadeIn("right", "spring", index * 0.5, 0.75)}
        className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
      >
        <div
          options={{
            max: 45,
            scale: 1,
            speed: 450,
          }}
          className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
        >
          <img src={icon} alt={title} className="w-16 h-16 object-contain" />

          <h3 className="text-white text-[20px] font-bold text-center">
            {title}
          </h3>
        </div>
      </motion.div>
    </Tilt>
  )
}

const About = () => {
  return (
    <>
      <div className="flex flex-col justify-between sm:flex-row items-center">
        <div>
          <motion.div variants={textVariant()}>
            <p className={styles.sectionSubText}>Introduction</p>

            <h2 className={styles.sectionHeadText}>Overview.</h2>
          </motion.div>

          <motion.p
            variants={fadeIn()}
            className="mt-4 text-secondary text-[17px] max-w-[50rem] leading-[30px]"
          >
            I'm Abdul Khan, a Computer Science student at the University of
            Toronto 🎓. With a passion for web, app, and software development, I
            have honed my skills in various programming languages and concepts.
            Some of my interests are in Web Development 🧑‍💻, UX Design ✨, and
            Artificial Intelligence 🛸. Beyond coding, I love exploring new
            things that I can implement on my next project 🚀. In fact, I have a
            <span
              id="gradient-text"
              className="text-red-400 cursor-pointer"
              onClick={() =>
                window.open(
                  "https://www.youtube.com/@learningexpressway/videos",
                  "_blank"
                )
              }
            >
              {" "}
              YouTube channel
            </span>{" "}
            where I share AI and learning videos to help others level up their
            skills 💯 and to express my love for new and practical technology.
          </motion.p>
        </div>

        <motion.div variants={fadeIn("left", "spring", 0.5, 0.75)}>
          <img
            src={"/logo.png"}
            alt={"Profile Picture"}
            className="rounded-full w-[18rem] h-[18rem] mt-10"
          />
        </motion.div>
      </div>

      <div className="mt-[4rem] flex flex-wrap gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  )
}

export default SectionWrapper(About, "about")
