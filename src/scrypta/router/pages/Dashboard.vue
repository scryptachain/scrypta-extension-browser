<template>
  <div id="welcomepage">
    <div class="header" style="text-align:left; position:relative">
      <v-gravatar :email="pubkey" style="float:left; width:38px; height:38px; margin-right:10px; border-radius:4px;" />
      <strong>{{ label }}</strong><br>
      {{ pubkey.substr(0,4) }}...{{ pubkey.substr(-4) }}
      <div style="position:absolute; top:0; right:0; text-align:right; width:150px;">
        <strong>Balance</strong><br>
        {{ balance }} LYRA
      </div>
    </div>
    <b-button style="width:100%; font-size:50px; margin-top:15px" variant="primary" v-on:click="useIdentity">USE THIS<br>IDENTITY</b-button>
    <hr>
    <b-button v-if="!showRealForget" style="width:100%; margin-top:0px" variant="warning" v-on:click="forgetIdentityConfirm">FORGET IDENTITY</b-button>
    <b-button v-if="showRealForget" style="width:100%; margin-top:10px" variant="danger" v-on:click="forgetIdentity">I'M 100% SURE, DESTROY ID</b-button>
    <b-button style="width:100%; margin-top:10px" variant="success" v-on:click="downloadWallet">BACKUP .SID FILE</b-button>
    <a id="downloadsid" style="display:none"></a>
  </div>
</template>

<script>
const axios = require('axios')

export default {
  data () {
    return {
      label: '',
      wallet: '',
      pubkey: '',
      dapps: [],
      balance: "-",
      showRealForget: false,
      scrypta: window.ScryptaCore,
      localStorage: window.localStorage,
      axios: axios
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
    },
    downloadWallet() {
      if (this.wallet !== "") {
        var a = document.getElementById("downloadsid");
        var file = new Blob(
          [this.pubkey + ":" + this.wallet],
          { type: "sid" }
        );
        a.href = URL.createObjectURL(file);
        a.download = this.pubkey + ".sid";
        var clickEvent = new MouseEvent("click", {
          view: window,
          bubbles: true,
          cancelable: false
        });
        a.dispatchEvent(clickEvent);
      } else {
        alert("Need a wallet first");
      }
    }
  },
  async mounted (){
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
      // let node = await app.scrypta.connectNode()
      let node = "https://idanodejs01.scryptachain.org"
      let response = await app.axios.get(node + "/balance/" + app.pubkey)
      app.balance = response.data.balance 
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
