<template>
  <div id="welcomepage">
    <img style="margin-top:20px; margin-bottom:40px" src="extension.png" height="60"><br>
    <div class="row">
      <p style="width:100%;">With this extension you will be able to store and manage your identities and use it directly into Scrypta dApps Ecosystem.</p>
    </div>
    <div style="position:absolute; bottom: 0; padding:20px; right:0; width:100%">
      <b-button id="create-id" variant="primary" v-on:click="showCreateIdentity()">CREATE IDENTITY</b-button>
      <b-button style="width:100%; margin-top:10px" variant="success" v-on:click="openimport()">IMPORT IDENTITY</b-button>
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
    },
    openimport(){
      let createData = {
        type: "panel",
        url: "id.html#/import",
        width: 500,
        height: 400
      };
      let creating = browser.windows.create(createData);
      creating.then(function(){
        var interval = setInterval(function(){
          var wallets = localStorage.getItem('$LYRA_ids');
          if(wallets !== null && wallets.length > 0){
            clearInterval(interval)
            app.$router.push('dashboard')
          }
        },200)
      });
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

<style lang="scss">
  p {
    font-size: 14px;
  }
  #welcomepage{
    text-align: center;
    width: 400px;
  }
  #create-id{
    width:100%;
    margin-top:10px;
  }
  .bottombar{
    display:none!important
  }
</style>
