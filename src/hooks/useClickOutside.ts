import { RefObject, useEffect, useRef } from "react"

export const useClickOutside = (
  callback: (event: MouseEvent | TouchEvent) => void,
): RefObject<HTMLDivElement> => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const clickEventHandler = (event: MouseEvent | TouchEvent) => {
      if (ref?.current?.contains(event.target as Node)) {
        return
      }
      callback(event)
    }

    document.addEventListener("mousedown", clickEventHandler)
    document.addEventListener("touchstart", clickEventHandler)

    return () => {
      document.removeEventListener("mousedown", clickEventHandler)
      document.removeEventListener("touchstart", clickEventHandler)
    }
  })

  return ref
}
