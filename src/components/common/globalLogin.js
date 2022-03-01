import Vue from 'vue'
import Login from './login.vue'

const Constructor = Vue.extend(Login)

const GlobalLogin = function() {
  const instance = new Constructor()
  instance.$mount()
  document.body.appendChild(instance.$el)
  instance.loginFormVisible = true
  instance.close = function() { document.body.removeChild(instance.$el) }
}

export default GlobalLogin
