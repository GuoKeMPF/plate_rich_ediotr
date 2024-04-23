import { PlateEditor } from '@/components/editor';

// import dynamic from 'next/dynamic';
// const { PlateEditor } = dynamic(() => import('@/components/editor'));

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex w-full flex-col gap-4">
        <PlateEditor initialHtml="<p>hello word</p>" />
      </div>
    </section>
  );
}
