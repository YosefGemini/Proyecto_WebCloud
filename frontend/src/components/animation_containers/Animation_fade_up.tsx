



interface AnimationLeftProps {
  children: React.ReactNode;
}
import  '../../styles/fade.css';

import React, { useEffect, useRef } from 'react';

export default function AnimationUpComponent({ children }: AnimationLeftProps): React.ReactElement{

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Realiza la animación cuando el contenedor entra en el campo de visión
            
            container.classList.add('animation_up_show');
            container.classList.remove('animation_up_hide');
            // observer.unobserve(container);
          }
          else {
            // Realiza la animación cuando el contenedor sale del campo de visión
            container.classList.add('animation_up_hide');
            container.classList.remove('animation_up_show');
            }
        });
      });

      observer.observe(container);

      return () => {
        observer.unobserve(container);
      };
    }
  }, []);

  return (
    <div className="w-full" ref={containerRef}>
      {children}
    </div>
  );
};
