import { HeroSection } from './components/HeroSection.js';
import { AboutSection } from './components/AboutSection.js';
import { ProjectsSection } from './components/ProjectsSection.js';
import { ContactSection } from './components/ContactSection.js';

const Components = {
  hero: HeroSection,
  about: AboutSection,
  projects: ProjectsSection,
  contact: ContactSection
};

let state = {
  sections: JSON.parse(localStorage.getItem('vanillaCanvasData')) || [],
  selectedId: null,
  isPreview: false,
  draggedIndex: null,
  dragOffsetX: 0, 
  dragOffsetY: 0 
};

const appContainer = document.getElementById('app');
appContainer.innerHTML = `
  <header class="h-16 bg-white border-b flex items-center justify-between px-6 shadow-sm z-20">
    <h1 class="text-xl font-bold text-gray-600 tracking-tight">Portfolio Canvas Builder</h1>
    <div class="flex gap-3">
      <button id="btn-clear" class="px-4 py-2 text-sm font-medium text-red-600 bg-red-100 hover:bg-red-200 hover:text-red-800 rounded transition-colors transition-all hover:-translate-y-1 hover:-translate-x-1">Kanvası Temizle</button>
      <button id="btn-preview" class="px-6 py-2 rounded text-sm font-bold bg-indigo-600 text-white hover:bg-indigo-700 hover:text-green-100 transition-all hover:-translate-y-1 hover:-translate-x-1">Preview Modu</button>
    </div>
  </header>
  <div class="flex-1 flex overflow-hidden">
    <aside id="left-panel" class="w-64 bg-white border-r flex flex-col z-10 shadow-sm p-4"></aside>
    <main id="middle-panel" class="flex-1 overflow-y-auto overflow-x-hidden bg-gray-100 p-8 relative scroll-smooth"></main>
    <aside id="right-panel" class="w-80 bg-white border-l p-5 overflow-y-auto shadow-sm z-10"></aside>
  </div>
`;

const leftPanel = document.getElementById('left-panel');
const middlePanel = document.getElementById('middle-panel');
const rightPanel = document.getElementById('right-panel');
const btnPreview = document.getElementById('btn-preview');
const btnClear = document.getElementById('btn-clear');

