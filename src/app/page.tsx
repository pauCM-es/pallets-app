'use client'

import { Button } from 'devextreme-react'
import Link from 'next/link'
import { MdPallet } from "react-icons/md"
import "@/styles/Dashboard.style.scss"
import { useEffect } from 'react'
import { getProducts } from './services/products.service'
import { getBrands } from './services/box-brands.service'
import { setData } from '@/libs/features/camaras/camaraSlice'
import { useAppDispatch } from '@/libs/store'

export default function Home () {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await getProducts()
        const boxBrands = await getBrands()
        dispatch(setData({ key: "products", value: products.data }))
        dispatch(setData({ key: "boxBrands", value: boxBrands.data }))
      } catch (error) {
        console.log(error)

      }
    }
    fetchData()

  }, [])

  return (
    <main className='dashboard'>
      Home page
      <Link href={ "/camara/C01" }>
        <Button
          stylingMode='contained'
          height={ "4rem" }
          className='dashboard__camara-btn'
        >
          <span className="camara-btn__icon">
            <MdPallet />
          </span>
          <span className='camara-btn__text'>CAMARA EXPEDICIONES</span>
        </Button>
      </Link>
    </main>
  )
}
