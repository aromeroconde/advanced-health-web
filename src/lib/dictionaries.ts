import 'server-only';

const dictionaries: any = {
    en: () => import('../dictionaries/en.json'),
    es: () => import('../dictionaries/es.json'),
};

export const getDictionary = async (locale: 'en' | 'es') => {
    const load = dictionaries[locale] || dictionaries.es;
    const module = await load();
    return module.default;
};
