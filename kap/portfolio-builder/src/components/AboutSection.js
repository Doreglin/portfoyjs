export const AboutSection = ({ title, subtitle, bgColor, textColor, height }, isPreview) => `
  <div style="background-color: ${bgColor}; color: ${textColor}; min-height: ${height}px;" class="flex flex-col justify-center items-center text-center transition-all duration-300 relative ${!isPreview ? 'rounded-lg shadow-inner' : ''} w-full p-8 border-b border-black">
    <h2 class="text-3xl md:text-5xl font-bold mb-8">${title}</h2>
    <p class="max-w-4xl mx-auto text-lg md:text-xl leading-relaxed whitespace-pre-wrap">${subtitle}</p>
  </div>
`;