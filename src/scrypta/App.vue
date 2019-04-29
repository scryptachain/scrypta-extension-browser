<template>
  <div id="app">
    <!--<a id="open" :href="openlink" target="_blank"><i class="fas fa-external-link-alt"></i></a>-->
    <router-view></router-view>
    <div v-if="showbar" class="bottombar">
      <div v-on:click="showDappExplorer()" class="buttonbar">
        dApp Explorer
      </div>
      <div v-on:click="showChangeID()" class="buttonbar">
          Manage IDs
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      id: '',
      openlink: '',
      showbar: false
    }
  },
  mounted (){
    const app = this
    app.id = chrome.runtime.id
    app.openlink = 'chrome-extension://' + app.id + '/scrypta/id.html'
    var wallet = localStorage.getItem('$LYRA_ids');
    if(wallet === null || wallet.length === 0){
      app.showbar = false
    }else{
      app.showbar = true
    }
  },
  methods: {
    showDappExplorer(){
      const app = this
      app.$router.push('explorer')
    },
    showChangeID(){
      const app = this
      app.$router.push('manage')
    }
  }
}
</script>
<style>
  #app{
    min-width:350px;
    width: 100%;
    min-height: 350px;
    padding:20px 20px 70px 20px;
    overflow-y: auto;
    overflow-x: hidden;
    font-family: 'Poppins', sans-serif;
  }
  #open{
    color:#666;
    width:15px;
    height:15px;
    position:fixed;
    top:20px; 
    right:20px;
    font-size:12px;
  }
  h3{
    font-size:20px; 
    margin-top:20px;
    width:100%;
    text-align:center;
  }
  .row{
    padding:0 20px;
    text-align:center;
  }
  .header{
    font-size:12px; 
    width:100%;
    text-align:center;
    padding:0 0 10px 0;
    border-bottom:1px solid #ccc
  }
  .back{
    position:absolute; 
    top:20px; 
    color:#666; 
    left:20px;
  }
  .back:hover{
    color:#000;
    cursor:pointer;
  }
  a{
    color:#d43f51!important
  }
  .arrow{
    position:absolute; 
    top:50%; 
    margin-top:-10px; 
    height:20px; 
    right:10px;
  }

  .bottombar{
    position:fixed;
    bottom:0;
    left:0;
    width:100%;
    padding:0 15px;
    border-top:1px solid #ccc
  }
  .buttonbar{
    width:50%;
    float:left; 
    text-align: center;
    line-height: 40px; 
    height: 40px;
    font-size:12px;
  }
  .buttonbar:hover{
    cursor:pointer;
  }
</style>