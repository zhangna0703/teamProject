/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const headImageRouter = {
  path: '/headImage',
  component: Layout,
  redirect: 'noredirect',
  name: 'headImage',
  meta: {
    title: 'headImage',
    icon: 'table'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/headImage'),
      name: 'headImages',
      meta: { title: '头像上传', noCache: true }
    }
  ]
}

export default headImageRouter
