import React, { useEffect } from 'react'
import Button from '../../components/button/button'
import Content from '../../components/content_base/content'
import ServiceItem from '../../components/service_item/service_item'
const Home = () => {

  useEffect(()=>{
    document.title="Home"
  },[])

  return (
    <Content>
       <div>
     
       </div>
    </Content>
  )
}

export default Home