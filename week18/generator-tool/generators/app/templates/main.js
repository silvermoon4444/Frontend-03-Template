import Vue from 'vue'
import HelloWord from './HelloWord.vue'


new Vue ({
    el:'#app',
    render:h=>h(HelloWord)
})

for (const v of [1,2,3]) {
    console.log(v);
}