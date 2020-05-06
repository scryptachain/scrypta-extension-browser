<template>
  <div id="welcomepage">
    <div class="header">
      <strong>{{ label }}</strong><br>
      {{ pubkey }}
    </div>
    <b-button style="width:100%; font-size:50px; margin-top:30px" variant="primary" v-on:click="useIdentity">USE THIS<br>IDENTITY</b-button>
    <b-button v-if="!showRealForget" style="width:100%; margin-top:10px" variant="warning" v-on:click="forgetIdentityConfirm">FORGET IDENTITY</b-button>
    <b-button v-if="showRealForget" style="width:100%; margin-top:10px" variant="danger" v-on:click="forgetIdentity">I'M 100% SURE, DESTROY ID</b-button>
    
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
      showRealForget: false,
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
    },
    forgetIdentityConfirm(){
      const app = this
      app.showRealForget = true
    },
    forgetIdentity(){
      const app = this
      var wallets = localStorage.getItem('$LYRA_ids');
      wallets = JSON.parse(wallets)
      delete wallets[app.label]
      app.localStorage.setItem('$LYRA_ids', JSON.stringify(wallets))
      app.showRealForget = false
      for(var key in wallets){
        app.localStorage.setItem('$LYRA_lastid', key );
      }
      app.$router.push('manage')
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
  #welcomepage{
    width: 400px;
  }
  p {
    font-size: 14px;
  }
  .card-body{
    padding:0 5px; 
    line-height:35px; 
    height:35px
  }
</style>
