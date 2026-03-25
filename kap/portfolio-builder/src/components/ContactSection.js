export const ContactSection = ({ title, subtitle, bgColor, textColor, height }, isPreview) => `
  <div style="background-color: ${bgColor}; color: ${textColor}; min-height: ${height}px;" class="flex flex-col justify-center items-center text-center transition-all duration-300 relative ${!isPreview ? 'rounded-lg shadow-inner' : ''} w-full p-8">
    <h2 class="text-3xl md:text-5xl font-bold mb-4">${title}</h2>
    <p class="text-lg md:text-xl mb-10 opacity-90">${subtitle}</p>
    
    <form onsubmit="event.preventDefault(); alert('İletişim talebi alındı!');" class="w-full max-w-lg mx-auto flex flex-col gap-5 bg-blue-500 p-8 rounded-2xl backdrop-blur-sm border border-black/10 shadow-xl shadow-blue-500 ${!isPreview ? 'pointer-events-none' : 'pointer-events-auto'}">
      <div class="text-left transition-all hover:-translate-y-1.5">
        <label class="block text-sm font-semibold mb-1 opacity-80 text-inherit">İsim Soyisim</label>
        <input type="text" required placeholder="Adınız" class="w-full px-4 py-3 rounded-lg bg-white text-gray-900 border-none shadow-inner outline-none focus:ring-2 focus:ring-indigo-500">
      </div>
      <div class="text-left transition-all hover:-translate-y-1.5">
        <label class="block text-sm font-semibold mb-1 opacity-80 text-inherit">E-posta Adresi</label>
        <input type="email" required placeholder="ornek@mail.com" class="w-full px-4 py-3 rounded-lg bg-white text-gray-900 border-none shadow-inner outline-none focus:ring-2 focus:ring-indigo-500">
      </div>
      <div class="text-left transition-all hover:-translate-y-1.5">
        <label class="block text-sm font-semibold mb-1 opacity-80 text-inherit">Mesaj / Bilgi İletişimi</label>
        <textarea required placeholder="Mesajınızı buraya yazın..." rows="4" class="w-full px-4 py-3 rounded-lg bg-white text-gray-900 resize-none border-none shadow-inner outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
      </div>
      <button type="submit" class="mt-4 bg-indigo-600 text-white px-6 py-4 rounded-lg font-bold shadow-lg hover:bg-indigo-700 hover:scale-[1.02] transition-all hover:-translate-y-1.5 cursor-pointer">Mesajı Gönder</button>
    </form>
  </div>
`;