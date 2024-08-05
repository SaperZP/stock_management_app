import { useDispatch, useSelector } from 'react-redux'
import type { RootState, RootDispatch } from './index.ts'

export const useAppDispatch = useDispatch.withTypes<RootDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
