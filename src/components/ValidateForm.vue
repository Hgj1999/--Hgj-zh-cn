<template>
  <form class="validate-form-container">
    <slot name="default"></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, provide } from 'vue'
import mitt, { Emitter, Handler } from 'mitt'
type ValidateFunc = () => boolean
interface CallbackProps {
  validator: ValidateFunc;
  formName: string;
}
export const emitter:Emitter = mitt()
export default defineComponent({
  emits: ['form-submit'],
  props: {
    name: {
      type: String,
      default: 'default'
    }
  },
  setup (props, context) {
    provide('formName', props.name)
    let funcArr: ValidateFunc[] = []
    const submitForm = () => {
      const result = funcArr.map(func => func()).every(result => result)
      context.emit('form-submit', result)
    }
    const callback: Handler = (obj?: CallbackProps) => {
      if (obj && obj.formName === props.name) {
        funcArr.push(obj.validator)
      }
    }
    emitter.on('form-item-created', callback)
    onUnmounted(() => {
      emitter.off('form-item-created', callback)
      funcArr = []
    })
    return {
      submitForm
    }
  }
})
</script>
