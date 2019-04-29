<template>
  <div id="managepage">
      <i v-on:click="showDashboard" class="fa fa-arrow-left back"></i>   
      <i v-on:click="showCreateIdentity" class="fas fa-plus new"></i>
      <div class="header">
        <strong>Manage IDs</strong>
      </div> 
      <div v-if="wallets">
        <div v-for="wallet in wallets" v-bind:key="wallet.pubkey">
          <b-card class="mb-2 mt-2">
            <b-card-text>
              <strong>{{ wallet.label }}</strong>
              <p>{{ wallet.pubkey }}</p>
            </b-card-text>
            <a v-on:click="useIdentity(wallet.label)" class="fa fa-arrow-right arrow"></a>
          </b-card>
        </div>
      </div><!--
      <b-button style="width:100% ;" class="mb-2" variant="primary" v-on:click="backupIdentities()">MAKE BACKUP</b-button>
      <b-button style="width:100%;" variant="success" v-on:click="importIdentities()">IMPORT IDENTITIES</b-button>-->
  </div>
</template>

<script>
export default {
  data () {
    return {
      wallets: [],
      scrypta: window.ScryptaCore,
      localStorage: window.localStorage
    }
  },
  methods: {
    showDashboard(){
      const app = this
      app.$router.push('dashboard')
    },
    showCreateIdentity(){
      const app = this
      app.$router.push('create')
    },
    useIdentity(label){
      const app = this
      app.localStorage.setItem('$LYRA_lastid', label)
      app.$router.push('dashboard')
    }
  },
  mounted (){
    const app = this
    var wallets = localStorage.getItem('$LYRA_ids');
    wallets = JSON.parse(wallets);
    if(wallets === null || wallets.length === 0){
      app.$router.push('index')
    }else{
      for(var key in wallets){
        var split = wallets[key].split(':')
        var wallet = {
          label: key,
          pubkey: split[0],
          wallet: split[1]
        }
        app.wallets.push(wallet)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  p {
    font-size: 11px;
    margin-bottom:0px!important;
  }
  strong{
    font-size:14px;
  }
  a:hover{
    cursor: pointer!important;
  }
  .new{
    position:absolute; 
    top:20px; 
    color:#666; 
    right:20px;
  }
  .new:hover{
    color:#000;
    cursor:pointer;
  }
</style>
