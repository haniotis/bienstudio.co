"use client"

import { useEffect, useRef } from "react"
import { createNoise3D } from "simplex-noise"
import { cn } from "@/utils/cn"

// The hero visual: a monochrome LED-matrix / halftone grid. Each fixed mark's
// resting SHAPE (square / circle / triangle) is picked by a slowly morphing fbm
// noise field — the differing shape coverage reads as soft gray "camouflage"
// blobs. All dots sit at a base gray until the POINTER is over the grid: two
// orbs then follow the cursor and pump up a per-cell "charge" fast (it decays
// slowly), ramping those dots gray→white, rotating their shape, and — via a
// threshold → blur → additive bloom — glowing, leaving a soft lingering comet
// trail. No light floats around on its own. Fades in over the top edge; mono.
export function DotGrid({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const container = containerRef.current!
    const canvas = canvasRef.current!
    const ctx = canvas.getContext("2d")!
    if (!container || !canvas || !ctx) return

    const bloomCanvas = document.createElement("canvas")
    const bctx = bloomCanvas.getContext("2d")!

    const noise = createNoise3D()
    // fbm: 2 octaves, persistence 0.5, lacunarity 2.17.
    const fbm = (x: number, y: number, z: number) => {
      let sum = 0
      let amp = 1
      let freq = 1
      let norm = 0
      for (let i = 0; i < 2; i++) {
        sum += amp * noise(x * freq, y * freq, z)
        norm += amp
        amp *= 0.5
        freq *= 2.17
      }
      return sum / norm
    }
    const NF = 1 / (34 * 15) // noise feature size ≈ 34 cells
    const SEEDX = 87.72
    const SEEDY = -50.04
    const RESTING = [2, 1, 0] // fbm bucket → shape id (0 sq, 1 circle, 2 tri)

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches

    const TAU = Math.PI * 2
    // Grid pitch + mark size — smaller on narrow (mobile) widths. Set in resize.
    let spacing = 15
    let dot = spacing * 0.72
    let half = dot / 2
    const HOVER_R = 70 // charge injection radius around each orb
    const CHARGE_UP = 7.5
    const CHARGE_DOWN = 0.6
    // Charge → gray→white ramp (base #929292, two steps, white).
    const g0 = 0x92 / 255
    const GRAY = [g0, g0 + (1 - g0) / 3, g0 + (2 * (1 - g0)) / 3, 1]
    const BLOOM_THRESHOLD = 0.6
    const BLOOM_BLUR = 8

    const clamp = (v: number, a: number, b: number) =>
      v < a ? a : v > b ? b : v
    const smoothstep = (a: number, b: number, x: number) => {
      const t = clamp((x - a) / (b - a), 0, 1)
      return t * t * (3 - 2 * t)
    }

    let width = 0
    let height = 0
    let cols = 0
    let rows = 0
    let offX = 0
    let offY = 0
    let dpr = 1
    let charge = new Float32Array(0)

    const pointer = { x: 0, y: 0, active: false }

    type Orb = { x: number; y: number; vx: number; vy: number }
    let orbs: Orb[] = []
    function initOrbs() {
      orbs = [0, 1].map((i) => ({
        x: width * (0.4 + 0.2 * i),
        y: height * 0.5,
        vx: 0,
        vy: 0,
      }))
    }

    function resize() {
      const rect = container.getBoundingClientRect()
      width = Math.max(1, Math.round(rect.width))
      height = Math.max(1, Math.round(rect.height))
      spacing = width < 640 ? 10 : 15
      dot = spacing * 0.72
      half = dot / 2
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      for (const cnv of [canvas, bloomCanvas]) {
        cnv.width = Math.round(width * dpr)
        cnv.height = Math.round(height * dpr)
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cols = Math.ceil(width / spacing) + 1
      rows = Math.ceil(height / spacing) + 1
      offX = (width - (cols - 1) * spacing) / 2
      offY = (height - (rows - 1) * spacing) / 2
      const n = cols * rows
      if (charge.length !== n) charge = new Float32Array(n)
      if (orbs.length === 0) initOrbs()
    }
    resize()

    let t = 0
    let running = true
    let raf = 0

    // Orbs only move while the pointer is over the grid; they spring to it, each
    // orbiting a small offset so both stay distinct and paint a fuller trail.
    function stepOrb(o: Orb, i: number) {
      const orbit = i * Math.PI + t * 1.6
      const tx = pointer.x + Math.cos(orbit) * 22
      const ty = pointer.y + Math.sin(orbit) * 22
      o.vx += (tx - o.x) * 0.08
      o.vy += (ty - o.y) * 0.08
      o.vx *= 0.78
      o.vy *= 0.78
      o.x += o.vx
      o.y += o.vy
    }

    // Charge integrator: only the pointer's orbs inject (so there are no blobs
    // at rest); rush up toward their radial falloff, bleed down slowly.
    function updateCharge(dt: number) {
      const up = CHARGE_UP * dt
      const down = CHARGE_DOWN * dt
      const inject = pointer.active
      for (let r = 0; r < rows; r++) {
        const py = offY + r * spacing
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c
          const cur = charge[idx]
          let target = 0
          if (inject) {
            const px = offX + c * spacing
            for (let oi = 0; oi < orbs.length; oi++) {
              const o = orbs[oi]
              const dx = px - o.x
              if (dx > HOVER_R || dx < -HOVER_R) continue
              const dy = py - o.y
              if (dy > HOVER_R || dy < -HOVER_R) continue
              const d = Math.sqrt(dx * dx + dy * dy)
              if (d < HOVER_R) {
                const v = 1 - d / HOVER_R
                if (v > target) target = v
              }
            }
          }
          charge[idx] =
            target > cur ? Math.min(cur + up, target) : Math.max(cur - down, 0)
        }
      }
    }

    function shapePath(
      g: CanvasRenderingContext2D,
      shape: number,
      px: number,
      py: number,
    ) {
      if (shape === 0) {
        g.fillRect(px - half, py - half, dot, dot)
      } else if (shape === 1) {
        g.beginPath()
        g.arc(px, py, half, 0, TAU)
        g.fill()
      } else {
        g.beginPath()
        g.moveTo(px, py - half)
        g.lineTo(px + half, py + half)
        g.lineTo(px - half, py + half)
        g.closePath()
        g.fill()
      }
    }

    function draw() {
      ctx.globalCompositeOperation = "source-over"
      ctx.globalAlpha = 1
      ctx.fillStyle = "#000"
      ctx.fillRect(0, 0, width, height)
      ctx.fillStyle = "#fff"

      bctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      bctx.clearRect(0, 0, width, height)
      bctx.fillStyle = "#fff"

      const fz = t * 0.12

      for (let r = 0; r < rows; r++) {
        const py = offY + r * spacing
        // Fade in over the top only; the bottom stays solid.
        const vignette = smoothstep(0, 0.48, py / height)
        if (vignette <= 0.001) continue

        for (let c = 0; c < cols; c++) {
          const px = offX + c * spacing
          const idx = r * cols + c

          // Resting shape from the animated fbm field → soft camouflage blobs.
          const f = fbm(px * NF + SEEDX, py * NF + SEEDY, fz)
          const d = clamp((f * 0.5 + 0.5 - 0.48) * 3 + 0.5, 0, 0.999)
          const resting = RESTING[(d * 3) | 0]

          const q = charge[idx]
          const shape = (resting + (q < 0.999 ? (q * 3) | 0 : 2)) % 3

          const gray = GRAY[q < 0.25 ? 0 : q < 0.5 ? 1 : q < 0.75 ? 2 : 3]
          const alpha = gray * vignette * 0.8 // overall dim → darker field
          if (alpha < 0.01) continue

          ctx.globalAlpha = alpha > 1 ? 1 : alpha
          shapePath(ctx, shape, px, py)

          // Bright-pass for bloom (soft threshold knee).
          if (gray > BLOOM_THRESHOLD) {
            bctx.globalAlpha =
              clamp((gray - BLOOM_THRESHOLD) / (1 - BLOOM_THRESHOLD), 0, 1) *
              vignette
            shapePath(bctx, shape, px, py)
          }
        }
      }

      // Bloom: blur the bright pass and add it back — kept subtle.
      ctx.save()
      ctx.globalCompositeOperation = "lighter"
      ctx.filter = `blur(${BLOOM_BLUR}px)`
      ctx.globalAlpha = 0.55
      ctx.drawImage(bloomCanvas, 0, 0, width, height)
      ctx.restore()
    }

    function frame() {
      if (!running) return
      t += 0.016
      if (pointer.active)
        for (let i = 0; i < orbs.length; i++) stepOrb(orbs[i], i)
      updateCharge(1 / 60)
      draw()
      raf = requestAnimationFrame(frame)
    }

    function start() {
      if (reduceMotion) {
        draw()
        return
      }
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(frame)
    }

    const onMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
      pointer.active = true
    }
    const onLeave = () => {
      pointer.active = false
    }
    container.addEventListener("pointermove", onMove)
    container.addEventListener("pointerleave", onLeave)

    const ro = new ResizeObserver(() => resize())
    ro.observe(container)

    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting
        if (running) start()
        else cancelAnimationFrame(raf)
      },
      { threshold: 0 },
    )
    io.observe(container)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      container.removeEventListener("pointermove", onMove)
      container.removeEventListener("pointerleave", onLeave)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={cn(
        "relative aspect-[1600/600] w-full touch-none overflow-hidden bg-black select-none",
        className,
      )}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  )
}
