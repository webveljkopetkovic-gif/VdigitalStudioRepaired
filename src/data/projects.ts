import projectBookBranding from '../assets/images/project_book_branding_1790320425650.webp';
import projectFashionPortrait from '../assets/images/project_fashion_portrait_1790320441194.webp';
import projectWoodSpoons from '../assets/images/project_wood_spoons_1790320456860.webp';
import projectOpenBook from '../assets/images/project_open_book_1790320470235.webp';
import projectCupPackaging from '../assets/images/project_cup_packaging_1790320483176.webp';
import projectMinimalClock from '../assets/images/project_minimal_clock_1790320500296.webp';
import projectKnitBeanie from '../assets/images/project_knit_beanie_1790320514058.webp';
import projectArchTexture from '../assets/images/project_arch_texture_1790320528589.webp';

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  image: string;
  width: number;
  height: number;
  alt: string;
  client: string;
  year: string;
  summary: string;
  deliverables: string[];
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'tailoring-inteo',
    title: 'Tailoring inteo',
    category: 'Branding',
    image: projectBookBranding,
    width: 1200,
    height: 896,
    alt: 'Tailoring inteo bespoke editorial lookbook and brand identity for Casa Lama Mallorca',
    client: 'Casa Lama, Mallorca',
    year: '2025',
    summary:
      'Comprehensive visual identity, editorial catalog, and tactile printed lookbook for an artisanal bespoke tailoring house and retreat based in Mallorca.',
    deliverables: ['Brand Identity', 'Editorial Design', 'Art Direction', 'Custom Typography'],
  },
  {
    id: 'design-blast',
    title: 'Design blast',
    category: 'Photography',
    image: projectFashionPortrait,
    width: 1200,
    height: 896,
    alt: 'Design blast monochrome editorial fashion photography campaign for Atelier Blast London',
    client: 'Atelier Blast London',
    year: '2025',
    summary:
      'Monochrome editorial photography campaign exploring kinetic human posture, minimalist monochrome silhouettes, and tension in studio space.',
    deliverables: ['Creative Direction', 'Studio Photography', 'Retouching', 'Exhibition Print'],
  },
  {
    id: 'herbal-beauty',
    title: 'Herbal beauty',
    category: 'Application',
    image: projectWoodSpoons,
    width: 1200,
    height: 896,
    alt: 'Herbal beauty organic skincare application and wooden apothecary spoons for Botanica Rituals',
    client: 'Botanica Rituals',
    year: '2024',
    summary:
      'Digital e-commerce sanctuary and ritual sequencing application for small-batch organic botanical skincare and wellness formulations.',
    deliverables: ['UI/UX Architecture', 'Interactive Web App', 'Design System', 'Motion Design'],
  },
  {
    id: 'cropo-identity',
    title: 'Cropo identity',
    category: 'Packaging',
    image: projectOpenBook,
    width: 1200,
    height: 896,
    alt: 'Cropo identity accordion-fold editorial publication and packaging design for Cropo Publishing House',
    client: 'Cropo Publishing House',
    year: '2025',
    summary:
      'Multi-volume accordion-fold editorial publication and sculptural matte-black packaging system for an international design symposium.',
    deliverables: ['Packaging Architecture', 'Editorial Layout', 'Foil Stamping', 'Paper Sourcing'],
  },
  {
    id: 'kanso-living',
    title: 'Kanso living',
    category: 'Packaging',
    image: projectCupPackaging,
    width: 1200,
    height: 896,
    alt: 'Kanso living zero-waste sculpted pulp packaging for handcrafted stoneware vessels',
    client: 'Kanso Studio Kyoto',
    year: '2024',
    summary:
      'Zero-waste sculpted pulp packaging and unboxing choreography designed for limited-edition handcrafted stoneware tea ceremony vessels.',
    deliverables: ['Sustainable Packaging', 'Unboxing Experience', '3D Prototyping', 'Print Collateral'],
  },
  {
    id: 'forma-chronos',
    title: 'Forma chronos',
    category: 'Product',
    image: projectMinimalClock,
    width: 1200,
    height: 896,
    alt: 'Forma chronos minimalist spun aluminum wall clock product design for Chronos Horology',
    client: 'Chronos Horology',
    year: '2025',
    summary:
      'Sculptural wall clock crafted from spun anodized aluminum with no numeral markings, translating the passage of time into subtle light reflections.',
    deliverables: ['Industrial Design', 'Interactive Microsite', 'Packaging', 'CGI Visualization'],
  },
  {
    id: 'nordic-atelier',
    title: 'Nordic atelier',
    category: 'Apparel',
    image: projectKnitBeanie,
    width: 1200,
    height: 896,
    alt: 'Nordic atelier raw heritage wool knitwear apparel campaign for Vargvind Heritage',
    client: 'Vargvind Heritage',
    year: '2025',
    summary:
      'E-commerce campaign and art direction celebrating raw, undyed heritage Nordic wool knitwear crafted for harsh subarctic coastal climates.',
    deliverables: ['Art Direction', 'Digital Lookbook', 'Shopify Plus Engineering', 'Type Design'],
  },
  {
    id: 'brut-space',
    title: 'Brut space',
    category: 'Architecture',
    image: projectArchTexture,
    width: 1200,
    height: 896,
    alt: 'Brut space sculptural monolithic concrete residential architecture archive for Monolith Arkitekter',
    client: 'Monolith Arkitekter',
    year: '2024',
    summary:
      'Digital monograph and archive documenting sculptural monolithic concrete residential pavilions built across the Baltic and Norwegian fjords.',
    deliverables: ['Digital Monograph', 'Interactive Archive', 'Spatial Sound Design', 'Editorial'],
  },
];
