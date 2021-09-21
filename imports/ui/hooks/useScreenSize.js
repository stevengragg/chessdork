import { useState, useEffect, useCallback } from 'react'

const BreakPoint = {
  xs : 'xs',
  s : 's',
  m : 'm',
  l : 'l',
  xl : 'xl',
  xxl: "xxl"
}

// Screen Size Hook
const useScreenSize = () => {
  const isClient = typeof window === 'object'

  const getSize = useCallback(() => {
    return {
      width: isClient ? window.innerWidth : 0,
      height: isClient ? window.innerHeight : 0,
      screen: BreakPoint.s
    }
  }, [isClient])

  const [screenSize, setScreenSize] = useState(getSize)

  useEffect(() => {
    if (!isClient) {
      return
    }

    function handleResize () {
      setScreenSize(getSize())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (screenSize.width < 640) {
    screenSize.screen = BreakPoint.xs
  } else if (screenSize.width >= 640 && screenSize.width < 768) {
    screenSize.screen = BreakPoint.s
  } else if (screenSize.width >= 768 && screenSize.width < 1024) {
    screenSize.screen = BreakPoint.m
  }
   else if (screenSize.width >= 1024 && screenSize.width < 1280) {
    screenSize.screen = BreakPoint.l
  }
   else if (screenSize.width >= 1280 && screenSize.width < 1536) {
    screenSize.screen = BreakPoint.xl
  }
   else {
    screenSize.screen = BreakPoint.xxl
  }

  return screenSize
}


export { BreakPoint, useScreenSize as default }