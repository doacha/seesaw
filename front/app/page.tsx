'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Logo from '@/public/seesaw_logo.svg'
import { useRouter } from 'next/navigation'

const Entrance = () => {
  const router = useRouter()

  useEffect(() => {
    // 2초 대기 후 로그인 페이지로 이동
    const timer = setTimeout(() => {
      router.push('/login')
    }, 2000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="h-screen w-screen bg-background-fill">
      <div className="flex w-full h-full justify-center items-center">
        <div className="flex flex-col">
          <div className="flex justify-center mb-5">
            <Image src={Logo} alt="seesaw_logo" width={203} height={118} />
          </div>
          <div className="flex flex-row mx-auto items-end">
            <p
              className="tracking-wide font-envR text-4xl animate-heartBeat "
              style={{
                animationDelay: '0.1s',
                animationIterationCount: 'infinite',
                color: '#6161AF',
              }}
            >
              시
            </p>
            <p
              className="tracking-wide font-envR text-3xl animate-heartBeat "
              style={{
                animationDelay: '0.2s',
                animationIterationCount: 'infinite',
                color: '#B7B2FF',
              }}
            >
              작
            </p>
            <p
              className="tracking-wide font-envR text-3xl animate-heartBeat "
              style={{
                animationDelay: '0.3s',
                animationIterationCount: 'infinite',
                color: '#B7B2FF',
              }}
            >
              하
            </p>
            <p
              className="tracking-wide font-envR text-3xl animate-heartBeat "
              style={{
                animationDelay: '0.4s',
                animationIterationCount: 'infinite',
                color: '#B7B2FF',
              }}
            >
              자&nbsp;
            </p>

            <p
              className="tracking-wide font-envR text-4xl animate-heartBeat "
              style={{
                animationDelay: '0.6s',
                animationIterationCount: 'infinite',
                color: '#539CE5',
              }}
            >
              소
            </p>
            <p
              className="tracking-wide font-envR text-3xl animate-heartBeat "
              style={{
                animationDelay: '0.7s',
                animationIterationCount: 'infinite',
                color: '#AFC3FF',
              }}
            >
              비
            </p>
            <p
              className="tracking-wide font-envR text-3xl animate-heartBeat "
              style={{
                animationDelay: '0.8s',
                animationIterationCount: 'infinite',
                color: '#AFC3FF',
              }}
            >
              절
            </p>
            <p
              className="tracking-wide font-envR text-3xl animate-heartBeat "
              style={{
                animationDelay: '0.9s',
                animationIterationCount: 'infinite',
                color: '#AFC3FF',
              }}
            >
              약
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Entrance
