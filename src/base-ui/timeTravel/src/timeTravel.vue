<template>
  <div class="time-travel">
    <canvas id="travel" ref="travelRef"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const travelRef = ref<HTMLCanvasElement | null>(null)
const ctx = ref<CanvasRenderingContext2D | null | undefined>(null)
const list = ref<Star[]>([])

onMounted(() => {
  ctx.value = travelRef.value?.getContext('2d')
  init()
  setPosValues()
  animate()

  window.onresize = () => {
    init()
  }
})

class Star {
  x: number
  y: number
  radius: number
  disX: number
  disY: number

  constructor(x: number, y: number, radius: number, disX: number, disY: number) {
    this.x = x
    this.y = y
    this.radius = radius
    this.disX = disX
    this.disY = disY
  }
}

function init() {
  travelRef.value!.width = window.innerWidth
  travelRef.value!.height = window.innerHeight
}

function setPosValues() {
  for (let i = 0; i < 800; i++) {
    const x = Math.random() * travelRef.value!.width
    const y = Math.random() * travelRef.value!.height
    const radius = Math.random() * 2
    const disX = x - travelRef.value!.width / 2
    const disY = y - travelRef.value!.height / 2
    const posObj = new Star(x, y, radius, disX, disY)
    list.value.push(posObj)
  }
}

function animate() {
  ctx.value!.clearRect(0, 0, travelRef.value!.width, travelRef.value!.height)
  for (var i = 0; i < 800; i++) {
    const a = list.value[i]
    a.x += a.disX / 50
    a.y += a.disY / 50
    if (a.x < 0 || a.y < 0 || a.x > travelRef.value!.width || a.y > travelRef.value!.height) {
      a.x = Math.random() * travelRef.value!.width
      a.y = Math.random() * travelRef.value!.height
      a.disX = a.x - travelRef.value!.width / 2
      a.disY = a.y - travelRef.value!.height / 2
    }
    ctx.value!.beginPath()
    ctx.value!.fillStyle = '#b200ff'
    ctx.value!.arc(a.x, a.y, a.radius, 0, Math.PI * 2, false)
    ctx.value!.fill()
  }
  setTimeout(animate, 40)
}
</script>

<style scoped lang="less">
.time-travel {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  right: 0;
  z-index: -1;

  #travel {
    background-color: #000;
  }
}
</style>
