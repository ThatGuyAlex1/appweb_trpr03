import { defineStore } from 'pinia'
import { ref } from 'vue'
import { categoryService } from '../services/categoryService'
import type Category from '../scripts/category'

export const useCategoryStore = defineStore('categoryStoreId', () => {
    const categories = ref([] as Category[])
    const onError = ref(false)

    function _initializeCategory(categoryList: Category[]) {
        categories.value = categoryList
        onError.value = false
    }

    async function getCategory(category: Category) {
        try {
            onError.value = false
            const categoriesId = await categoryService.getAllCategories()
            const categoriesTemporary: Category[] = await Promise.all(categoriesId.map(async (category: { id: number; name: string; }) => {
            return await categoryService.getCategoryById(category.id);
            }));
        } catch (error) {
            console.error(error)
        }
    }

    async function addCategory(name: string) {
        try {
          onError.value = false
          await categoryService.addCategory(name)
        } catch (error) {
          onError.value = true
        }
    }


    return { 
      categories,
      onError,
      getCategory,
      addCategory
    }
})