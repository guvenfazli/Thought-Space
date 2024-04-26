import classes from "./loading.module.css"
export default function Loading() {
  return (
    <div className="flex p-3 gap-y-9 w-2/4 h-full items-center justify-center bg-gray-100 text-black rounded-lg max-sm:w-full">
      <span className={classes.loader} />
    </div>
  )
}