<script lang="ts">
  import { defineComponent, ref, unref } from 'vue'
  import { useProduct } from '@modules/product/composables/use-product'
  import { IAsset } from '@ecommerce-platform/types'
  import { clone } from '@shared/helpers'

  export default defineComponent({
    name: 'info-block',
    setup() {
      const {
        model,
        unitItems,
        isEditMode,
        onUploadProductImage,
        onDeleteProductImage,
      } = useProduct()

      const productImages = ref<Array<File>>([])
      const currentImage = ref<Maybe<IAsset>>(null)
      const imagesContextMenu = ref({
        show: false,
        positionX: 0,
        positionY: 0,
      })

      const onImagesContextMenu = (event, asset) => {
        unref(imagesContextMenu).show = true
        unref(imagesContextMenu).positionX = event.clientX
        unref(imagesContextMenu).positionY = event.clientY

        currentImage.value = clone(asset)
      }

      const onLoadImage = ([ file ]) => {
        if (!file) return

        onUploadProductImage(file)
        productImages.value = []
      }

      const setAsMainImage = () => {
        unref(model).image = unref(currentImage)!.url
        unref(model).assets = clone(unref(model).assets).map((it) => {
          it.main = it._id === unref(currentImage)!._id

          return it
        })
      }

      return {
        model,
        unitItems,
        productImages,
        currentImage,
        imagesContextMenu,
        isEditMode,
        onImagesContextMenu,
        onDeleteProductImage,
        onLoadImage,
        setAsMainImage,
      }
    }
  })
</script>
<template>
  <v-row class="white my-4 pa-4 elevation-2">
    <v-col class="pb-8">
      <h2 class="primary--text">
        Информация о товаре
      </h2>
    </v-col>
    <v-col xl="6">
      <v-text-field
        v-model.trim="model.name"
        label="Наименование товара"
        color="#272727"
        text-color="#272727"
      />
    </v-col>
    <v-col xl="6">
      <v-text-field
        v-model.number="model.price"
        label="Цена"
        color="#272727"
        text-color="#272727"
        type="number"
      />
    </v-col>
    <v-col xl="6">
      <v-text-field
        v-model.number="model.quantity"
        label="Количество"
        color="#272727"
        type="number"
        text-color="#272727"
      />
    </v-col>
    <v-col xl="6">
      <v-select
        v-model="model.unit"
        :items="unitItems"
        label="Единица измерения"
        color="#272727"
        value-key="value"
        active-class="green white--text"
        text-color="#272727"
      />
    </v-col>
    <v-col xl="6">
      <v-text-field
        v-model="model.seo.title"
        label="SEO title"
        color="#272727"
        text-color="#272727"
      />
    </v-col>
    <v-col xl="6">
      <v-text-field
        v-model="model.seo.description"
        label="SEO description"
        color="#272727"
        text-color="#272727"
      />
    </v-col>
    <v-col xl="6">
      <v-text-field
        v-model="model.seo.keywords"
        label="SEO keywords"
        color="#272727"
        text-color="#272727"
      />
    </v-col>
    <v-col xl="6">
      <v-text-field
        v-model.trim="model.url"
        label="URL товара"
        color="#272727"
        text-color="#272727"
      />
    </v-col>
    <v-col
      xl="6"
      class="mb-4 white"
    >
      <v-file-input
        :value="productImages"
        :label="isEditMode ? 'Загрузить изображения' : 'Загрузить изображение можно только после создания продукта'"
        color="#272727"
        text-color="#272727"
        :disabled="!isEditMode"
        @update:value="onLoadImage"
      />
    </v-col>
    <v-row>
      <v-col
        v-for="it in model.assets"
        :key="it._id"
        xl="2"
        lg="4"
        md="6"
        sm="12"
        class="image mb-4 mr-1 white elevation-2 d-flex justify-center align-center"
        :class="{'product-image--main': it.main}"
        style="height: 250px; overflow: hidden; position: relative; border-radius: 10px; padding: 0"
        @contextmenu.prevent="onImagesContextMenu($event, it)"
      >
        <img
          style="height: 250px; width: 100%; object-fit: cover"
          :src="it.url"
          class=""
          alt=""
        >
        <v-button
          style="position: absolute; top: 5px; right: 5px"
          round
          color="white"
          elevation="2"
          @click="onDeleteProductImage(it)"
        >
          <v-icon color="grey darken-4">
            fas fa-times
          </v-icon>
        </v-button>
      </v-col>
    </v-row>
    <v-menu
      v-model="imagesContextMenu.show"
      :position-x="imagesContextMenu.positionX"
      :position-y="imagesContextMenu.positionY"
      width="200"
      absolute
      open-on-click
      @hide="imagesContextMenu.show = false"
    >
      <v-list
        class="images-menu white"
      >
        <v-list-item
          class="images-menu__item"
          @click="setAsMainImage"
        >
          <v-list-item-title>
            установить главным
          </v-list-item-title>
        </v-list-item>
        <v-list-item
          class="images-menu__item"
          @click="onDeleteProductImage(currentImage)"
        >
          <v-list-item-title>
            удалить
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-row>
</template>
