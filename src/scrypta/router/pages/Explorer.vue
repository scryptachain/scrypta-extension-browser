<template>
  <div id="explorerpage">
      <i v-on:click="showDashboard" class="fa fa-arrow-left back"></i>  
      <div class="header">
        <strong>dApp Explorer</strong>
      </div> 
      <div v-if="dapps">
        <div v-for="dapp in dapps" v-bind:key="dapp">
          <b-card class="mb-2 mt-2">
            <b-card-text>
              <strong class="dapp-title">{{ dapp.name }}</strong>
              <p>{{ dapp.description }}</p>
            </b-card-text>
            <a class="arrow" target="_blank" :href="'https://' + dapp.link" variant="primary"><i class="fa fa-arrow-right"></i></a>
          </b-card>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dapps: 
      [
        {
          name: 'Manent',
          description: 'Manage you funds and store data.',
          link: 'web.manent.app'
        },
        {
          name: 'Me',
          description: 'Connect third party identities.',
          link: 'me.scrypta.id'
        },
        {
          name: 'Planum',
          description: 'Create tokens with few clicks.',
          link: 'planum.dev'
        },
        {
          name: 'Electio',
          description: 'Polls over the blockchain.',
          link: 'electio.app'
        },
        {
          name: 'News',
          description: 'Decentralized News Feed.',
          link: 'news.scryptachain.org'
        }
      ]
    }
  },
  methods: {
    showDashboard(){
      const app = this
      app.$router.push('dashboard')
    }
  },
  mounted (){
    
  }
}
</script>

<style lang="scss" scoped>
  .dapp-title { font-size: 18px;}
  p {
    font-size: 12px;
    margin-bottom:0px!important
  }
  #explorerpage{
    width:400px;
  }
</style>
