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
              <strong>{{ dapp.name }}</strong>
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
          description: 'Scrypta official web wallet, manage you funds and store data.',
          link: 'manent.scryptachain.org'
        },
        {
          name: 'Contracts',
          description: 'Create contracts between 2 or more people with few clicks.',
          link: 'contracts.scryptachain.org'
        },
        {
          name: 'Polls',
          description: 'Polls management dApp for decentralized decisions.',
          link: 'polls.scryptachain.org'
        },
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
  p {
    font-size: 14px;
    margin-bottom:0px!important
  }
</style>
