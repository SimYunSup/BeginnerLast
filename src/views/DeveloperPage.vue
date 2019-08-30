<template>
  <div
    class="developer"
  >
    <b-row>
      <b-col
        cols="12"
        lg="6"
        offset-lg="3"
      >
        <transition-group
          class="list-unstyled"
          name="list"
          tag="ul"
        >
          <b-media
            class="my-5"
            v-for="(media, index) in mediaList"
            :key="index"
            tag="li"
          >
            <template #aside>
              <b-img
                width="200"
                height="200"
                :src="media.imgSrc"
                :alt="media.alt"
              />
            </template>

            <h2
              class="mt-0 mb-1"
            >
              {{ media.title }}
            </h2>

            <div
              class="developer__explanation"
            >
              {{ media.explanation }}
            </div>
          </b-media>
        </transition-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  export default {
    name: "DeveloperPage",
    data() {
      return {
        mediaList: [
          {
            imgSrc: require('../assets/sups.jpg'),
            alt: 'crazy',
            title: '그는 이상합니다',
            explanation: '그는 무언가 이상한 생각을 합니다. ' +
              '지금까지 아무생각 없이 살아왔기 때문에 그럴지도 모릅니다. ' +
              '그렇기에 그의 생각을 알아내는 것은 힘들 수도 있습니다. ' +
              '하지만 반대로 생각을 알아내는 것이 쉬울 수도 있습니다. ' +
              '아무생각도 안 하기 때문에 생각이 단순하기 때문이죠. ' +
              '한 번 그를 지켜보는 것도 나쁘지 않겠군요.'
          }
        ]
      }
    },
    mounted() {
      this.$nextTick()
        .then(
          () => {
            //in setTimeout, 'this' is window not vue component
            let vm = this
            setTimeout(
              function () {
                console.log(this)
                vm.mediaList.push(
                  {
                    imgSrc: require('../assets/neko.png'),
                    alt: 'for free',
                    title: '그는 무료로 해드립니다',
                    explanation: '그는 시키지도 않았는데 무언가 해보려 합니다. ' +
                      '사진과 같이 아무도 시키지 않았는데 고양이귀 헤드폰을 끼는 것 같이요. ' +
                      '이외에도 솔루션을 만들어 내기도 하죠. ' +
                      '그가 하는 짓은 좋을 때도 있지만 한 대 치고 싶은 충동을 일으키기도 합니다. ' +
                      '그가 무언가 이상한 짓을 의지를 갖고 하려 한다면 뒷통수를 한 대 때리는 것을 추천드립니다. ' +
                      '그렇지 않으면 무료라는 핑계로 이상한 개짓거리를 할지도 모르겠군요..'
                  }
                )
              },
              3000
            )
          }
        )
        .then(
          () => {
            let vm = this
            setTimeout(
              function() {
                vm.mediaList.push(
                  {
                    imgSrc: require('../assets/nothinking.png'),
                    alt: 'for free',
                    title: '그는 술을 먹고 싶어 합니다',
                    explanation: '그는 답이 안 나오는 일이 있다면 술을 찾습니다.. ' +
                      '그가 술을 매우 못하는 것같지만 그 부분은 넘어갑시다. ' +
                      '왜냐면 술을 먹고 싶어하는 것과 술을 잘 먹는 건 다르잖아요? ' +
                      '그래서 그는 언제나 먹는 양을 조절하려고 애를 쓰는 것 같습니다.' +
                      '물론 언제나 실패합니다. ' +
                      '그러므로 그가 술을 매우 빠르게 먹는 모습이 보인다면 뒷통수를 한 대 치기를 권합니다. '
                  }
                )
              },
              6000
            )
          }
        )
        .then(
          () => {
            let vm = this
            setTimeout(
              function () {
                vm.mediaList.push(
                  {
                    imgSrc: require('../assets/dragoon.png'),
                    alt: 'dragoon',
                    title: '그는 드라군입니다.',
                    explanation: '??????????????????????'
                  }
                )
              },
              9000
            )
          }
        )
    }
  }
</script>

<style scoped>
  .developer {
    height: 90vh;
    padding-top: 70px;
  }
  .developer__explanation {
    font-size: 17px;
  }

  .list-enter-active, .list-leave-active {
    transition: all .3s;
  }
  .list-enter, .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
</style>