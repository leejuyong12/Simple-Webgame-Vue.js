<template>
  <div>
    <!-- v-bind 를 : 로 대체할 수 있다. -->
    <div id="screen" v-bind:class="state" @click="onClickScreen">{{message}}</div>  
    <div v-if="result.length">
    <!-- v-show 와 v-if의 차이 = v-show는 태그가 있고 display:none이라 되어있고 -->
    <!-- v-if는 그냥 주석처리된 거만 생긴다 그니까 한마디로 v-show는 있는데 안보여주는거고-->
    <!-- v-if는 그냥 안생기고 생기고 이런 흐름이다. -->
      <div>평균시간: {{average}}ms</div>
      <button @click="onReset">리셋</button>
    </div>
  </div>
</template>
<script>
  let startTime = 0;
  let endTime = 0;
  let timeout = null;
  export default {
    data() {
      return {
        result: [],
        state: 'waiting',
        message: '클릭해서 시작하세요.'
      };
    },
    computed: {  // computed 쓰는 이유 - 값이 캐싱이 된다. - 다른 부분이 바꼈을때 이 부분이 재실행되지 않도록
      average() {
        return this.result.reduce((a, c) => a+c, 0) / this.result.length || 0;
      }
    },
    methods: {
      onReset() {
      },
      onClickScreen() {
        if (this.state === 'waiting') {
          this.state = 'ready';
          this.message = '초록색이 되면 클릭하세요';
          timeout = setTimeout(() => {
            this.state = 'now';
            this.message = '지금 클릭!';
            startTime = new Date();
          }, Math.floor(Math.random() * 1000) + 2000); // 2~3초
        } else if (this.state === 'ready') {
          clearTimeout(timeout);
          this.state = 'waiting';
          this.message = '너무 성급하시군요! 초록색이 된 후에 클릭하세요.'
        } else if (this.state === 'now') {
          endTime = new Date();
          this.state = 'waiting';
          this.message = '클릭해서 시작하세요.';
          this.result.push(endTime - startTime);
        }
        }
      }
    
  };
</script>


<style scoped>
  #screen {
    width: 300px;
    height: 200px;
    text-align: center;
    user-select: none;
  }
  #screen.waiting {
    background-color: aqua;
  }
  #screen.ready {
    background-color: red;
    color: white;
  }
  #screen.now {
    background-color: greenyellow;
  }
</style>