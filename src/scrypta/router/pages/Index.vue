<template>
  <div id="welcomepage">
    <img style="margin-top:20px" src="logo.png" width="60"><br>
    <div class="row">
      <h3 style="margin:30px 0">Welcome to ScryptaID</h3>
      <p>With this extension you will be able to store and manage your identities and use it directly into Scrypta dApps Ecosystem.</p>
    </div>
    <div class="row">
      <b-button id="create-id" variant="primary" v-on:click="showCreateIdentity()">CREATE IDENTITY</b-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      scrypta: window.ScryptaCore,
      localStorage: window.localStorage
    }
  },
  methods: {
    showCreateIdentity (){
      const app = this
      app.$router.push('create');
    }
  },
  mounted (){
    const app = this
    var wallets = localStorage.getItem('$LYRA_ids');
    if(wallets !== null && wallets.length > 0){
      app.$router.push('dashboard')
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
  }
  #create-id{
    width:100%;
    margin-top:20px;
  }
  .bottombar{
    display:none!important
  }
</style>
