import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative h-[60vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/RrdZqh3j7CkH7lVf/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-neutral-950" />
      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-end px-4 pb-10 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">ChainFolio</h1>
          <p className="mt-2 max-w-2xl text-white/80">Register, license, and showcase your creative works with on-chain provenance.</p>
        </div>
      </div>
    </section>
  );
}
