<template>
  <div style="display: flex; justify-content: center">
    <div style="border-radius: 10px; overflow: hidden; ">
      <YouTube
        @ready="onReady"
        src="https://www.youtube.com/watch?v=CSSKNCYaQUA"
        ref="player"
      />
    </div>
  </div>
  <button @click="player.playVideo()">play</button>
  <button @click="player.pauseVideo()">pause</button>
  <button @click="fastForward">fast forward</button>
  <div style="position: relative; display: flex; justify-content: center">
    <div id="cassette" style="width: 0; height: 0" :style="cassetteStyle">
      <div id="leftSpoolContainer">
        <div id="leftSpool" :style="leftSpoolStyle">
          <img class="cassette" src="../assets/cassette_spool_l.png" />
        </div>
      </div>
      <div id="rightSpoolContainer">
        <div id="rightSpool" :style="rightSpoolStyle">
          <img src="../assets/cassette_spool_r.png" />
        </div>
      </div>
      <div id="cassetteCase">
        <img src="../assets/cassette_case.png" />
      </div>

      <!-- <div id="frontCap">
        <img src="../assets/cassette_front_cap2.png" />
      </div> -->
    </div>
  </div>
  <!-- <canvas ref="canvas" id="canvas"></canvas> -->
</template>

<script>
import { ref, onMounted, computed, reactive } from "vue";
import YouTube from "vue3-youtube";

const SPEED = 47.6;
const RMIN = 10.95; //minimum radius a spool can have
const TAPE_LENGTH = 128552.95350887459;
const THICKNESS = 11.2e-3;
const MAX_ROTATION = 1169;
const RMAX = RMIN + MAX_ROTATION * THICKNESS;

window.RMAX = RMAX;
window.RMIN = RMIN;

class Cassette {
  constructor(time) {
    this.time = time;
  }

  static root(p) {
    return (-p[1] + Math.sqrt(p[1] ** 2 - 4 * p[0] * p[2])) / 2 / p[0];
  }

  get left_spool_radius() {
    return Cassette.root([
      Math.PI,
      0,
      -Math.PI * RMAX ** 2 + this.time * SPEED * THICKNESS,
    ]);
  }

  get right_spool_radius() {
    return Cassette.root([
      Math.PI,
      0,
      -Math.PI * RMIN ** 2 - this.time * SPEED * THICKNESS,
    ]);
  }

  get left_spool_rotation() {
    return (RMAX - this.left_spool_radius) / THICKNESS;
  }

  get right_spool_rotation() {
    return (this.right_spool_radius - RMIN) / THICKNESS;
  }
}

window.Cassette = Cassette;

export default {
  components: { YouTube },
  setup(props) {
    const player = ref(null);
    window.player = player;

    const _cassetteeStyle = reactive({ scale: 0.2 });
    const cassetteStyle = computed(() => {
      return {
        transform: `scale(${_cassetteeStyle.scale}) translateX(-1402px)`,
      };
    });

    const _leftSpoolStyle = reactive({ radius: RMAX, rotation: 0 });
    const leftSpoolStyle = computed(() => {
      return {
        width: `${(_leftSpoolStyle.radius * 1237) / RMAX}px`,
        height: `${(_leftSpoolStyle.radius * 1237) / RMAX}px`,
        transform: `rotate(${_leftSpoolStyle.rotation}rad)`,
      };
    });

    const _rightSpoolStyle = reactive({ radius: RMIN, rotation: 0 });
    const rightSpoolStyle = computed(() => {
      return {
        width: `${(_rightSpoolStyle.radius * 1237) / RMAX}px`,
        height: `${(_rightSpoolStyle.radius * 1237) / RMAX}px`,
        transform: `rotate(${_rightSpoolStyle.rotation}rad)`,
      };
    });

    window.addEventListener("resize", () => {
      _cassetteeStyle.scale = Math.min(
        Math.min(window.innerHeight, 388) / 1943,
        Math.min(window.innerWidth, 560) / 2804
      );
    });

    window._leftSpoolStyle = _leftSpoolStyle;
    window._rightSpoolStyle = _rightSpoolStyle;
    window._cassetteeStyle = _cassetteeStyle;

    function sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    async function simulationLoop() {
      while (true) {
        var t = player.value.getCurrentTime() || 0;
        try {
          var t = Math.min(t, TAPE_LENGTH / SPEED);
          if (t > 45 * 60) {
            player.value.pauseVideo();
          }
          var c = new Cassette(t);
          _leftSpoolStyle.radius = c.left_spool_radius;
          _leftSpoolStyle.rotation = c.left_spool_rotation * 2 * Math.PI;
          _rightSpoolStyle.radius = c.right_spool_radius;
          _rightSpoolStyle.rotation = c.right_spool_rotation * 2 * Math.PI;
        } catch (error) {
          console.log(error);
        } finally {
          await sleep(20);
        }
      }
    }

    const fastForward = async () => {
      for (let i = 0; i < 20; i++) {
        player.value.seekTo(player.value.getCurrentTime() + 10);
        await sleep(16);
      }
    };

    const onReady = () => {
      simulationLoop();
      player.value.playVideo();
    };

    onMounted(() => {
      console.log("mounted");
    });

    return {
      fastForward,
      player,
      onReady,
      cassetteStyle,
      leftSpoolStyle,
      rightSpoolStyle,
    };
  },
};
</script>

<style>
img {
  user-drag: none !important;
  user-select: none !important;
  -moz-user-select: none !important;
  -webkit-user-drag: none !important;
  -webkit-user-select: none !important;
  -ms-user-select: none !important;
  pointer-events: none;
}
#leftSpoolContainer {
  transform: translate(230px, 169px);
  position: absolute;
  width: 1237px;
  height: 1237px;
  display: flex;
  align-items: center;
  justify-content: center;
}
#leftSpool {
  width: 900px;
  height: 900px;
  justify-content: center;
  align-items: center;
  display: flex;
  overflow: hidden;
  border-radius: 50%;
}
#rightSpoolContainer {
  transform: translate(1322px, 169px);
  position: absolute;
  width: 1237px;
  height: 1237px;
  display: flex;
  align-items: center;
  justify-content: center;
}
#rightSpool {
  width: 700px;
  height: 700px;
  justify-content: center;
  align-items: center;
  display: flex;
  overflow: hidden;
  border-radius: 50%;
}
#cassetteCase {
  position: absolute;
}
#frontCap {
  position: absolute;
}
button + button {
  margin-left: 2px;
}
</style>