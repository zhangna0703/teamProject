/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const examination = {
  path: '/examination',
  component: Layout,
  redirect: 'noredirect',
  name: 'examination',
  alwaysShow: true,
  meta: {
    title: 'examination',
    icon: 'documentation'
  },
  children: [{
    path: 'addexamination',
    component: () =>
        import('@/views/examination/addexamination'),
    name: 'Addexamination',
    meta: { title: 'Addexamination', noCache: true, view_id: 'main-addExam' }
  },
  {
    path: 'listexamination',
    component: () =>
    import('@/views/examination/listexamination'),
    name: 'Listexamination',
    meta: { title: 'Listexamination', noCache: true, view_id: 'main-examList' }
  },
  {
    path: 'add',
    hidden: true,
    component: () =>
        import('@/views/examination/add'),
    name: 'add',
    meta: { title: 'add', noCache: true, view_id: 'main-examEdit' }
  },
  {
    path: 'detail',
    hidden: true,
    component: () =>
        import('@/views/examination/detail'),
    name: 'detail',
    meta: { title: 'detail', noCache: true, view_id: 'main-examDetail' }
  }]
}

export default examination
