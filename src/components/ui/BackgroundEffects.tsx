import { useMemo } from 'react'
import Particles from '@tsparticles/react'
import type { ISourceOptions } from '@tsparticles/engine'
import AuroraBackground from './AuroraBackground'

function BackgroundEffects() {
  const options = useMemo<ISourceOptions>(
    () => ({
      fullScreen: {
        enable: false,
      },

      background: {
        color: {
          value: 'transparent',
        },
      },

      fpsLimit: 45,
      detectRetina: true,

      particles: {
        number: {
          value: 45,
          density: {
            enable: true,
          },
        },

        color: {
          value: ['#f97316', '#ea580c', '#fdba74'],
        },

        shape: {
          type: 'circle',
        },

        opacity: {
          value: {
            min: 0.08,
            max: 0.35,
          },
          animation: {
            enable: true,
            speed: 0.5,
            minimumValue: 0.08,
            sync: false,
          },
        },

        size: {
          value: {
            min: 1,
            max: 2.5,
          },
        },

        links: {
          enable: true,
          distance: 145,
          color: '#f97316',
          opacity: 0.13,
          width: 1,
        },

        move: {
          enable: true,
          speed: 0.45,
          direction: 'none',
          random: true,
          straight: false,
          outModes: {
            default: 'out',
          },
        },
      },

      interactivity: {
        detectsOn: 'window',

        events: {
          onHover: {
            enable: true,
            mode: 'grab',
          },

          onClick: {
            enable: false,
          },
        },

        modes: {
          grab: {
            distance: 150,
            links: {
              opacity: 0.3,
            },
          },
        },
      },

      pauseOnBlur: true,
      pauseOnOutsideViewport: true,
    }),
    [],
  )

  
    return (
    <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
        {/* Interactive Aurora */}
        <AuroraBackground />

        {/* Connected particles */}
        <Particles
        id="portfolio-particles"
        className="absolute inset-0 z-10 size-full"
        options={options}
        />
    </div>
    )
}

export default BackgroundEffects