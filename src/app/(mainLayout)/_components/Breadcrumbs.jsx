'use client'
import React from 'react'
import {
 Breadcrumb,
 BreadcrumbItem,
 BreadcrumbLink,
 BreadcrumbList,
 BreadcrumbPage,
 BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from 'next/link'
import { usePathname } from 'next/navigation'



const BreadCrumbs = ({item1, item2, item3}) => {
  const pathName = usePathname();
  const capitalizedPath = pathName.replace('/', '').charAt(0).toUpperCase() + pathName.slice(2); // Capitalize the first letter
  return (
   <Breadcrumb className='mb-4'>
    <BreadcrumbList>
     <BreadcrumbItem>
      <Link className='hover:text-stone-950 text-stone-700 font-medium' href={`/${item1.toLowerCase()}`}>{item1}</Link>
     </BreadcrumbItem>
     {item2 && 
     <>
     <BreadcrumbSeparator />
     <BreadcrumbItem>
      <Link className='hover:text-stone-950 text-stone-700 font-medium' href={`/${item2.toLowerCase()}`}>{item2}</Link>
     </BreadcrumbItem>
     </>
     }
     {item3 && 
     <>
     <BreadcrumbSeparator />
     <BreadcrumbItem>
      <p className='hover:text-stone-950 text-stone-700 font-medium'>{item3}</p>
     </BreadcrumbItem>
     </>
     }
    </BreadcrumbList>
   </Breadcrumb>

  )
}

export default BreadCrumbs