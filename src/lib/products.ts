import 'server-only';
import { supabase } from './supabase';
import type { Product } from '@/types/product';

export type { Product };

function formatCOP(price: number): string {
  return '$' + new Intl.NumberFormat('es-CO').format(price);
}

interface FuXionRow {
  id_producto: string;
  producto: string;
  nombre_comercial: string | null;
  categoria_principal: string | null;
  subcategoria: string | null;
  linea_funcional: string | null;
  presentacion: string | null;
  sabor: string | null;
  precio_cop: number | null;
  descripcion_bot_120: string | null;
  beneficios_aprobados: string | null;
  etiqueta: string | null;
  destacado: boolean | null;
  activo: boolean | null;
  url_compra: string | null;
  modo_uso_oficial: string | null;
  imagen_url: string | null;
}

interface GuddRow {
  id_producto: number;
  nombre_producto: string;
  descripcion: string | null;
  precio_base: string | number | null;
  estado: string | null;
  categoria: string | null;
  linea_funcional: string | null;
  presentacion: string | null;
  imagen_url: string | null;
  etiqueta: string | null;
  destacado: boolean | null;
}

function mapFuXion(row: FuXionRow): Product {
  const price = row.precio_cop ?? 0;
  return {
    id: `fuxion-${row.id_producto}`,
    name: row.nombre_comercial || row.producto,
    description: row.descripcion_bot_120 || '',
    price,
    priceFormatted: formatCOP(price),
    category: row.categoria_principal || 'Otros',
    subcategory: row.subcategoria || undefined,
    presentation: row.presentacion || undefined,
    flavor: row.sabor || undefined,
    benefits: row.beneficios_aprobados || undefined,
    lineaFuncional: row.linea_funcional || undefined,
    etiqueta: row.etiqueta || undefined,
    destacado: row.destacado ?? false,
    brand: 'FuXion',
    source: 'fuxion',
    marca: 'FuXion',
    urlCompra: row.url_compra || undefined,
    modoUso: row.modo_uso_oficial || undefined,
    imagenUrl: row.imagen_url || undefined,
  };
}

function mapGudd(row: GuddRow): Product {
  const price = typeof row.precio_base === 'string' ? parseFloat(row.precio_base) : (row.precio_base ?? 0);
  return {
    id: `gudd-${row.id_producto}`,
    name: row.nombre_producto,
    description: row.descripcion || '',
    price,
    priceFormatted: formatCOP(price),
    category: row.categoria || 'gudd',
    presentation: row.presentacion || undefined,
    lineaFuncional: row.linea_funcional || undefined,
    etiqueta: row.etiqueta || undefined,
    destacado: row.destacado ?? false,
    brand: 'gudd',
    source: 'gudd',
    marca: 'gudd',
    imagenUrl: row.imagen_url || undefined,
  };
}

export interface ProductsResult {
  featured: Product[];
  products: Product[];
  categories: string[];
  needs: string[];
}

// Products that are not real catalog items (e.g. shipping fees)
const EXCLUDED_IDS = ['gudd-6'];

export async function getProducts(): Promise<ProductsResult> {
  const [fuxionResult, guddResult] = await Promise.all([
    supabase
      .from('FuXion_Productos')
      .select('*')
      .eq('activo', true)
      .order('producto', { ascending: true }),
    supabase
      .from('producto')
      .select('*')
      .eq('estado', 'activo')
      .order('nombre_producto', { ascending: true }),
  ]);

  if (fuxionResult.error) {
    console.error('Error fetching FuXion products:', fuxionResult.error.message);
  }
  if (guddResult.error) {
    console.error('Error fetching Gudd products:', guddResult.error.message);
  }

  const allProducts = [
    ...(fuxionResult.data ?? []).map(mapFuXion),
    ...(guddResult.data ?? []).map(mapGudd),
  ].filter(p => !EXCLUDED_IDS.includes(p.id));

  const featured = allProducts.filter(p => p.destacado);
  const products = allProducts;

  const categorySet = new Set<string>();
  const needSet = new Set<string>();

  for (const p of allProducts) {
    categorySet.add(p.category);
    if (p.lineaFuncional) {
      needSet.add(p.lineaFuncional);
    }
  }

  const categories = ['Todos los Productos', ...Array.from(categorySet).sort()];
  const needs = Array.from(needSet).sort();

  return { featured, products, categories, needs };
}
