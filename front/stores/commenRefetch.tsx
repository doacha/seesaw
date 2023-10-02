import { create } from 'zustand'
import { useQuery } from '@tanstack/react-query'
interface RefetchStore {
  refetch: any
  setRefetch: (refetch: any) => void
}

export const commentRefetchStore = create<RefetchStore>((set) => ({
  refetch: '',
  setRefetch: (refetch: any) => set({ refetch: refetch }),
}))
