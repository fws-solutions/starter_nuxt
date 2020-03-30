<template>
    <label>
        <input
            v-if="!textarea"
            :type="type"
            :placeholder="placeholder"
            v-model="inputVal"
            :step="type === 'number' ? 'any' : null"
        >

        <textarea v-else :placeholder="placeholder" v-model="inputVal"></textarea>
    </label>
</template>

<script>
    export default {
        props: {
            value: [String, Number],
            placeholder: String,
            textarea: Boolean,
            type: {
                type: String,
                default: 'text'
            }
        },

        data() {
            return {inputVal: this.value};
        },

        watch: {
            inputVal(val) {
                this.$emit('input', val);
            }
        }
    };
</script>

<style lang="scss" scoped>
    label {
        display: block;
        margin-bottom: 15px;
    }

    input,
    textarea {
        display: block;
        background: none;
        box-shadow: none;
        border: 1px solid #dfdfdf;
        border-radius: 5px;
        padding: 10px 20px;
        line-height: 1;
        width: 100%;
        font-size: 14px;

        @include placeholder {
            color: $grey;
        }
    }

    textarea {
        min-height: 200px;
        resize: vertical;
    }
</style>
