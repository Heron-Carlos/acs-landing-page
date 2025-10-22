import React, { useState, useEffect } from 'react';
import './App.css';

interface GalleryImage {
  src: string;
  title: string;
  description: string;
}

interface Subcategory {
  name: string;
  images: GalleryImage[];
}

interface Category {
  name: string;
  icon: string;
  images?: GalleryImage[];
  subcategories?: { [key: string]: Subcategory };
}

interface GalleryData {
  [key: string]: Category;
}

// Dados da galeria organizados por categoria (fora do componente para evitar re-renders)
const galleryData: GalleryData = {
    todas: {
      name: 'Todas as Obras',
      icon: '🏭',
      images: [
        { src: '/images/IMG-20251017-WA0023.jpg', title: 'Estruturas Metálicas', description: 'Montagem de estruturas industriais' },
        { src: '/images/IMG-20251017-WA0024.jpg', title: 'Equipamentos Vibratórios', description: 'Fabricação e instalação' },
        { src: '/images/IMG-20251017-WA0025.jpg', title: 'Plantas Industriais', description: 'Montagem completa' },
        { src: '/images/IMG-20251017-WA0026.jpg', title: 'Projetos Mineração', description: 'Equipamentos especializados' },
        { src: '/images/IMG-20251017-WA0027.jpg', title: 'Manutenção Industrial', description: 'Serviços especializados' },
        { src: '/images/IMG-20251017-WA0028.jpg', title: 'Reformas', description: 'Modernização de equipamentos' },
        { src: '/images/IMG-20251017-WA0029.jpg', title: 'Estruturas Pesadas', description: 'Projetos de grande porte' },
        { src: '/images/IMG-20251017-WA0030.jpg', title: 'Instalações', description: 'Montagem e instalação' },
        { src: '/images/IMG-20251017-WA0031.jpg', title: 'Equipamentos Especiais', description: 'Soluções sob medida' }
      ]
    },
    equipamentos: {
      name: 'Equipamentos',
      icon: '⚙️',
      subcategories: {
        'alimentador-vibratorio': {
          name: 'Alimentador Vibratório',
          images: [
            { src: '/images/Equipamentos/Alimentador vibratório/Imagem do WhatsApp de 2025-10-22 à(s) 16.58.41_58fa01e6.jpg', title: 'Alimentador Vibratório', description: 'Equipamento para alimentação de materiais' },
            { src: '/images/Equipamentos/Alimentador vibratório/Imagem do WhatsApp de 2025-10-22 à(s) 16.58.48_8f5a2512.jpg', title: 'Alimentador Vibratório', description: 'Detalhes construtivos' },
            { src: '/images/Equipamentos/Alimentador vibratório/Imagem do WhatsApp de 2025-10-22 à(s) 16.58.54_8ed08b98.jpg', title: 'Alimentador Vibratório', description: 'Sistema em operação' },
            { src: '/images/Equipamentos/Alimentador vibratório 2/Imagem do WhatsApp de 2025-10-22 à(s) 17.03.19_b17c7c7e.jpg', title: 'Alimentador Vibratório', description: 'Modelo alternativo' }
          ]
        },
        'calha-vibratoria': {
          name: 'Calha Vibratória',
          images: [
            { src: '/images/Equipamentos/Calha vibratória/Imagem do WhatsApp de 2025-10-22 à(s) 17.08.06_38aa5934.jpg', title: 'Calha Vibratória', description: 'Sistema de transporte vibratório' },
            { src: '/images/Equipamentos/Calha vibratória/Imagem do WhatsApp de 2025-10-22 à(s) 17.08.24_cfaf59f9.jpg', title: 'Calha Vibratória', description: 'Detalhes da instalação' },
            { src: '/images/Equipamentos/Calha vibratória/Imagem do WhatsApp de 2025-10-22 à(s) 17.08.41_f3b09dad.jpg', title: 'Calha Vibratória', description: 'Sistema em operação' }
          ]
        },
        'equipamento-ciclone': {
          name: 'Equipamento Ciclone',
          images: [
            { src: '/images/Equipamentos/Equipamento ciclone/Imagem do WhatsApp de 2025-10-22 à(s) 16.59.36_02350fec.jpg', title: 'Ciclone', description: 'Sistema de separação ciclônica' },
            { src: '/images/Equipamentos/Equipamento ciclone/Imagem do WhatsApp de 2025-10-22 à(s) 16.59.44_b1bbe229.jpg', title: 'Ciclone', description: 'Detalhes construtivos' },
            { src: '/images/Equipamentos/Equipamento ciclone/Imagem do WhatsApp de 2025-10-22 à(s) 17.00.00_743c1924.jpg', title: 'Ciclone', description: 'Instalação completa' }
          ]
        },
        'fabricacao-cabeceira': {
          name: 'Fabricação de Cabeceira',
          images: [
            { src: '/images/Equipamentos/Fabricação de  Cabeceira/Imagem do WhatsApp de 2025-10-22 à(s) 17.04.48_d8758192.jpg', title: 'Cabeceira', description: 'Fabricação de cabeceira industrial' },
            { src: '/images/Equipamentos/Fabricação de  Cabeceira/Imagem do WhatsApp de 2025-10-22 à(s) 17.04.54_4594cf75.jpg', title: 'Cabeceira', description: 'Detalhes construtivos' },
            { src: '/images/Equipamentos/Fabricação de  Cabeceira/Imagem do WhatsApp de 2025-10-22 à(s) 17.05.01_4e454ec5.jpg', title: 'Cabeceira', description: 'Processo de fabricação' }
          ]
        },
        'tambor-acionamento': {
          name: 'Fabricação e Reforma de Tambor de Acionamento',
          images: [
            { src: '/images/Equipamentos/Fabricação e reforma de tambor de acionamento/Imagem do WhatsApp de 2025-10-22 à(s) 17.05.57_d5fb1d44.jpg', title: 'Tambor de Acionamento', description: 'Fabricação de tambor de acionamento' },
            { src: '/images/Equipamentos/Fabricação e reforma de tambor de acionamento/Imagem do WhatsApp de 2025-10-22 à(s) 17.07.20_61dccc58.jpg', title: 'Tambor de Acionamento', description: 'Reforma em andamento' },
            { src: '/images/Equipamentos/Fabricação e reforma de tambor de acionamento/Imagem do WhatsApp de 2025-10-22 à(s) 17.07.29_59dd6a9b.jpg', title: 'Tambor de Acionamento', description: 'Detalhes da reforma' }
          ]
        },
        'transportadores-correia': {
          name: 'Transportadores de Correia e Apoio',
          images: [
            { src: '/images/Equipamentos/Transportadores de correia e apoio/Imagem do WhatsApp de 2025-10-22 à(s) 17.13.11_04858f6d.jpg', title: 'Transportador de Correia', description: 'Sistema de transporte por correia' },
            { src: '/images/Equipamentos/Transportadores de correia e apoio/Imagem do WhatsApp de 2025-10-22 à(s) 17.13.33_1b587b44.jpg', title: 'Transportador de Correia', description: 'Detalhes do sistema de apoio' }
          ]
        }
      }
    },
    montagem: {
      name: 'Montagem',
      icon: '🔨',
      subcategories: {
        'muro-metalico': {
          name: 'Montagem Muro Metálico',
          images: [
            { src: '/images/Montagem/Montagem muro metálico/Imagem do WhatsApp de 2025-10-22 à(s) 15.57.16_5dc54337.jpg', title: 'Muro Metálico', description: 'Estrutura metálica de contenção' },
            { src: '/images/Montagem/Montagem muro metálico/Imagem do WhatsApp de 2025-10-22 à(s) 15.57.17_c25e7d6a.jpg', title: 'Muro Metálico', description: 'Detalhes da montagem' },
            { src: '/images/Montagem/Montagem muro metálico/IMG-20251017-WA0036.jpg', title: 'Muro Metálico', description: 'Estrutura finalizada' }
          ]
        },
        'planta-britagem': {
          name: 'Montagem Planta de Britagem',
          images: [
            { src: '/images/Montagem/Montagem planta de britagem/Imagem do WhatsApp de 2025-10-22 à(s) 16.42.27_e754b338.jpg', title: 'Planta Britagem', description: 'Sistema de britagem completo' },
            { src: '/images/Montagem/Montagem planta de britagem/Imagem do WhatsApp de 2025-10-22 à(s) 16.43.13_a7d04b46.jpg', title: 'Planta Britagem', description: 'Detalhes operacionais' }
          ]
        },
        'transportadores-correia-montagem': {
          name: 'Montagem Transportadores de Correia',
          images: [
            { src: '/images/Montagem/Transportadores de correia e apoio/Imagem do WhatsApp de 2025-10-22 à(s) 17.13.11_04858f6d.jpg', title: 'Transportador de Correia', description: 'Montagem de sistema de transporte' },
            { src: '/images/Montagem/Transportadores de correia e apoio/Imagem do WhatsApp de 2025-10-22 à(s) 17.13.33_1b587b44.jpg', title: 'Transportador de Correia', description: 'Detalhes da montagem' }
          ]
        }
      }
    },
    reformas: {
      name: 'Reformas',
      icon: '🛠️',
      subcategories: {
        'peneira-vibratoria': {
          name: 'Reforma Peneira Vibratória',
          images: [
            { src: '/images/Reformas/Reforma peneira vibratória/Imagem do WhatsApp de 2025-10-22 à(s) 17.01.47_8d5d589f.jpg', title: 'Peneira Vibratória', description: 'Reforma de peneira vibratória' },
            { src: '/images/Reformas/Reforma peneira vibratória/Imagem do WhatsApp de 2025-10-22 à(s) 17.01.58_8a4d6ded.jpg', title: 'Peneira Vibratória', description: 'Detalhes da reforma' },
            { src: '/images/Reformas/Reforma peneira vibratória/Imagem do WhatsApp de 2025-10-22 à(s) 17.02.13_433ba5c5.jpg', title: 'Peneira Vibratória', description: 'Equipamento reformado' }
          ]
        },
        'pv-8x20': {
          name: 'Reforma PV 8 X20\' 3 Decks',
          images: [
            { src: '/images/Reformas/Reforma PV 8 X20\' 3 decks/Imagem do WhatsApp de 2025-10-22 à(s) 16.47.55_74abbbe8.jpg', title: 'PV 8x20', description: 'Reforma de peneira 8x20' },
            { src: '/images/Reformas/Reforma PV 8 X20\' 3 decks/Imagem do WhatsApp de 2025-10-22 à(s) 16.47.55_f3ff647d.jpg', title: 'PV 8x20', description: 'Detalhes construtivos' },
            { src: '/images/Reformas/Reforma PV 8 X20\' 3 decks/IMG-20251022-WA0011.jpg', title: 'PV 8x20', description: 'Sistema em operação' },
            { src: '/images/Reformas/Reforma PV 8 X20\' 3 decks/IMG-20251022-WA0012.jpg', title: 'PV 8x20', description: 'Instalação completa' },
            { src: '/images/Reformas/Reforma PV 8 X20\' 3 decks/IMG-20251022-WA0013.jpg', title: 'PV 8x20', description: 'Detalhes operacionais' },
            { src: '/images/Reformas/Reforma PV 8 X20\' 3 decks/IMG-20251022-WA0014.jpg', title: 'PV 8x20', description: 'Sistema finalizado' }
          ]
        }
      }
    }
  };

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [showNotification, setShowNotification] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Atualizar imagens da galeria quando categoria ou subcategoria mudar
  useEffect(() => {
    if (selectedCategory === 'todas') {
      setGalleryImages(galleryData.todas.images || []);
      setSelectedSubcategory('');
    } else {
      const category = galleryData[selectedCategory];
      if (selectedSubcategory && category.subcategories && category.subcategories[selectedSubcategory]) {
        setGalleryImages(category.subcategories[selectedSubcategory].images);
      } else if (category.subcategories) {
        // Mostrar todas as subcategorias se nenhuma estiver selecionada
        const allImages: GalleryImage[] = [];
        Object.values(category.subcategories).forEach((subcat: Subcategory) => {
          allImages.push(...subcat.images);
        });
        setGalleryImages(allImages);
      }
    }
  }, [selectedCategory, selectedSubcategory]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubcategory('');
  };

  const handleSubcategorySelect = (subcategory: string) => {
    setSelectedSubcategory(subcategory);
  };

  const openImageModal = (image: GalleryImage) => {
    setSelectedImage(image);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('contato@acsmontagens.com');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } catch (err) {
      console.error('Erro ao copiar email:', err);
    }
  };

  return (
    <div className="App">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="logo">
            <img src="/logo azul.png" alt="ACS Logo" className="logo-img" />
          </div>
          <nav className="nav">
            <a href="#sobre">Sobre</a>
            <a href="#servicos">Serviços</a>
            <a href="#galeria">Galeria</a>
            <a href="#contato">Contato</a>
          </nav>
          <div className="header-cta">
            <a href="#contato" className="btn-header">Solicitar Orçamento</a>
          </div>
          <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            <span className={mobileMenuOpen ? 'active' : ''}></span>
            <span className={mobileMenuOpen ? 'active' : ''}></span>
            <span className={mobileMenuOpen ? 'active' : ''}></span>
          </div>
        </div>
        <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <nav className="mobile-nav">
            <a href="#sobre" onClick={() => setMobileMenuOpen(false)}>Sobre</a>
            <a href="#servicos" onClick={() => setMobileMenuOpen(false)}>Serviços</a>
            <a href="#galeria" onClick={() => setMobileMenuOpen(false)}>Galeria</a>
            <a href="#contato" onClick={() => setMobileMenuOpen(false)}>Contato</a>
            <a href="#contato" className="btn-mobile" onClick={() => setMobileMenuOpen(false)}>Solicitar Orçamento</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <img src="/images/IMG-20251017-WA0025.jpg" alt="Obra Industrial" className="hero-bg-img" />
          <div className="hero-overlay"></div>
          <div className="hero-pattern"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-logo">
              <img src="/logo branca.png" alt="ACS Logo" className="hero-logo-img" />
            </div>
            <h1>ACS FABRICAÇÃO E MONTAGEM INDUSTRIAL</h1>
            <p className="hero-subtitle">
              Seja qual for o desafio, a ACS está pronta para enfrentá-lo. 
              Junte-se a nós e descubra como nossa expertise e comprometimento 
              podem levar o seu projeto ao próximo nível.
            </p>
            <div className="hero-buttons">
              <a href="#contato" className="btn btn-primary">
                <span>Entre em Contato</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="#galeria" className="btn btn-secondary">
                <span>Veja Nossas Obras</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M15 3H21V9M21 3L9 15M21 3L15 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="scroll-arrow"></div>
          <span>Descubra mais</span>
        </div>
      </section>
      {/* Sobre Section */}
      <section id="sobre" className="sobre">
        <div className="container">
          <div className="sobre-grid">
            <div className="sobre-texto">
              <div className="sobre-badge">
                <span>🏭 O QUE FAZEMOS</span>
              </div>
              <h2>Soluções industriais completas com expertise e comprometimento</h2>
              <div className="sobre-content">
                <p>
                  A ACS é especializada em desenvolvimento de projetos, fabricação e montagem de 
                  equipamentos vibratórios, estruturas metálicas e sistemas industriais. Atuamos 
                  em diversos segmentos incluindo mineração, pedreiras, siderurgia e beneficiamento.
                </p>
                <p>
                  Nossa equipe técnica qualificada trabalha com foco em segurança, responsabilidade 
                  e qualidade, entregando soluções sob medida que atendem às necessidades específicas 
                  de cada projeto industrial.
                </p>
              </div>
              <div className="sobre-slogan">
                <span>ACS, sua parceira em soluções industriais.</span>
              </div>
              <div className="sobre-cta">
                <a href="#contato" className="btn btn-primary">
                  <span>Entrar em Contato</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="sobre-imagem">
              <div className="imagem-container">
                <img src="/images/IMG-20251017-WA0026.jpg" alt="Obra ACS - Estruturas Industriais" />
                <div className="imagem-overlay">
                  <div className="imagem-text">
                    <span>Conheça</span>
                    <span>ACS Montagens</span>
                  </div>
                </div>
                <div className="imagem-badge">
                  <span>#solucoesindustriais</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Serviços Section */}
      <section id="servicos" className="servicos">
        <div className="container">
          <h2>NOSSOS SERVIÇOS</h2>
          <div className="servicos-grid">
            <div className="servico-card">
              <div className="servico-icon">🔧</div>
              <h3>Desenvolvimento de Projetos</h3>
              <p>Projetos personalizados para atender suas necessidades específicas</p>
            </div>
            <div className="servico-card">
              <div className="servico-icon">⚙️</div>
              <h3>Fabricação de Equipamentos</h3>
              <p>Fabricação de equipamentos vibratórios e estruturas metálicas</p>
            </div>
            <div className="servico-card">
              <div className="servico-icon">🔨</div>
              <h3>Montagem Industrial</h3>
              <p>Montagem de estruturas metálicas e equipamentos industriais</p>
            </div>
            <div className="servico-card">
              <div className="servico-icon">🛠️</div>
              <h3>Manutenção</h3>
              <p>Manutenção de equipamentos e plantas de beneficiamento</p>
            </div>
            <div className="servico-card">
              <div className="servico-icon">🏭</div>
              <h3>Reforma de Equipamentos</h3>
              <p>Reforma e modernização de equipamentos existentes</p>
            </div>
            <div className="servico-card">
              <div className="servico-icon">⚡</div>
              <h3>Soluções Sob Medida</h3>
              <p>Soluções personalizadas para cada projeto</p>
            </div>
          </div>
        </div>
      </section>
{/* Missão, Visão e Valores */}
<section className="mvv">
        <div className="container">
          <div className="mvv-grid">
            <div className="mvv-card">
              <h3>Missão</h3>
              <p>
                Nossa missão é impulsionar o sucesso de nossos clientes, oferecendo 
                serviços especializados de maneira ágil, confiável e flexível.
              </p>
            </div>
            <div className="mvv-card">
              <h3>Visão</h3>
              <p>
                Ser empresa de referência na área de fabricação, montagem e manutenção 
                industrial reconhecida como a melhor opção por clientes, colaboradores 
                e fornecedores, pela qualidade de nossos produtos, serviços e relacionamento.
              </p>
            </div>
            <div className="mvv-card">
              <h3>Valores</h3>
              <p>
                Na ACS, a excelência é a nossa norma e a satisfação do cliente é o nosso 
                objetivo. Estamos comprometidos em proporcionar resultados excepcionais, 
                construindo relacionamentos de longo prazo com nossos clientes e contribuindo 
                para o crescimento sustentável da indústria.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Solução Section */}
      <section className="solucao">
        <div className="container">
          <h2>NOSSA SOLUÇÃO</h2>
          <div className="solucao-grid">
            <div className="solucao-content">
              <div className="solucao-text">
                <p>
                  ACS oferece soluções sob medida que atendem às necessidades específicas de 
                  cada projeto. Estamos comprometidos em entregar resultados de alta qualidade, 
                  otimizando a eficiência operacional e minimizando os impactos ambientais.
                </p>
                <div className="solucao-features">
                  <div className="feature-item">
                    <div className="feature-icon">⚡</div>
                    <div className="feature-text">
                      <h4>Eficiência Operacional</h4>
                      <p>Otimização de processos para máxima produtividade</p>
                    </div>
                  </div>
                   <div className="feature-item">
                     <div className="feature-icon">🤝</div>
                     <div className="feature-text">
                       <h4>Comprometimento</h4>
                       <p>Dedicação total ao sucesso do seu projeto</p>
                     </div>
                   </div>
                  <div className="feature-item">
                    <div className="feature-icon">🎯</div>
                    <div className="feature-text">
                      <h4>Soluções Sob Medida</h4>
                      <p>Projetos personalizados para cada necessidade</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="solucao-image">
              <div className="image-container">
                <img src="/images/IMG-20251017-WA0027.jpg" alt="Solução ACS - Projeto Industrial" />
                <div className="image-overlay">
                  <div className="overlay-content">
                    <h3>Excelência em Cada Projeto</h3>
                    <p>Resultados que superam expectativas</p>
                  </div>
                </div>
                <div className="image-badge">
                  <span>#solucoesindustriais</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Galeria Section */}
      <section id="galeria" className="galeria">
        <div className="container">
          <h2>NOSSAS OBRAS</h2>
          <p className="galeria-subtitle">Conheça nossos projetos organizados por categoria</p>
          {/* Filtros de Categoria */}
          <div className="galeria-filters">
            <div className="filter-buttons">
              {Object.entries(galleryData).map(([key, category]) => (
                <button
                  key={key}
                  className={`filter-btn ${selectedCategory === key ? 'active' : ''}`}
                  onClick={() => handleCategorySelect(key)}
                >
                  <span className="filter-icon">{category.icon}</span>
                  <span className="filter-text">{category.name}</span>
                </button>
              ))}
            </div>
          </div>
          {/* Filtros de Subcategoria */}
          {selectedCategory !== 'todas' && galleryData[selectedCategory].subcategories && (
            <div className="subcategory-filters">
              <h3>Escolha uma subcategoria:</h3>
              <div className="subcategory-buttons">
                <button
                  className={`subcategory-btn ${selectedSubcategory === '' ? 'active' : ''}`}
                  onClick={() => handleSubcategorySelect('')}
                >
                  Todas as Subcategorias
                </button>
                {galleryData[selectedCategory].subcategories && Object.entries(galleryData[selectedCategory].subcategories!).map(([key, subcategory]) => (
                  <button
                    key={key}
                    className={`subcategory-btn ${selectedSubcategory === key ? 'active' : ''}`}
                    onClick={() => handleSubcategorySelect(key)}
                  >
                    {subcategory.name}
                  </button>
                ))}
              </div>
            </div>
          )}
          {/* Grid de Imagens */}
          <div className="galeria-grid">
            {galleryImages.map((image, index) => (
              <div key={index} className="galeria-item" onClick={() => openImageModal(image)}>
                <img src={image.src} alt={image.title} />
                <div className="galeria-overlay">
                  <h3>{image.title}</h3>
                  <p>{image.description}</p>
                  <div className="galeria-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M15 3H21V9M21 3L9 15M21 3L15 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Modal de Imagem */}
        {selectedImage && (
          <div className="image-modal" onClick={closeImageModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closeImageModal}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <img src={selectedImage.src} alt={selectedImage.title} className="modal-image" />
              <div className="modal-info">
                <h3>{selectedImage.title}</h3>
                <p>{selectedImage.description}</p>
              </div>
            </div>
          </div>
        )}
      </section>
      {/* Parceiros Section */}
      <section className="parceiros">
        <div className="container">
          <h2>NOSSOS PARCEIROS</h2>
          <p className="parceiros-subtitle">Empresas que confiam em nossos serviços</p>
          <div className="carrossel-container">
            <div className="carrossel-track">
              <div className="carrossel-slide">
                <img src="/images/Parceiros/299130887_440836284733465_7742663017397007318_n.jpg" alt="Parceiro 1" />
              </div>
              <div className="carrossel-slide">
                <img src="/images/Parceiros/398151776_710566470962475_6714197606641468765_n.jpg" alt="Parceiro 2" />
              </div>
              <div className="carrossel-slide">
                <img src="/images/Parceiros/9-09.png" alt="Parceiro 3" />
              </div>
              <div className="carrossel-slide">
                <img src="/images/Parceiros/download.png" alt="Parceiro 4" />
              </div>
              <div className="carrossel-slide">
                <img src="/images/Parceiros/gaustelogoo.png" alt="Parceiro 5" />
              </div>
              <div className="carrossel-slide">
                <img src="/images/Parceiros/im.png" alt="Parceiro 6" />
              </div>
              <div className="carrossel-slide">
                <img src="/images/Parceiros/Laranja-com-a-letra-preta-1024x292.png" alt="Parceiro 7" />
              </div>
              <div className="carrossel-slide">
                <img src="/images/Parceiros/logo (1).png" alt="Parceiro 8" />
              </div>
              <div className="carrossel-slide">
                <img src="/images/Parceiros/LOGO_PROSPER12-qdtxnep02wtjt4fk89swcpi2wbvjizrdekfug34jr4.png" alt="Parceiro 9" />
              </div>
              <div className="carrossel-slide">
                <img src="/images/Parceiros/LOGO-HORIZONTAL.png" alt="Parceiro 10" />
              </div>
              <div className="carrossel-slide">
                <img src="/images/Parceiros/logo.png" alt="Parceiro 11" />
              </div>
              {/* Duplicar as imagens para criar loop infinito */}
              <div className="carrossel-slide">
                <img src="/images/Parceiros/299130887_440836284733465_7742663017397007318_n.jpg" alt="Parceiro 1" />
              </div>
              <div className="carrossel-slide">
                <img src="/images/Parceiros/398151776_710566470962475_6714197606641468765_n.jpg" alt="Parceiro 2" />
              </div>
              <div className="carrossel-slide">
                <img src="/images/Parceiros/9-09.png" alt="Parceiro 3" />
              </div>
              <div className="carrossel-slide">
                <img src="/images/Parceiros/download.png" alt="Parceiro 4" />
              </div>
              <div className="carrossel-slide">
                <img src="/images/Parceiros/gaustelogoo.png" alt="Parceiro 5" />
              </div>
              <div className="carrossel-slide">
                <img src="/images/Parceiros/im.png" alt="Parceiro 6" />
              </div>
              <div className="carrossel-slide">
                <img src="/images/Parceiros/Laranja-com-a-letra-preta-1024x292.png" alt="Parceiro 7" />
              </div>
              <div className="carrossel-slide">
                <img src="/images/Parceiros/logo (1).png" alt="Parceiro 8" />
              </div>
              <div className="carrossel-slide">
                <img src="/images/Parceiros/LOGO_PROSPER12-qdtxnep02wtjt4fk89swcpi2wbvjizrdekfug34jr4.png" alt="Parceiro 9" />
              </div>
              <div className="carrossel-slide">
                <img src="/images/Parceiros/LOGO-HORIZONTAL.png" alt="Parceiro 10" />
              </div>
              <div className="carrossel-slide">
                <img src="/images/Parceiros/logo.png" alt="Parceiro 11" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Contato Section */}
      <section id="contato" className="contato">
        <div className="container">
          <h2>ENTRE EM CONTATO</h2>
          <p className="contato-subtitle">Estamos prontos para atender seu projeto</p>
          
          <div className="contato-content">
            <div className="contato-info">
              <div className="contato-item">
                <div className="contato-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M21 10C21 17 12 23 12 23S3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="contato-details">
                  <h3>Endereço</h3>
                <p>Estrada Mario Campos, 700 - Bairro Bandeirinhas<br />
                Betim 32657002, BR</p>
                  <a href="https://www.google.com/maps/search/ACS+Fabricação+e+Montagem+Industrial+Betim" target="_blank" rel="noopener noreferrer" className="contato-link">
                    Ver no Google Maps
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </div>

              <div className="contato-item">
                <div className="contato-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.18999 12.85C3.49997 10.2412 2.44824 7.27099 2.11999 4.18C2.095 3.90347 2.12787 3.62476 2.21649 3.36162C2.30512 3.09849 2.44756 2.85669 2.63476 2.65162C2.82196 2.44655 3.0498 2.28271 3.30379 2.17052C3.55777 2.05833 3.83233 2.00026 4.10999 2H7.10999C7.59531 1.99522 8.06679 2.16708 8.43376 2.48353C8.80073 2.79999 9.03996 3.23945 9.10999 3.72C9.23662 4.68007 9.47144 5.62273 9.80999 6.53C9.94454 6.88792 9.97366 7.27691 9.89391 7.65088C9.81415 8.02485 9.62886 8.36811 9.35999 8.64L8.08999 9.91C9.51355 12.4135 11.5865 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9751 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0555 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9586 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 21.9999 16.92H22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="contato-details">
                  <h3>Telefone</h3>
                <p>(31) 3160-3905</p>
                  <a href="tel:+553131603905" className="contato-link">
                    Ligar agora
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </div>

              <div className="contato-item">
                <div className="contato-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="contato-details">
                  <h3>Email</h3>
                <p>contato@acsmontagens.com</p>
                  <button 
                    onClick={copyEmail}
                    className="contato-link"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, font: 'inherit' }}
                  >
                    Copiar email
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
                </div>

              <div className="contato-social">
                <h3>Redes Sociais</h3>
                <div className="social-buttons">
                  <a href="https://w.app/abwgyq" target="_blank" rel="noopener noreferrer" className="social-btn whatsapp">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    <span>WhatsApp</span>
                  </a>
                  <a href="https://www.instagram.com/acs_montagem/" target="_blank" rel="noopener noreferrer" className="social-btn instagram">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    <span>Instagram</span>
                  </a>
                </div>
                </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-main">
            <div className="footer-logo">
                <img src="/logo azul.png" alt="ACS Logo" className="footer-logo-img" />
                <div className="footer-brand">
              <h3>ACS</h3>
              <p>Fabricação e Montagem Industrial</p>
                </div>
              </div>
              <div className="footer-contact">
                <h4>Contato</h4>
                <p>Estrada Mario Campos, 700 - Bairro Bandeirinhas</p>
                <p>Betim 32657002, BR</p>
                <p>contato@acsmontagens.com</p>
                <p>(31) 3160-3905</p>
              </div>
              <div className="footer-social">
                <h4>Redes Sociais</h4>
                <div className="footer-social-links">
                  <a href="https://w.app/abwgyq" target="_blank" rel="noopener noreferrer" className="footer-social-link">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    <span>WhatsApp</span>
                  </a>
                  <a href="https://www.instagram.com/acs_montagem/" target="_blank" rel="noopener noreferrer" className="footer-social-link">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    <span>Instagram</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <div className="footer-copyright">
              <p>&copy; 2024 ACS FABRICAÇÃO E MONTAGEM INDUSTRIAL LTDA. Todos os direitos reservados.</p>
              </div>
              <div className="footer-links">
                <a href="#sobre">Sobre</a>
                <a href="#servicos">Serviços</a>
                <a href="#galeria">Galeria</a>
                <a href="#contato">Contato</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Notificação de Email Copiado */}
      {showNotification && (
        <div className="notification">
          <div className="notification-content">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Email copiado com sucesso!</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
