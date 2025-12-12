// Add React Three Fiber types to JSX namespace
import type { ThreeElements } from '@react-three/fiber'

declare global {
    namespace JSX {
        interface IntrinsicElements extends ThreeElements { }
    }
}