// padding yerine height (yükseklik) değeri kullanılıyor
const defaultData = {
  hero: { title: 'Portfolyoma Hoş Geldiniz', subtitle: 'Kreatif tasarımlar.', bgColor: '#1e293b', textColor: '#ffffff', height: 600, width: 800, x: 0, y: 0 },
  about: { title: 'Hakkımda', subtitle: 'Kendinizi tanıtın...', bgColor: '#6c88c2', textColor: '#1f2937', height: 400, width: 800, x: 0, y: 0 },
  projects: { 
    title: 'Projelerim', subtitle: 'Çalışmalarım', bgColor: '#6c88c2', textColor: '#1f2937', height: 750, width: 1000, x: 0, y: 0,
    items: [
      { name: 'Oyun', desc: 'Javascript Oyunu.', img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400' },
      { name: 'Blog', desc: 'Blog Arayüzü.', img: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400' },
      { name: 'E-Ticaret', desc: 'Tam donanımlı platform.', img: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400' }
    ]
  },
  contact: { title: 'İletişim', subtitle: 'Formu doldurun', bgColor: '#6c88c2', textColor: '#ffffff', height: 650, width: 600, x: 0, y: 0 }
};

function saveState() {
  localStorage.setItem('vanillaCanvasData', JSON.stringify(state.sections));
}

window.addSectionToCanvas = function(type, clientX, clientY) {
  const containerRect = middlePanel.querySelector('#canvas-zone').getBoundingClientRect();
  const defWidth = defaultData[type].width;
  const x = clientX - containerRect.left - (defWidth / 2);
  const y = clientY - containerRect.top - 50; 

  const newSection = { id: Date.now(), type, ...JSON.parse(JSON.stringify(defaultData[type])), x, y };
  state.sections.push(newSection);
  saveState();
  renderMiddlePanel();
  selectSection(newSection.id);
};

window.removeSection = function(id, event) {
  event.stopPropagation();
  state.sections = state.sections.filter(s => s.id !== id);
  if (state.selectedId === id) {
    state.selectedId = null;
    renderRightPanel();
  }
  saveState();
  renderMiddlePanel();
};

window.selectSection = function(id) {
  if (state.isPreview) return;
  state.selectedId = id;
  renderMiddlePanel();
  renderRightPanel();
};

function updateSection(key, value) {
  const section = state.sections.find(s => s.id === state.selectedId);
  if (section) {
    section[key] = (key === 'width' || key === 'height') ? parseInt(value) : value;
    saveState();
    renderMiddlePanel();
  }
}

window.updateProjectItem = function(index, key, value) {
  const section = state.sections.find(s => s.id === state.selectedId);
  if (section && section.type === 'projects') {
    section.items[index][key] = value;
    saveState();
    renderMiddlePanel();
  }
};

function renderLeftPanel() {
  leftPanel.innerHTML = '<h2 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 border-b pb-2">Bileşenleri Tuvale Sürükle</h2>';
  ['hero', 'about', 'projects', 'contact'].forEach(type => {
    leftPanel.innerHTML += `
      <div draggable="true" ondragstart="event.dataTransfer.setData('source', 'leftPanel'); event.dataTransfer.setData('type', '${type}');" class="flex items-center justify-between px-4 py-3 bg-gray-50 border border-gray-200 hover:border-indigo-400 rounded-lg text-sm text-gray-700 font-medium cursor-grab active:cursor-grabbing mb-3 shadow-sm hover:shadow transition-all capitalize group hover:-translate-y-1">
        <span>${type}</span>
        <span class="text-gray-400 text-lg group-hover:text-indigo-500">≡</span>
      </div>
    `;
  });
}

function renderMiddlePanel() {
  middlePanel.innerHTML = '';
  const container = document.createElement('div');
  container.id = "canvas-zone";
  
  let maxBottom = 800;
  state.sections.forEach(s => {
    const estimatedBottom = s.y + s.height + 200; // Yüksekliği hesaba kat
    if (estimatedBottom > maxBottom) maxBottom = estimatedBottom;
  });

  container.className = state.isPreview 
    ? 'w-full bg-white flex flex-col' 
    : 'max-w-6xl mx-auto bg-white shadow-xl rounded-md border-2 border-dashed border-gray-300 transition-colors relative';
  
  if (!state.isPreview) {
    container.style.minHeight = `${maxBottom}px`; 
  }

  container.addEventListener('dragover', e => { e.preventDefault(); container.classList.add('border-indigo-500', 'bg-indigo-50/20'); });
  container.addEventListener('dragleave', () => container.classList.remove('border-indigo-500', 'bg-indigo-50/20'));
  container.addEventListener('drop', e => {
    e.preventDefault();
    container.classList.remove('border-indigo-500', 'bg-indigo-50/20');
    if (e.dataTransfer.getData('source') === 'leftPanel') {
      addSectionToCanvas(e.dataTransfer.getData('type'), e.clientX, e.clientY);
    }
  });

  if (state.sections.length === 0) {
    container.innerHTML += '<div class="h-full w-full absolute top-0 left-0 flex flex-col items-center justify-center p-20 text-gray-400 pointer-events-none "><div class="text-6xl mb-4">📥</div>Bileşenleri buraya sürükleyip bırakarak sayfanızı oluşturun.</div>';
  }

  const sectionsToRender = state.isPreview 
    ? [...state.sections].sort((a, b) => a.y - b.y) 
    : state.sections;

  sectionsToRender.forEach((section, index) => {
    const wrapper = document.createElement('div');
    const isSelected = state.selectedId === section.id && !state.isPreview;
    
    if (state.isPreview) {
      wrapper.style.position = "relative";
      wrapper.style.width = "100%";
      wrapper.style.left = "0";
      wrapper.style.top = "0";
    } else {
      wrapper.style.position = "absolute";
      wrapper.style.width = `${section.width}px`;
      wrapper.style.left = `${section.x}px`;
      wrapper.style.top = `${section.y}px`;
      wrapper.style.cursor = 'move';
    }

    wrapper.className = `transition-all ${!state.isPreview && isSelected ? 'border-4 border-indigo-500 z-10 shadow-2xl scale-[1.01]' : !state.isPreview ? 'border-4 border-transparent hover:border-indigo-200' : ''} group`;
    
    let innerHTML = Components[section.type](section, state.isPreview);
    
    if (!state.isPreview) {
      innerHTML += `<button onclick="removeSection(${section.id}, event)" class="absolute -top-3 -right-3 bg-red-500 text-white w-8 h-8 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-30 shadow-lg hover:bg-red-600 hover:scale-110">✕</button>`;
      
      wrapper.draggable = true;
      wrapper.addEventListener('dragstart', (e) => { 
        e.stopPropagation();
        state.draggedIndex = state.sections.findIndex(s => s.id === section.id); 
        const rect = wrapper.getBoundingClientRect();
        state.dragOffsetX = e.clientX - rect.left;
        state.dragOffsetY = e.clientY - rect.top;
        e.dataTransfer.setData('source', 'canvasMove');
        setTimeout(() => wrapper.classList.add('opacity-40'), 0);
      });
      
      wrapper.addEventListener('dragend', (e) => {
        wrapper.classList.remove('opacity-40');
        const containerRect = container.getBoundingClientRect();
        const newX = e.clientX - containerRect.left - state.dragOffsetX;
        const newY = e.clientY - containerRect.top - state.dragOffsetY;
        updateSectionPosition(state.draggedIndex, newX, newY);
      });
    }

    wrapper.innerHTML = innerHTML;
    wrapper.onclick = () => selectSection(section.id);
    container.appendChild(wrapper);
  });

  middlePanel.appendChild(container);
}

function updateSectionPosition(index, x, y) {
  state.sections[index].x = Math.max(0, x);
  state.sections[index].y = Math.max(0, y);
  saveState();
  renderMiddlePanel();
}

function renderRightPanel() {
  const section = state.sections.find(s => s.id === state.selectedId);
  if (!section) {
    rightPanel.innerHTML = '<div class="text-center text-gray-800 mt-20 text-sm flex flex-col items-center"><div class="text-6xl mb-4">🎨</div>Düzenlemek için bir bileşen seçin.</div>';
    return;
  }

  let panelHTML = `
    <h2 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-5 border-b pb-2">Bölüm Ayarları</h2>
    <div class="space-y-4">
      <div class="inline-block bg-indigo-100 text-indigo-800 text-xs font-bold px-2 py-1 rounded capitalize mb-2">${section.type}</div>
      
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-1">Başlık</label>
        <input id="set-title" type="text" value="${section.title}" class="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 shadow-inner">
      </div>
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-1">Metin / İçerik</label>
        <textarea id="set-subtitle" class="w-full border rounded px-3 py-2 text-sm h-24 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 shadow-inner">${section.subtitle}</textarea>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1">Arka Plan</label>
          <input id="set-bgcolor" type="color" value="${section.bgColor}" class="w-full h-10 border rounded cursor-pointer shadow-sm">
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1">Yazı Rengi</label>
          <input id="set-textcolor" type="color" value="${section.textColor}" class="w-full h-10 border rounded cursor-pointer shadow-sm">
        </div>
      </div>

      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-1 flex justify-between">
          <span>Genişlik (Sadece Kanvas)</span> <span class="text-indigo-600 font-bold">${section.width}px</span>
        </label>
        <input id="set-width" type="range" min="300" max="1100" step="10" value="${section.width}" class="w-full accent-indigo-600 cursor-pointer">
      </div>

      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-1 flex justify-between">
          <span>Yükseklik (Height)</span> <span class="text-indigo-600 font-bold">${section.height}px</span>
        </label>
        <input id="set-height" type="range" min="200" max="1200" step="10" value="${section.height}" class="w-full accent-indigo-600 cursor-pointer">
      </div>
  `;

  if (section.type === 'projects') {
    panelHTML += `
      <div class="mt-6 border-t pt-4">
        <h3 class="text-sm font-bold text-gray-600 mb-3 uppercase tracking-wide">Projeleri Düzenle</h3>
        ${section.items.map((item, i) => `
          <div class="mb-5 bg-gray-50 p-4 rounded-md shadow-inner border border-gray-200">
            <label class="block text-xs font-semibold text-indigo-700 mb-1">Proje ${i+1} Görsel URL</label>
            <input type="text" value="${item.img}" onchange="updateProjectItem(${i}, 'img', this.value)" placeholder="https://..." class="w-full border rounded px-2 py-2 text-xs focus:ring-indigo-500 bg-white shadow-sm mb-3">
            
            <label class="block text-xs font-semibold text-indigo-700 mb-1">Proje ${i+1} Başlık</label>
            <input type="text" value="${item.name}" onchange="updateProjectItem(${i}, 'name', this.value)" class="w-full border rounded px-2 py-2 text-xs focus:ring-indigo-500 bg-white shadow-sm mb-3">

            <label class="block text-xs font-semibold text-indigo-700 mb-1">Proje ${i+1} Açıklama</label>
            <textarea onchange="updateProjectItem(${i}, 'desc', this.value)" rows="2" class="w-full border rounded px-2 py-2 text-xs focus:ring-indigo-500 bg-white shadow-sm resize-none">${item.desc}</textarea>
          </div>
        `).join('')}
      </div>
    `;
  }

  panelHTML += `</div>`;
  rightPanel.innerHTML = panelHTML;

  document.getElementById('set-title').addEventListener('input', (e) => updateSection('title', e.target.value));
  document.getElementById('set-subtitle').addEventListener('input', (e) => updateSection('subtitle', e.target.value));
  document.getElementById('set-bgcolor').addEventListener('input', (e) => updateSection('bgColor', e.target.value));
  document.getElementById('set-textcolor').addEventListener('input', (e) => updateSection('textColor', e.target.value));
  document.getElementById('set-width').addEventListener('input', (e) => {
    updateSection('width', e.target.value);
    e.target.previousElementSibling.querySelector('span:last-child').innerText = e.target.value + 'px';
  });
  document.getElementById('set-height').addEventListener('input', (e) => {
    updateSection('height', e.target.value);
    e.target.previousElementSibling.querySelector('span:last-child').innerText = e.target.value + 'px';
  });
}

btnPreview.onclick = () => {
  state.isPreview = !state.isPreview;
  btnPreview.textContent = state.isPreview ? 'Düzenleyiciye Dön' : 'Preview Modu';
  btnPreview.className = state.isPreview 
    ? "px-6 py-2 rounded text-sm font-bold bg-gray-800 text-white hover:bg-gray-900 transition-all shadow-sm" 
    : "px-6 py-2 rounded text-sm font-bold bg-indigo-600 text-white hover:bg-indigo-700 transition-all shadow-sm";
  
  leftPanel.style.display = state.isPreview ? 'none' : 'flex';
  rightPanel.style.display = state.isPreview ? 'none' : 'block';
  btnClear.style.display = state.isPreview ? 'none' : 'block';
  
  middlePanel.className = state.isPreview ? "flex-1 overflow-y-auto overflow-x-hidden bg-white relative scroll-smooth" : "flex-1 overflow-y-auto overflow-x-hidden bg-gray-100 p-8 relative scroll-smooth";
  
  if (!state.isPreview && state.selectedId) renderRightPanel();
  renderMiddlePanel();
};

btnClear.onclick = () => {
  if (confirm('Kanvası temizlemek istediğinize emin misiniz?')) {
    state.sections = [];
    state.selectedId = null;
    saveState();
    renderMiddlePanel();
    renderRightPanel();
  }
};

renderLeftPanel();
renderMiddlePanel();
renderRightPanel();