import { Html } from '@react-three/drei';

export const Loader = () => {
  return (
    <Html>
      <div className='absolute top-0 left-0 flex h-full w-full items-center justify-center'>
        <div className='size-[10vw] rounded-full'>Loading...</div>
      </div>
    </Html>
  );
};
