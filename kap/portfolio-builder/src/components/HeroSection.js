export const HeroSection = ({ title, subtitle, bgColor, textColor, height }, isPreview) => `
  <div style="background-color: ${bgColor}; color: ${textColor}; min-height: ${height}px;" class="flex flex-col justify-center items-center text-center transition-all duration-300 relative ${!isPreview ? 'rounded-lg shadow-inner' : ''} w-full p-8">
    <h1 class="text-5xl md:text-7xl font-extrabold mb-6 drop-shadow-md">${title}</h1>
    <p class="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">${subtitle}</p>
    ${isPreview ? '<button class="mt-8 px-8 py-3 bg-white text-gray-900 rounded-full font-bold shadow-lg hover:scale-125 transition-transform pointer-events-auto cursor-pointer">Projelerimi Keşfet</button>' : ''}
  </div>
`;