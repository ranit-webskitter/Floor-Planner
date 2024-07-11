

import React from 'react'
import Layout from '../Layout/Layout'
import VerticalLayout from '../Layout/Vertical-Layout'
import Staffs from '../pages/staffs/Staffs'
import Rooms from '../pages/home-page/index'
const index = () => {
  return (
    <>
    <Layout>
        <VerticalLayout>
            {/* <Staffs/> */}
            <Rooms/>
        </VerticalLayout>

    </Layout>
    </>
  )
}

export default index
