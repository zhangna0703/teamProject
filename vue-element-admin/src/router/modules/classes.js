/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const examRouter = {
  path: '/classes',
  component: Layout,
  redirect: 'noredirect',
  name: 'Classes',
  meta: {
    title: 'classes',
    icon: 'table'
  },
  children: [
    {
      path: 'class',
      component: () => import('@/views/classes/class'),
      name: 'class',
      meta: { title: 'class', noCache: true }
    },
    {
      path: 'classroom',
      component: () => import('@/views/classes/classroom'),
      name: 'classroom',
      meta: { title: 'classroom', noCache: true }
    },
    {
      path: 'student',
      component: () => import('@/views/classes/student'),
      name: 'student',
      meta: { title: 'student', noCache: true }
    }
  ]
}

export default examRouter
