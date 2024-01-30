import React from 'react'

//Users
const AllChatBots = React.lazy(() => import('./views/Dashboard/AllBots'))
const AddFile = React.lazy(() => import('./views/Dashboard/AddFile'))



const routes = [
  { path: '/', exact: true, name: 'Home' },


  //User Routes
  { path: '/dashboard', name: 'All Chat Bot', element: AllChatBots },
  { path: '/Bots/AddFile', name: 'Add File', element: AddFile },
]

export default routes
