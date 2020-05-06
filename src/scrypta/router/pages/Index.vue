<template>
  <div id="welcomepage">
    <img style="margin-top:20px; margin-bottom:40px" src="extension.png" height="60"><br>
    <div class="row">
      <p style="width:100%;">With this extension you will be able to store and manage your identities and use it directly into Scrypta dApps Ecosystem.</p>
    </div>
    <div style="margin-top:20px">
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
      var isFirefox = typeof InstallTrigger !== 'undefined';
      var tablink
      if(!isFirefox){
        let id = chrome.runtime.id
        tablink = 'chrome-extension://' + id + '/scrypta/id.html#/import'
      }else{
        tablink = "./id.html#/import"
      }
      let createData = {
        type: "panel",
        url: tablink,
        width: 500,
        height: 400
      };
      let creating = browser.windows.create(createData)
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
