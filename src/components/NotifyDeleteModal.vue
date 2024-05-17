<script setup lang="ts">
import { Modal } from 'bootstrap'
import { ref, watch, onMounted } from 'vue'

// Définir les props avec des types
const props = defineProps({
  trigger: Number,
  title: String,
  body: String,
  dismissButton: String
})

// Utiliser ref pour créer une référence réactive à null qui sera utilisée pour stocker l'instance de la modal
const modal = ref<Modal | null>(null)

// Le cycle de vie onMounted remplace mounted de l'API Options.
// Il est exécuté après que le composant soit monté dans le DOM.
onMounted(() => {
  if (document.querySelector('#notify-delete-modal')) {
    modal.value = new Modal('#notify-delete-modal')
  }
})

// Utiliser watch pour observer les changements de la prop 'trigger' et afficher la modal en conséquence
watch(
  () => props.trigger,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      modal.value?.show()
    }
  }
)
</script>

<!-- Ce composant permet d'afficher une fenêtre modale de confirmation. Il est utilisée dans le composant PostDetailView pour confirmer la modifcation d'une publication. C'est Bootstrap qui est utilisé pour l'affichage (https://getbootstrap.com/docs/5.2/components/modal/) de la fenêtre modale. Il existe aussi plusieurs libraires externes qui pourraient être utilisées à la place de Bootstrap, lesquelles nous éviteraient de créer ce composant, mais nous obligeraient à apprendre à utiliser une nouvelle librairie. -->
<template>
  <div
    class="modal fade"
    id="notify-delete-modal"
    tabindex="-1"
    aria-labelledby="notify-delete-modal"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title">{{ title }}</h5>
        </div>
        <div class="modal-body">
          {{ body }}
        </div>
        <div class="modal-footer">
          <button name="confirmer" type="button" data-bs-dismiss="modal" class="btn btn-primary">
            {{ dismissButton }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
