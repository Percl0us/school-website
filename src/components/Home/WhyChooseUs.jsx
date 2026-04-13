import { BookOpen, Smile } from "lucide-react";
import { RevealOnScroll } from "../shared/RevealOnScroll";
import usp from "../../data/usp";

export const WhyChooseUs = () => {
  return (
    <section className="py-16 sm:py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <RevealOnScroll>
          <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-20 py-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-100 to-purple-100 px-4 py-2 mb-4">
              <Smile size={14} className="text-pink-600" />
              <span className="font-dyna text-lg sm:text-xl font-bold uppercase tracking-wider text-pink-700">
                Why We're Awesome
              </span>
            </div>
            <h2 className="p-3 font-henny mb-4 pb-3 text-3xl font-bold tracking-tight leading-[1.3] bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent sm:text-4xl md:text-5xl">
              Why Choose Us ?
            </h2>
            <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 sm:w-24" />
            <p className="font-dyna mt-4 text-lg sm:text-xl text-gray-600 pb-1">
              Where excellence meets compassion
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid gap-6 sm:gap-10 md:grid-cols-2">
          {usp.map((item, index) => (
            <RevealOnScroll key={item.id} delay={`${index * 200}ms`}>
              <div className="group relative rounded-2xl border border-transparent bg-white p-6 transition-all duration-500 hover:scale-[1.02] hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100/50 sm:rounded-[2.5rem] sm:p-8 md:p-10">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 transition-opacity duration-500 group-hover:opacity-100 sm:rounded-[2.5rem]" />
                <div className="relative z-10">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-md transition-all group-hover:rotate-6 group-hover:scale-110 sm:mb-8 sm:h-16 sm:w-16 sm:rounded-2xl">
                    <BookOpen size={24} />
                  </div>
                  <h3 className="font-dyna mb-2 text-xl font-bold text-gray-900 sm:mb-4 sm:text-2xl md:text-3xl pb-1">
                    {item.title}
                  </h3>
                  <p className="font-indie text-base leading-relaxed pb-1 text-gray-600 sm:text-lg md:text-xl lg:text-2xl">
                    {item.description}
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};