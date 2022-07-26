import { useState, useEffect } from "react"

export const useActiveHash = (itemIds:any, rootMargin = `0% 0% -80% 0%`) => {
    const [activeHash, setActiveHash] = useState(``)
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveHash(`#${entry.target.id}`)
            }
          })
        },
        { rootMargin: rootMargin }
      )
  
      itemIds?.forEach((id:any) => {
        if (document.getElementById(id) !== null) {
          observer.observe(document.getElementById(id)!)
        }
      })
  
      return () => {
        itemIds?.forEach((id:any) => {
          if (document.getElementById(id) !== null) {
            observer.unobserve(document.getElementById(id)!)
          }
        })
      }
    }, [itemIds, rootMargin])
  
    return activeHash
  }
  