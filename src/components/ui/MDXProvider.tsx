import type { ReactNode } from 'react'
import { MDXProvider as BaseMDXProvider } from '@mdx-js/react'
import ProjectImage from './ProjectImage'

const components = {
  ProjectImage,
}

type MDXProviderProps = {
  children: ReactNode
}

function MDXProvider({ children }: MDXProviderProps) {
  return (
    <BaseMDXProvider components={components}>
      {children}
    </BaseMDXProvider>
  )
}

export default MDXProvider