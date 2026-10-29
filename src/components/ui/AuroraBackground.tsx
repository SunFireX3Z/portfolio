import { useEffect, useRef } from 'react'

const vertexShader = `
  attribute vec2 a_position;

  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`

const fragmentShader = `
  precision highp float;

  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec2 u_mouse;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);

    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }

  
    void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    float aspect = u_resolution.x / u_resolution.y;

    vec2 p = vec2(uv.x * aspect, uv.y);
    vec2 mouse = vec2(u_mouse.x * aspect, u_mouse.y);

    float t = u_time * 0.12;

    // Respons mouse dibuat lebih terasa di sekitar kursor.
    float mouseInfluence =
        exp(-length(p - mouse) * 3.0);

    float n1 = noise(vec2(
        uv.x * 2.5 + t,
        uv.y * 3.0 - t
    ));

    float n2 = noise(vec2(
        uv.x * 4.0 - t * 0.7,
        uv.y * 2.0 + t
    ));

    float mouseDisplacement =
        (mouse.y - uv.y) * mouseInfluence * 0.18;

    float wave1 =
        0.56
        + 0.10 * sin(uv.x * 5.0 + t)
        + 0.07 * sin(uv.x * 9.0 - t * 1.3)
        + (n1 - 0.5) * 0.18
        + mouseDisplacement;

    float wave2 =
        0.40
        + 0.09 * sin(uv.x * 4.0 - t * 0.8 + 1.8)
        + 0.06 * sin(uv.x * 8.0 + t)
        + (n2 - 0.5) * 0.14
        + mouseDisplacement * 0.7;

    float band1 =
        exp(-pow((uv.y - wave1) * 9.0, 2.0));

    float band2 =
        exp(-pow((uv.y - wave2) * 11.0, 2.0));

    float fade =
        smoothstep(0.0, 0.18, uv.x)
        * (1.0 - smoothstep(0.82, 1.0, uv.x));

    float variation = 0.7 + 0.3 * n1;

    vec3 orange = vec3(0.98, 0.32, 0.07);
    vec3 red = vec3(0.72, 0.08, 0.10);
    vec3 amber = vec3(1.0, 0.55, 0.20);

    vec3 color = mix(orange, red, uv.x * 0.7);
    color = mix(color, amber, band2 * 0.3);

    float intensity =
        (band1 * 0.65 + band2 * 0.45) * variation * fade;

    float alpha = intensity * 0.35;

    gl_FragColor = vec4(color, alpha);
    }
`

function createShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
) {
  const shader = gl.createShader(type)

  if (!shader) return null

  gl.shaderSource(shader, source)
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Aurora shader error:', gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }

  return shader
}

function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: false,
      powerPreference: 'low-power',
    })

    if (!gl) return

    const vertex = createShader(gl, gl.VERTEX_SHADER, vertexShader)
    const fragment = createShader(gl, gl.FRAGMENT_SHADER, fragmentShader)

    if (!vertex || !fragment) {
      if (vertex) gl.deleteShader(vertex)
      if (fragment) gl.deleteShader(fragment)
      return
    }

    const program = gl.createProgram()

    if (!program) {
      gl.deleteShader(vertex)
      gl.deleteShader(fragment)
      return
    }

    gl.attachShader(program, vertex)
    gl.attachShader(program, fragment)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Aurora program error:', gl.getProgramInfoLog(program))
      gl.deleteProgram(program)
      gl.deleteShader(vertex)
      gl.deleteShader(fragment)
      return
    }

    gl.useProgram(program)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

    const buffer = gl.createBuffer()

    if (!buffer) {
      gl.deleteProgram(program)
      gl.deleteShader(vertex)
      gl.deleteShader(fragment)
      return
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    )

    const position = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution')
    const timeLocation = gl.getUniformLocation(program, 'u_time')
    const mouseLocation = gl.getUniformLocation(program, 'u_mouse')

    let frameId = 0
    let startTime = performance.now()
    let mouseX = 0.5
    let mouseY = 0.5
    let targetMouseX = 0.5
    let targetMouseY = 0.5
    let active = true

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      const width = Math.max(1, Math.floor(canvas.clientWidth * dpr))
      const height = Math.max(1, Math.floor(canvas.clientHeight * dpr))

      canvas.width = width
      canvas.height = height

      gl.viewport(0, 0, width, height)
      gl.uniform2f(resolutionLocation, width, height)
    }

    const onPointerMove = (event: PointerEvent) => {
      targetMouseX = event.clientX / window.innerWidth
      targetMouseY = 1 - event.clientY / window.innerHeight
    }

    const onVisibilityChange = () => {
      active = !document.hidden

      if (active) {
        startTime = performance.now()
        frameId = window.requestAnimationFrame(render)
      } else {
        window.cancelAnimationFrame(frameId)
      }
    }

    const render = (now: number) => {
      if (!active) return

      const reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

      const time = reducedMotion ? 0 : (now - startTime) / 1000

      mouseX += (targetMouseX - mouseX) * 0.025
      mouseY += (targetMouseY - mouseY) * 0.025

      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)

      gl.uniform1f(timeLocation, time)
      gl.uniform2f(mouseLocation, mouseX, mouseY)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

      frameId = window.requestAnimationFrame(render)
    }

    resize()

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.addEventListener('visibilitychange', onVisibilityChange)

    if (!document.hidden) {
      frameId = window.requestAnimationFrame(render)
    } else {
      active = false
    }

    return () => {
      active = false
      window.cancelAnimationFrame(frameId)
      resizeObserver.disconnect()

      window.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('visibilitychange', onVisibilityChange)

      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
      gl.deleteShader(vertex)
      gl.deleteShader(fragment)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 size-full"
    />
  )
}

export default AuroraBackground