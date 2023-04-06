export default [
  {
    title: 'Home',
    route: 'home',
    icon: 'HomeIcon',
  },
  {
    title: 'Cadastros',
    icon: 'FileTextIcon',
    children: [
      {
        title: 'Usuários',
        route: 'list-users',
      },
      {
        title: 'Pacientes',
        route: 'list-pacientes',
      },
    ],
  },
]
