<template>
  <div style="display: flex; justify-content: center">
    <div
      style="
        border-radius: 5px;
        max-width: 500px;
        width: 100%;
        min-height: 80px;
        background: #999;
        padding: 5px 0px;
      "
    >
      <div
        v-for="(audioFile, index) in audioFiles"
        @click="handlePlay(index)"
        style="color: #000; cursor: pointer; position: relative"
        class="music-row"
        :style="
          index == selectedIndex ? { background: '#27272f', color: '#fff' } : {}
        "
      >
        <div
          style="position: absolute; height: 100%; background: #0d5240"
          :style="{
            width: `${(currentTime / audioFile.duration) * 100}%`,
          }"
          v-if="selectedIndex == index"
        ></div>
        <div
          style="padding: 0 10px; display: flex; justify-content: space-between"
        >
          <div
            style="flex-grow: 1; text-align: left; z-index: 99"
          >
            <p style="margin: 4px 0">
              {{ parseInt(index) + 1 }} - {{ audioFile.name }}
            </p>
          </div>
          <p style="margin: 4px 0; z-index: 99">
            <span v-if="index == selectedIndex"
              >{{ formatTime(currentTime) }} / </span
            >{{ formatTime(audioFile.duration) }}
          </p>
        </div>
      </div>

      <input
        ref="audioInput"
        @change="onFileChange"
        type="file"
        name="files"
        style="display: none"
        accept="audio/*"
        multiple
      />
      <div
        class="drop-zone"
        @drop.prevent="dropHandler"
        @dragenter.prevent
        @dragover.prevent
        @click="$refs.audioInput.click()"
      >
        <p>Drop audio files here or click to add them.</p>
        <p>They won't be uploaded anywhere.</p>
      </div>
      <div style="padding: 0 10px" v-show="showControls">
        <audio
          @timeupdate="
            currentTime = Math.min(
              $event.target.currentTime,
              audioFiles[selectedIndex].duration
            )
          "
          @ended="playNext"
          @canplay="canPlay"
          ref="audioPlayer"
          controls
          style="width: 100%"
        ></audio>
      </div>
    </div>
    <div style="border-radius: 10px; overflow: hidden"></div>
  </div>
  <div
    style="position: relative; display: flex; justify-content: center"
    :style="{ height: `${cassetteHeight}px` }"
  >
    <transition name="fade">
      <div
        v-if="showPlayButton"
        style="
          position: absolute;
          display: flex;
          color: #fff;
          z-index: 999;
          align-items: center;
          height: 100%;
        "
      >
        <div class="playButton" @click="handlePlay(0)">▶</div>
      </div>
    </transition>
    <div
      id="cassette"
      style="width: 0; height: 0; margin-top: 10px"
      :style="cassetteStyle"
    >
      <div id="leftSpoolContainer">
        <div id="leftSpool" :style="leftSpoolStyle">
          <img class="cassette" src="../assets/spool_tape_lowres.png" />
        </div>
      </div>
      <div id="rightSpoolContainer">
        <div id="rightSpool" :style="rightSpoolStyle">
          <img src="../assets/spool_tape_lowres.png" />
        </div>
      </div>
      <div id="cassetteCase">
        <img src="../assets/cassette_case_lowres.png" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed, reactive, watch } from "vue";
const SPEED = 47.6;
const RMIN = 10.95; //minimum radius a spool can have
const TAPE_LENGTH = 128552.95350887459;
const THICKNESS = 11.2e-3;
const MAX_ROTATION = 1169;
const RMAX = RMIN + MAX_ROTATION * THICKNESS;
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

const cassetteMesurements = {
  casetteWidth: 800,
  casetteHeight: 508,
  leftSpoolPos: [227, 222],
  rightSpoolPos: [555, 222],
  spoolRadius: 366,
};

