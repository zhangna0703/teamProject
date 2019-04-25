import Layout from '@/layout'
const examRouter = {
  path: '/exam',
  component: Layout,
  redireact: 'noredirect',
  name: 'Exam',
  meta: {
    title: 'exam',
    icon: 'sliders'
  },
  children: [
    {
      path: 'addQuestion',
      component: () => import('@/views/exam/addQuestion'),
      name: 'addQuestion',
      meta: {
        title: 'addQuestion',
        noCache: true
      }
    },
    {
      path: 'questionType',
      component: () => import('@/views/exam/questionType'),
      name: 'questionType',
      meta: {
        title: 'questionType',
        noCache: true
      }
    },
    {
      path: 'papers',
      component: () => import('@/views/exam/papers'),
      name: 'papers',
      meta: {
        title: 'papers',
        noCache: true
      }
    },
    {
      path: 'detail',
      component: () => import('@/views/exam/details'),
      meta: {
        title: 'detail',
        noCache: true
      }
    }
  ]
}
export default examRouter
