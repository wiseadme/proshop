import { ref } from 'vue'
// import { useCategoriesService } from '@modules/category/composables/use-categories-service'

export const useCategoriesTable = () => {
  const cols = ref([
    {
      key: 'actions',
      title: 'Действия',
      align: 'center'
    },
    {
      key: 'title',
      title: 'Название',
      width: '300',
      resizeable: true,
      sortable: true,
      filterable: true,
      format: (row) => row.title
    },
    {
      key: 'url',
      title: 'Url категории',
      width: '250',
      resizeable: true,
      sortable: true,
      filterable: true,
      format: (row) => row.url
    },
    {
      key: 'image',
      title: 'Картинка',
      width: '150',
      resizeable: true,
      sortable: true,
      filterable: true
    },
    {
      key: 'parent',
      title: 'Родительская категория',
      width: '250',
      resizeable: true,
      sortable: true,
      filterable: true,
      format: (row) => row.parent?.title
    },
    {
      key: 'length',
      title: 'Кол-во позиций в категории',
      width: '250',
      resizeable: true,
      sortable: true,
      filterable: true,
      format: (row) => row.length
    },
    {
      key: 'seo',
      title: 'SEO',
      width: '250',
      resizeable: true,
      sortable: true,
      filterable: true,
      format: (row) => row.seo.title
    },
    {
      key: 'order',
      title: 'Порядковый номер',
      width: '200',
      resizeable: true,
      sortable: true,
      filterable: true
    }
  ])

  return {
    cols
  }
}
