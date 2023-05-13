import { ref } from 'vue'

export const useCustomersTable = () => {
    const cols = ref([
        {
            key: 'name',
            title: 'Имя',
            width: '300',
            resizeable: true,
            sortable: true,
            filterable: true,
            format: (row) => row.name
        },
        {
            key: 'phone',
            title: 'Телефон',
            width: '250',
            resizeable: true,
            sortable: true,
            filterable: true,
            format: (row) => row.phone
        },
        {
            key: 'image',
            title: 'Фото',
            width: '150',
            resizeable: true,
            sortable: true,
            filterable: true
        },
    ])

    return {
        cols,
    }
}
