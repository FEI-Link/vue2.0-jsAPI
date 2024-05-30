exports.adminRouter = [

  {
    name: "upload",
    path: "/user/upload",
    component: 'Layout',
    children: [
      {
        path: "index",
        name: "upload",
        component: 'ki/user/upload/index',
        meta: { title: "图纸上传", icon: "form" },
      },
    ],
  },
  {
    name: "adminUser",
    path: "/admin/user",
    component: 'Layout',
    children: [
      {
        path: "index",
        name: "adminUser",
        component: 'ki/admin/user/index',
        meta: { title: "用户管理", icon: "form" },
      }
    ]
  },
  {
    name: "paper",
    path: "/designer/paper",
    component: 'Layout',
    children: [
      {
        path: "index",
        name: "paper",
        component: 'ki/designer/paper/index',
        meta: { title: "图纸查看", icon: "form" },
      },
    ],
  },
  {
    name: "designer",
    path: "/designer/design",
    component: 'Layout',
    children: [
      {
        path: "index",
        name: "work",
        component: 'ki/designer/index',
        meta: { title: "工艺设计", icon: "form" },
      },
    ],
  },
  
  {
    name: "user",
    path: "/user",
    component: 'Layout',
    children: [
      {
        path: "index",
        name: "user",
        component: 'ki/user/index',
        meta: { title: "工艺查看", icon: "form" },
      },
    ],
  },
]

exports.designerRouter = [
  {
    name: "paper",
    path: "/designer/paper",
    component: 'Layout',
    children: [
      {
        path: "index",
        name: "paper",
        component: 'ki/designer/paper/index',
        meta: { title: "图纸查看", icon: "form" },
      },
    ],
  },
  {
    name: "designer",
    path: "/designer/design",
    component: 'Layout',
    children: [
      {
        path: "index",
        name: "work",
        component: 'ki/designer/index',
        meta: { title: "工艺设计", icon: "form" },
      },
    ],
  },
  
  {
    name: "user",
    path: "/user",
    component: 'Layout',
    children: [
      {
        path: "index",
        name: "user",
        component: 'ki/user/index',
        meta: { title: "工艺查看", icon: "form" },
      },
    ],
  },
]

exports.userRouter = [
  {
    name: "upload",
    path: "/user/upload",
    component: 'Layout',
    children: [
      {
        path: "index",
        name: "upload",
        component: 'ki/user/upload/index',
        meta: { title: "图纸上传", icon: "form" },
      },
    ],
  },
  {
    name: "user",
    path: "/user",
    component: 'Layout',
    children: [
      {
        path: "index",
        name: "user",
        component: 'ki/user/index',
        meta: { title: "工艺查看", icon: "form" },
      },
    ],
  },
]

// exports.studentRouter = [
//   {
//     name: 'StudentCourse',
//     path: "/student/course",
//     component: 'Layout',
//     children: [
//       {
//         path: "",
//         name: "StudentCourse",
//         component: 'ki/student/course/index',
//         meta: { title: "学生课程中心", icon: "form" },
//       },
//     ],
//   },
//   {
//     name: 'StudentExam',
//     path: "/student/exam",
//     component: 'Layout',
//     children: [
//       {
//         path: "",
//         name: "StudentExam",
//         component: 'ki/student/exam/index',
//         meta: { title: "在线考试", icon: "form" },
//       },
//     ],
//   },
//   {
//     name: 'Studentquestion',
//     path: "/student/question",
//     hidden: true,
//     component: 'ki/student/question/index',
//     meta: { title: "试卷"},
//   },
// ]

// exports.teacherRouter = [
//   {
//     name: "TeacherCourse",
//     path: "/teacher/course",
//     component: 'Layout',
//     children: [
//       {
//         path: "index",
//         name: "TeacherCourse",
//         component: 'ki/teacher/course/index',
//         meta: { title: "教师课程中心", icon: "form" },
//       },
//     ],
//   },
// ]