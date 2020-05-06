<template>
  <div id="welcomepage">
    <div class="header">
      <strong>Create new identity</strong>
    </div> 
    <div class="row mt-2">
      <p>
        Choose a label for your account to better identify it and choose a strong password too.
      </p>
      <b-form-input v-model="label" style="margin-bottom:20px;" type="text" placeholder="Insert a label"></b-form-input>
      <password style="width:100%; margin-top:10px" placeholder="Insert a password" v-model="password"/>
      <password style="width:100%; margin-top:10px" placeholder="Repeat your password" v-model="passwordrepeat"/>
      <b-button id="create-id" variant="primary" v-on:click="createIdentity()">CREATE IDENTITY</b-button>
    </div>
  </div>
</template>

<script>
const axios = require('axios')
import Password from 'vue-password-strength-meter'

export default {
  components: { Password },
  data () {
    return {
      label: '',
      password: '',
      wallet: {},
      passwordrepeat: '',
      scrypta: window.ScryptaCore,
      axios: axios,
      localStorage: window.localStorage
    }
  },
  methods: {
    createIdentity (){
      const app = this
      if(app.password === app.passwordrepeat){
        if(app.wallet[app.label] === undefined){
          window.ScryptaCore.createAddress(app.password,false).then(async response => {
            app.wallet[app.label] = response.walletstore
            let exp = response.walletstore.split(':')
            let node = await this.scrypta.connectNode();
            app.axios.post(node + '/init', {address: exp[0]})
            app.localStorage.setItem('$LYRA_ids', JSON.stringify(app.wallet) );
            app.localStorage.setItem('$LYRA_lastid', app.label );
            app.$router.push('dashboard');
            app.$emit("onCreatedKey");
          })
        }else{
          alert('This identity exists, please choose another label!')
        }
      }else{
        alert('Password doesn\'t match!')
      }
    }
  },
  mounted (){
    const app = this
    var wallets = localStorage.getItem('$LYRA_ids');
    if(wallets === null || wallets.length === 0){
      app.label = 'Identity 1';
      app.wallet = {};
    }else{
      wallets = JSON.parse(wallets)
      var count = 1
      for(var key in wallets){
        count++
      }
      app.label = 'Identity ' + count;
      app.wallet = wallets;
    }
  }
}
</script>

<style lang="scss" scoped>
  p {
    font-size: 14px;
  }
  #welcomepage{
    text-align: center;
    width:400px;
  }
  #create-id{
    width:100%;
    margin-top:20px;
  }
</style>
