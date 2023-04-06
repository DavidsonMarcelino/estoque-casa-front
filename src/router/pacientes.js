import Crud from '../views/Paciente/Crud'
import Entity from '../views/Paciente/Add'

let routes = {
    path: '/pacientes',
    component: resolve => require(['../layouts/full/LayoutFull'], resolve),
    children: [
        {
            path: '/pacientes/add',
            name: 'NewPaciente',
            component: Entity
        },
        {
            path: '/pacientes/edit/:id?',
            name: 'EditPaciente',
            component: Entity
        },
        {
            path: '/pacientes',
            name: 'list-pacientes',
            component: Crud,
            meta: {
                pageTitle: 'Lista de Pacientes',
                breadcrumb: [
                    {
                        text: 'Pacientes',
                        active: true,
                    },
                ],
            },
        },
    ]
};


export default routes
