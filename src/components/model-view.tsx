import { IPhone } from '@/components/iphone';
import { Lights } from '@/components/lights';
import { Loader } from '@/components/loader';
import { OrbitControls, PerspectiveCamera, View } from '@react-three/drei';
import type { StaticImageData } from 'next/image';
import { Suspense, type RefObject } from 'react';
import * as THREE from 'three';

import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

interface ModelViewProps {
  index: number;
  groupRef: RefObject<THREE.Group>;
  gsapType: string;
  controlRef: RefObject<OrbitControlsImpl | null>;
  setRotationState: (rotation: number) => void;
  item: {
    title: string;
    color: string[];
    img: StaticImageData;
  };
  size: string;
}

export const ModelView = ({
  index,
  groupRef,
  gsapType,
  controlRef,
  setRotationState,
  item,
  size,
}: ModelViewProps) => {
  return (
    <View
      index={index}
      id={gsapType}
      className={`absolute h-full w-full ${index === 2 ? 'right-[-100%]' : ''}`}
    >
      <ambientLight intensity={0.3} />

      <PerspectiveCamera makeDefault position={[0, 0, 4]} />

      <Lights />

      <OrbitControls
        ref={controlRef}
        makeDefault
        enablePan={false}
        enableZoom={false}
        rotateSpeed={0.4}
        target={new THREE.Vector3(0, 0, 0)}
        onEnd={() => {
          setRotationState(controlRef.current?.getAzimuthalAngle() || 0);
        }}
      />

      <group
        ref={groupRef}
        name={index === 1 ? 'small' : 'large'}
        position={[0, 0, 0]}
      >
        <Suspense fallback={<Loader />}>
          <IPhone
            scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
            item={item}
            size={size}
          />
        </Suspense>
      </group>
    </View>
  );
};
