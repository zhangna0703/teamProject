import Layout from '@/layout'
const examRouter = {
  path: '/exam',
  component: Layout,
  redireact: 'noredirect',
  name: 'Exam',
  alwaysShow: true,
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
        noCache: true,
        view_id: 'main-addQuestions'
      }
    },
    {
      path: 'questionType',
      component: () => import('@/views/exam/questionType'),
      name: 'questionType',
      meta: {
        title: 'questionType',
        noCache: true,
        view_id: 'main-questionsType'
      }
    },
    {
      path: 'papers',
      component: () => import('@/views/exam/papers'),
      name: 'papers',
      meta: {
        title: 'papers',
        noCache: true,
        view_id: 'main-watchQuestions'
      }
    },
    {
      path: 'detail',
      component: () => import('@/views/exam/details'),
      hidden: true,
      meta: {
        title: 'detail',
        noCache: true,
        view_id: 'main-questionsDetail'
      }
    }
  ]
}
export default examRouter
