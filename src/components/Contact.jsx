import React, { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import ReactHowler from "react-howler"

import { styles } from "../styles"
import { EarthCanvas } from "./canvas"
import { SectionWrapper } from "../hoc"
import { slideIn } from "../utils/motion"
import Button from "@mui/material/Button"

const Contact = () => {
  const formRef = useRef()
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { target } = e
    const { name, value } = target

    setForm({
      ...form,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(formRef.current.action, {
        method: "POST",
        body: new FormData(formRef.current),
        headers: {
          Accept: "application/json",
        },
      })

      if (response.ok) {
        setLoading(false)
        document.getElementById("msg").innerHTML =
          "Thank you. I will get back to you as soon as possible."
        setForm({
          name: "",
          email: "",
          message: "",
        })

        setTimeout(() => {
          document.getElementById("msg").innerHTML = ""
        }, 5000)
      } else {
        setLoading(false)
        throw new Error("Form submission failed")
      }
    } catch (error) {
      setLoading(false)
      console.error("Error!", error.message)
    }
  }

  const [ref, inView] = useInView({
    triggerOnce: false,
  })

  const [volume, setVolume] = useState(0)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (inView) {
      // Fade in the sound when the user scrolls to this section
      let fadeInterval = setInterval(() => {
        setVolume((prevVolume) => Math.min(prevVolume + 0.02, 0.25))
      }, 1000) // Increase music by 0.020 every 1000ms

      setPlaying(true)
      return () => clearInterval(fadeInterval)
    } else {
      // Fade out the sound when the user scrolls away from this section
      let fadeInterval = setInterval(() => {
        setVolume((prevVolume) => {
          if (prevVolume <= 0.1) {
            clearInterval(fadeInterval)
            setPlaying(false)
            return 0
          }
          return Math.max(prevVolume - 0.1, 0)
        })
      }, 200) // The delay before music fades out
    }
  }, [inView])

  return (
    <div ref={ref}>
      <div
        className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
      >
        <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
        >
          <p className={styles.sectionSubText}>Get in touch</p>
          <h3 className={styles.sectionHeadText}>Contact.</h3>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            action="https://formspree.io/f/mrgwnkgq"
            method="POST"
            id="contactForm"
            className="mt-12 flex flex-col gap-8"
          >
            <label className="flex flex-col">
              <span className="text-white font-medium mb-4">Your Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="What's your blessed name?"
                className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
              />
            </label>

            <label className="flex flex-col">
              <span className="text-white font-medium mb-4">Your Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="What's your email address?"
                className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
              />
            </label>

            <label className="flex flex-col">
              <span className="text-white font-medium mb-4">Your Message</span>
              <textarea
                rows={7}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="What do you want to say?"
                className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
              />
            </label>

            <Button
              type="submit"
              className="bg-tertiary hover:bg-[#292444] py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary text-[16px] normal-case h-[48px]"
              variant="contained"
              sx={{ fontFamily: "Poppins, sans-serif" }}
            >
              {loading ? "Sending..." : "Send"}
            </Button>

            <span id="msg" className="text-green-600 -mt-2 block"></span>
          </form>
        </motion.div>

        <motion.div
          variants={slideIn("right", "tween", 0.2, 1)}
          className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
        >
          <EarthCanvas />
        </motion.div>
      </div>

      <ReactHowler
        src="/sounds/magical_space.mp3"
        playing={playing}
        loop={true}
        volume={volume}
      />
    </div>
  )
}

export default SectionWrapper(Contact, "contact")
