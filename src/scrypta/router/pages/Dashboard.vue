<template>
  <div id="welcomepage">
    <div class="header">
      <strong>{{ label }}</strong><br>
      {{ pubkey }}
    </div>
    <div v-if="dapps">
      <div v-for="dapp in dapps" v-bind:key="dapp">
        <b-card class="mb-2 mt-2">
          <b-card-text>
            {{ dapp }}
          </b-card-text>
          <a style="position:absolute; top:0px; right:10px;" target="_blank" :href="'https://' + dapp" variant="primary"><i class="fa fa-arrow-right"></i></a>
        </b-card>
      </div>
    </div>
    <div v-if="dapps.length === 0" style="text-align:center; margin:20px 0">
      This identity is unused yet,<br>
      <a style="cursor:pointer" v-on:click="showDappExplorer()">browse dApps now!</a>
    </div>
    <b-button style="width:100%;" variant="primary" v-on:click="useIdentity">USE THIS IDENTITY</b-button>
    
  </div>
</template>

<script>
export default {
  data () {
    return {
      label: '',
      wallet: '',
      pubkey: '',
      dapps: [],
      scrypta: window.ScryptaCore,
      localStorage: window.localStorage
    }
  },
  methods: {
    showDappExplorer(){
      const app = this
      app.$router.push('explorer')
    },
    useIdentity(){
      const app = this
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {injectID: app.pubkey+':'+app.wallet}, function(response) {
          if(response){
            var dapps = localStorage.getItem('$LYRA_dapps');
            if(dapps !== null){
              dapps = JSON.parse(dapps)
            }else{
              dapps = {};
            }
            if(!dapps[app.pubkey]){
              dapps[app.pubkey] = [response]
            }
            if(dapps[app.pubkey].indexOf(response) === -1){
              dapps[app.pubkey].push(response)
            }
            app.localStorage.setItem('$LYRA_dapps', JSON.stringify(dapps))
            app.dapps = dapps[app.pubkey]
          }
        });
      });
    }
  },
  mounted (){
    const app = this
    var wallet = localStorage.getItem('$LYRA_ids');
    wallet = JSON.parse(wallet);
    if(wallet === null || wallet.length === 0){
      app.$router.push('index')
    }else{
      var last = localStorage.getItem('$LYRA_lastid');
      app.label = last
      var split = wallet[last].split(':')
      app.pubkey = split[0]
      app.wallet = split[1]
      var dapps = localStorage.getItem('$LYRA_dapps');
      if(dapps !== null){
        dapps = JSON.parse(dapps)
        app.dapps = dapps[app.pubkey]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  p {
    font-size: 14px;
  }
  .card-body{
    padding:0 5px; 
    line-height:35px; 
    height:35px
  }
</style>
