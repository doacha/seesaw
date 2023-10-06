// export default useIntersect;

import { useState, useEffect, useCallback } from 'react'

// IntersectionObserverEntry 타입을 임포트합니다.
// interface IntersectionObserverEntry {
//   isIntersecting: boolean;
//   intersectionRatio: number;
//   // 필요에 따라 더 많은 프로퍼티들을 추가할 수 있습니다.
// }

// IntersectionObserverInit 타입을 정의합니다.
interface IntersectionObserverInit {
  root?: Element | null
  rootMargin?: string
  threshold?: number | number[]
  // 필요에 따라 더 많은 프로퍼티들을 추가할 수 있습니다.
}

const defaultOptions: IntersectionObserverInit = {
  root: null,
  threshold: 1,
  rootMargin: '0px',
}

// onIntersect 콜백 함수의 타입을 정의합니다.
type OnIntersectCallback = (
  entry: IntersectionObserverEntry,
  observer: IntersectionObserver,
) => void

const useIntersect = (
  onIntersect: OnIntersectCallback,
  options: IntersectionObserverInit,
) => {
  const [ref, setRef] = useState<Element | null>(null)

  const checkIntersect = useCallback(
    ([entry]: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      if (entry.isIntersecting) {
        onIntersect(entry, observer)
      }
    },
    [onIntersect],
  )

  useEffect(() => {
    let observer: IntersectionObserver | undefined
    if (ref) {
      observer = new IntersectionObserver(checkIntersect, {
        ...defaultOptions,
        ...options,
      })
      observer.observe(ref)
    }
    return () => observer && observer.disconnect()
  }, [ref, options.root, options.threshold, options.rootMargin, checkIntersect])

  return [ref, setRef] as const
}

export default useIntersect
