"use client";

import { Star } from "lucide-react";

interface TestimonialSectionProps {
  className?: string;
}

interface Testimonial {
  name: string;
  location: string;
  avatar: string;
  text: string;
  rating: number;
}

export const TestimonialSection = ({
  className = "",
}: TestimonialSectionProps) => {
  const testimonial: Testimonial = {
    name: "Professora Ana Silva",
    location: "Escola Municipal de São Paulo",
    avatar: "👩‍🏫",
    text: "O TechApoio revolucionou nossas aulas! As crianças ficam empolgadas com os jogos educativos e eu consigo acompanhar o progresso de cada aluno facilmente. A plataforma funciona perfeitamente nos tablets da escola!",
    rating: 5,
  };

  return (
    <section id="depoimentos" className={`section-spacing ${className}`}>
      <div className="container-logiclike">
        <div className="section-header">
          <h2 className="section-title">
            O que os professores estão falando! 👨‍🏫💜
          </h2>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="card">
            <div className="card-content text-center p-10">
              <div className="text-5xl mb-5">{testimonial.avatar}</div>

              <div className="flex justify-center mb-5">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={`star-rating-${testimonial.name}-${i}`}
                    className="w-5 h-5 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>

              <p className="text-lg text-gray-600 italic mb-5 leading-relaxed">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              <div>
                <div className="font-semibold text-gray-900">
                  {testimonial.name}
                </div>
                <div className="text-gray-500 text-sm">
                  {testimonial.location}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
