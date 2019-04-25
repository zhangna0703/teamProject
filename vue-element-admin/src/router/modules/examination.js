/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const examination = {
  path: '/examination',
  component: Layout,
  redirect: 'noredirect',
  name: 'examination',
  meta: {
    title: 'examination',
    icon: 'documentation'
  },
  children: [{
    path: 'addexamination',
    component: () =>
        import('@/views/examination/addexamination'),
    name: 'Addexamination',
    meta: { title: 'Addexamination', noCache: true }
  },
  {
    path: 'listexamination',
    component: () =>
    import('@/views/examination/listexamination'),
    name: 'Listexamination',
    meta: { title: 'Listexamination', noCache: true }
  },
  {
    path: 'add',
    hidden: true,
    component: () =>
        import('@/views/examination/add'),
    name: 'add',
    meta: { title: 'add', noCache: true }
  },
  {
    path: 'detail',
    hidden: true,
    component: () =>
        import('@/views/examination/detail'),
    name: 'detail',
    meta: { title: 'detail', noCache: true }
  }]
}

export default examination
