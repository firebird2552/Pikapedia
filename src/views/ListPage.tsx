import React, {useEffect, PropsWithChildren, MouseEvent} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import {PokeListStore} from '../support/store'
import Pagination from '@mui/material/Pagination'

export const ListPage = ({children}: PropsWithChildren) => {
  const ArrowLeft = faArrowLeft as IconProp
  const ArrowRight = faArrowRight as IconProp
  const currentPage = PokeListStore((state) => state.currentPage)
  const setCurrentPage = PokeListStore((state) => state.setCurrentPage)
  const limit = PokeListStore((state) => state.quantity)
  const totalPages = PokeListStore((state) => state.totalPages)
  const page = PokeListStore((state) => state.currentPage)

  const HandleChange = (e: React.ChangeEvent<unknown>, page: number) => {
    console.log(page)
    e.preventDefault()
    setCurrentPage(page)
  }  

  useEffect(() => {
    console.log(currentPage)
  }, [currentPage])

  let offset = (currentPage-1)*limit
  
  return (
    <div className='list_page'>
        <div>{offset}-{offset + limit}/{}</div>
      <div className="button_bar">
        
      <Pagination
      className='pagination'
      color="secondary" 
      variant="outlined" 
      shape="rounded" 
      count={totalPages}  
      page={currentPage}  
      showFirstButton 
      showLastButton
      size='large'
      onChange={(e, page)=> HandleChange(e, page)}/>
        </div>
        <div className="list">
        {children}</div>
        </div>
  )
}
