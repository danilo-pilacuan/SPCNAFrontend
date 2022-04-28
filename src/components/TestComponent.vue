<template>
  <div>
      <label>Fecha: </label>
      <!-- <input v-model="localValue"> -->
    <div v-for="(nbCell,index) in arrayNoteBookCell" :key="index">
        <notebook-cell v-model="nbCell.entrada"/>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    value: {
      required: true
    },
    array: {
        required:true
    }
  },
  data () {
    return {
      localValue: this.value,
      localArray: this.array
    }
  },
  watch: {
     localValue (newValue) {
       this.$emit('input', newValue)
     },
     value (newValue) {
       this.localValue = this.value
     },
     localArray (newValue) {
       this.$emit('input', newValue)
     },
     array (newValue) {
       this.localValue = this.value
     }
  }
}
</script>