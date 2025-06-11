import { motion } from "framer-motion";

export default function ScatterText({ text }) {
  const letters = text.split("");

  return (
    <div className="flex space-x-1">
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{
            x: Math.random() * 200 - 100, // случайный разброс по X
            y: Math.random() * 200 - 100, // случайный разброс по Y
            opacity: 0,
            rotate: Math.random() * 360,
          }}
          animate={{
            x: 0,
            y: 0,
            opacity: 1,
            rotate: 0,
          }}
          transition={{
            delay: index * 0.15,
            type: "spring",
            stiffness: 100,
          }}
          className="inline-block text-2xl font-bold"
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </div>
  );
};


