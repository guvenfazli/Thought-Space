import classes from "./loading.module.css"
import { motion } from "framer-motion"
export default function Loading() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex p-3 gap-y-9 w-2/4 h-full items-center justify-center bg-gray-100 text-black rounded-lg max-sm:w-full">
      <span className={classes.loader} />
    </motion.div>
  )
}