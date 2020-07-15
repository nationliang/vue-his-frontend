import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/styles/reset.css'
import './assets/styles/iconfont.css'
import './mock/index.js'
import './assets/styles/global.css'

import {
  Pagination,
  // MessageBox,
  Input,
  Select,
  Option,
  Table,
  TableColumn,
  Button,
  Tabs,
  TabPane,
  Popover,
  Tooltip,
  Divider,
  InputNumber,
  Icon,
  Radio,
  Avatar
} from 'element-ui'

Vue.use(Pagination)
// Vue.use(MessageBox)
// Vue.component(MessageBox.name, MessageBox)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Button)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Popover)
Vue.use(Tooltip)
Vue.use(Divider)
Vue.use(InputNumber)
Vue.use(Icon)
Vue.use(Radio),
Vue.use(Avatar)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
