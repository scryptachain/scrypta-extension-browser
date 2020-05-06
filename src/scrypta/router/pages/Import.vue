<template>
  <div id="welcomepage">
    <div class="header">
      <strong>Import identity</strong>
    </div> 
    <div class="row mt-2">
      <p>
        Choose a .sid file from your computer and import identity.
      </p>
      <b-form-input v-model="label" type="text" placeholder="Insert a label"></b-form-input>
      <b-form-file
        v-model="file"
        :state="Boolean(file)"
        placeholder="Choose a .sid file..."
        drop-placeholder="Drop .sid here..."
        @change="loadWalletFromFile"
      ></b-form-file>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      label: '',
      file: '',
      wallet: {},
      scrypta: window.ScryptaCore,
      localStorage: window.localStorage
    }
  },
  methods: {
    loadWalletFromFile(ev) {
      const app = this
      if(app.label !== ''){
          if(app.wallet[app.label] === undefined){
            const file = ev.target.files[0];
            const reader = new FileReader();
            reader.onload = function() {
                var dataKey = reader.result;
                app.wallet[app.label] = dataKey
                app.localStorage.setItem('$LYRA_ids', JSON.stringify(app.wallet) );
                app.localStorage.setItem('$LYRA_lastid', app.label );
                window.close()
            };
            reader.readAsText(file);
          }else{
            alert('This identity exists, please choose another label!')
          }
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
  }
  #create-id{
    width:100%;
    margin-top:20px;
  }
</style>
