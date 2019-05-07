import Layout from '@/layout'
const readRouter = {
  path: '/readPapers',
  component: Layout,
  redirect: 'noredirect',
  name: 'readPapers',
  alwaysShow: true,
  meta: {
    title: 'readPapers',
    icon: 'project'
    // view_id: 'main-main-examPaperClassList,main-examPaperClassnate'
  },
  children: [{
    path: 'waitClass', // 待批班级
    component: () => import('@/views/readPapers/waitClass'),
    name: 'waitClass',
    meta: {
      title: 'waitClass',
      noCache: true,
      view_id: 'main-examinationPapers'
    }
  },
  {
    path: 'classmate', // 待批学生
    component: () => import('@/views/readPapers/classmate'), // Parent router-view
    name: 'classmate',
    hidden: true,
    meta: { title: 'classmate', noCache: true, view_id: 'main-examPaperClassmate' }
  },
  {
    path: 'getscore', // 提交批卷分数
    component: () => import('@/views/readPapers/getscore'), // Parent router-view
    name: 'getscore',
    hidden: true,
    meta: { title: 'getscore', noCache: true, view_id: 'main-examDetail' }
  }]
}
export default readRouter
