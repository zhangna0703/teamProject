/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const headImageRouter = {
  path: '/headImage',
  component: Layout,
  redirect: 'noredirect',
  name: 'headImage',
  hidden: true,
  meta: {
    title: 'headImage',
    icon: 'table'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/headImage'),
      name: 'headImages',
      meta: { title: 'headImage', noCache: true }
    }
  ]
}

export default headImageRouter