export default {
  setup(props) {
    const audioInput = ref(null);
    const audioFiles = ref({});
    const audioInfo = ref();
    const selectedIndex = ref(null);
    const audioPlayer = ref(null);
    const showControls = ref(false);
    const currentTime = ref(0);
    const _cassetteeStyle = reactive({
      scale:
        Math.min(window.innerWidth, 560) / cassetteMesurements.casetteWidth,
    });
    const cassetteStyle = computed(() => {
      return {
        transform: `scale(${_cassetteeStyle.scale}) translateX(${
          -cassetteMesurements.casetteWidth / 2
        }px)`,
      };
    });
    const _leftSpoolStyle = reactive({ radius: RMAX, rotation: 0 });
    const leftSpoolStyle = computed(() => {
      return {
        width: `${
          (_leftSpoolStyle.radius * cassetteMesurements.spoolRadius) / RMAX
        }px`,
        height: `${
          (_leftSpoolStyle.radius * cassetteMesurements.spoolRadius) / RMAX
        }px`,
        transform: `rotate(${_leftSpoolStyle.rotation}rad)`,
      };
    });
    const _rightSpoolStyle = reactive({ radius: RMIN, rotation: 0 });
    const rightSpoolStyle = computed(() => {
      return {
        width: `${
          (_rightSpoolStyle.radius * cassetteMesurements.spoolRadius) / RMAX
        }px`,
        height: `${
          (_rightSpoolStyle.radius * cassetteMesurements.spoolRadius) / RMAX
        }px`,
        transform: `rotate(${_rightSpoolStyle.rotation}rad)`,
      };
    });
    window.addEventListener("resize", () => {
      _cassetteeStyle.scale = Math.min(window.innerWidth, 560) / cassetteMesurements.casetteWidth;
    });
    const handlePlay = (index = 0) => {
      selectedIndex.value = index;
      audioPlayer.value.src = audioFiles.value[index].url;
      audioPlayer.value.play();
      showControls.value = true;
      showPlayButton.value = false;
    };
    const fastForward = async () => {
      for (let i = 0; i < 20; i++) {
        player.value.seekTo(player.value.getCurrentTime() + 10);
        await sleep(16);
      }
    };
    const addFiles = (files) => {
      var currentSongCount = Object.values(audioFiles.value).length;
      files.forEach((file, index) => {
        var objectURL = URL.createObjectURL(file);
        var audioInfo = document.createElement("audio");
        audioInfo.src = objectURL;
        audioInfo.addEventListener("loadedmetadata", (e) => {
          var info = {
            url: objectURL,
            duration: audioInfo.duration,
            name: file.name,
            accumulatedDuration: null, // will set the real value after first time accessing it.
            // have to set it null now because loadedmetadata doesn't add files in order.
            // audioFiles index 3 might be set before index 0.
            size: file.size,
          };
          audioFiles.value[currentSongCount + index] = info;
        });
      });
      if (currentSongCount == 0) {
        showPlayButton.value = true;
      }
    };
    const onFileChange = (event) => {
      addFiles(audioInput.value.files);
    };
    function sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    var loopStarted = false;
    const canPlay = () => {
      if (!loopStarted) {
        simulationLoop();
        loopStarted = true;
      }
    };

    async function simulationLoop() {
      while (true) {
        var currentFile = audioFiles.value[selectedIndex.value];
        if (currentFile.accumulatedDuration == null) {
          currentFile.accumulatedDuration = 0;
          for (let i = 0; i < selectedIndex.value; i++) {
            currentFile.accumulatedDuration += audioFiles.value[i].duration;
          }
        }
        var t =
          currentFile.accumulatedDuration + audioPlayer.value.currentTime || 0;
        t =
          (t % (45 * 60)) * (Math.floor(t / 45 / 60) % 2 == 0) +
          (45 * 60 - (t % (45 * 60))) * !(Math.floor(t / 45 / 60) % 2 == 0);
        try {
          var t = Math.min(t, TAPE_LENGTH / SPEED);
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

    const formatTime = (duration) => {
      return new Date(1000 * duration)
        .toISOString()
        .substr(...(duration >= 3600 ? [11, 8] : [14, 5]));
    };
    const playNext = () => {
      handlePlay(
        (parseInt(selectedIndex.value) + 1) % Object.values(audioFiles.value).length
      );
    };
    const dropHandler = (e) => {
      addFiles(e.dataTransfer.files);
    };

    const cassetteHeight = computed(() => {
      return cassetteMesurements.casetteHeight * _cassetteeStyle.scale;
    });

    const showPlayButton = ref(false);
    return {
      audioPlayer,
      handlePlay,
      selectedIndex,
      onFileChange,
      audioInput,
      audioFiles,
      fastForward,
      cassetteHeight,
      cassetteStyle,
      leftSpoolStyle,
      rightSpoolStyle,
      formatTime,
      showControls,
      currentTime,
      canPlay,
      playNext,
      dropHandler,
      showPlayButton,
    };
  },
};
</script>

  
<style lang="scss">
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
  transform: translate(44px, 39px);
  position: absolute;
  width: 366px;
  height: 366px;
  display: flex;
  align-items: center;
  justify-content: center;
}
#leftSpool {
  justify-content: center;
  align-items: center;
  display: flex;
  overflow: hidden;
  border-radius: 50%;
  transition: all 0.3s linear;
}
#rightSpoolContainer {
  transform: translate(372px, 39px);
  position: absolute;
  width: 366px;
  height: 366px;
  display: flex;
  align-items: center;
  justify-content: center;
}
#rightSpool {
  justify-content: center;
  align-items: center;
  display: flex;
  overflow: hidden;
  border-radius: 50%;
  transition: all 0.3s linear;
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
.music-row {
  &:hover {
    background: #27272f80;
    color: #fff !important;
  }
}
.drop-zone {
  background: #778085;
  color: #000;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background: #576065;
  }
}
.playButton {
  font-size: 150px;
  text-shadow: 0 0 20px black, 30px 30px 10px #000000b0;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  &:hover {
    color: #b8a372;
    font-size: 165px;
    text-shadow: 0 0 20px black, 40px 40px 14px #000000a0;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(2);
}
</style>