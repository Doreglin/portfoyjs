export const ProjectsSection = ({ title, subtitle, bgColor, textColor, height, items }, isPreview) => `
  <div style="background-color: ${bgColor}; color: ${textColor}; min-height: ${height}px;" class="flex flex-col justify-center transition-all duration-300 relative border-b border-black ${!isPreview ? 'rounded-lg shadow-inner' : ''} w-full p-8">
    <h2 class="text-3xl md:text-5xl font-bold text-center mb-4">${title}</h2>
    <p class="text-center mb-12 opacity-80 text-lg">${subtitle}</p>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto w-full">
      ${items.map(p => `
        <div class="bg-blue-500 rounded-lg overflow-hidden transition-all border border-black/50 flex flex-col ${isPreview ? 'hover:-translate-y-10 hover:-translate-x-7' : ''}">
          <img src="${p.img}" alt="${p.name}" class="w-full h-48 md:h-60 object-cover bg-gray-200" />
          <div class="p-6 flex-1 flex flex-col">
            <h3 class="font-bold text-xl mb-3 text-inherit">${p.name}</h3>
            <p class="text-sm opacity-80 mb-6 flex-1 text-inherit leading-relaxed">${p.desc}</p>
            <button class="text-sm font-bold bg-indigo-500 text-white px-4 py-3 rounded hover:bg-indigo-600 transition-colors shadow hover:shadow-lg w-full cursor-pointer">Detayları İncele</button>
          </div>
        </div>
      `).join('')}
    </div>
  </div>
`;