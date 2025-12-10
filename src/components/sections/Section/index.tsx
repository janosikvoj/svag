import { slugify } from '@/lib/utils';
import React from 'react';

type SectionProps = {
  children: React.ReactNode;
  title: string;
  description: string;
};

const Section: React.FC<SectionProps> = ({ children, title, description }) => {
  const sectionId = title ? slugify(title) : undefined;
  return (
    <section className="mt-18 bg-muted p-3 py-6">
      <hgroup
        className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-3"
        id={sectionId}
      >
        <a href={`#${sectionId}`} className="size-fit">
          <h2 className="w-fit font-pixel text-6xl leading-[0.8]">
            {title.split(' ')[0]}
            <span className="w-fit font-sans font-medium text-5xl">
              {' '}
              {title.split(' ').slice(1).join(' ')}
            </span>
          </h2>
        </a>
        {description && <p className="max-w-xs text-pretty">{description}</p>}
      </hgroup>
      {children}
    </section>
  );
};

export default Section;
