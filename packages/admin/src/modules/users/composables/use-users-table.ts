import { ref } from "vue"

export const useUsersTable = () => {
    const cols = ref([
        {
            key: 'actions',
            title: 'Действия',
            align: 'center',
            width: '150'
        },
        {
            key: 'firstName',
            title: 'ФИО',
            width: '300',
            resizeable: true,
            sortable: true,
            filterable: true,
            format: (row) => `${ row.firstName } ${ row.secondName }`,
            emit: true
        },
        {
            key: 'roles',
            title: 'Роли',
            width: '300',
            resizeable: true,
            sortable: true,
            filterable: true,
            format: (row) => row.roles.toString()
        },
    ])

    return {
        cols,
    }
}
